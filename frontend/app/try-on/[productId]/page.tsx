"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Camera, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import { cn } from "@/lib/utils";

interface Position {
    x: number;
    y: number;
}

export default function TryOnPage() {
    const { productId } = useParams();
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [product, setProduct] = useState<any>(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [position, setPosition] = useState<Position>({ x: 50, y: 30 });
    const [scale, setScale] = useState(100);
    const [canCapture, setCanCapture] = useState(false);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === parseInt(productId as string));
        setProduct(foundProduct);
    }, [productId]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // Set active immediately when stream is ready
                videoRef.current.onplay = () => {
                    setCameraActive(true);
                    setCanCapture(true);
                };

                // Also handle metadata loaded
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(err => console.error("Play error:", err));
                };

                // Start playing
                videoRef.current.play().catch(err => console.error("Play error:", err));
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
            setCameraActive(false);
            setCanCapture(false);
        }
    };

    const capturePhoto = () => {
        if (!canvasRef.current || !videoRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0);

        // Draw product image if available
        if (product?.image) {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const width = (canvasRef.current!.width * scale) / 100;
                const height = (img.height * width) / img.width;
                const x = (canvasRef.current!.width * position.x) / 100 - width / 2;
                const y = (canvasRef.current!.height * position.y) / 100 - height / 2;

                ctx.drawImage(img, x, y, width, height);

                // Download
                const link = document.createElement("a");
                link.href = canvasRef.current!.toDataURL("image/png");
                link.download = `try-on-${product.name}.png`;
                link.click();
            };
            img.src = product.image;
        }
    };

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm</p>
                    <Button asChild>
                        <Link href="/">Quay về trang chủ</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-background">
            <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/product/${productId}`}>
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Thử {product.name}</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Camera Section */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Camera
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Camera Container */}
                            <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                {/* Always render video, hide when inactive */}
                                <video
                                    ref={videoRef}
                                    className={cn("w-full h-full object-cover", !cameraActive && "hidden")}
                                    autoPlay
                                    muted
                                    playsInline
                                />

                                {cameraActive ? (
                                    <>
                                        {/* Product Overlay */}
                                        {product?.image && (
                                            <div
                                                className="absolute pointer-events-none cursor-move opacity-80 hover:opacity-100 transition-opacity"
                                                style={{
                                                    left: `${position.x}%`,
                                                    top: `${position.y}%`,
                                                    transform: "translate(-50%, -50%)",
                                                    width: `${scale}%`,
                                                    maxWidth: "300px",
                                                }}
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-auto drop-shadow-lg"
                                                    draggable={false}
                                                />
                                            </div>
                                        )}

                                        {/* Center Crosshair */}
                                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-primary rounded-full opacity-30" />
                                            <div className="absolute w-px h-8 bg-primary opacity-30" />
                                            <div className="absolute h-px w-8 bg-primary opacity-30" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-white">
                                        <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg">Nhấn bắt đầu để kích hoạt camera</p>
                                    </div>
                                )}
                            </div>

                            {/* Hidden Canvas */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Controls */}
                            <div className="flex gap-2 flex-wrap">
                                {!cameraActive ? (
                                    <Button onClick={startCamera} size="lg" className="flex-1 bg-primary">
                                        <Camera className="h-4 w-4 mr-2" />
                                        Bắt đầu Camera
                                    </Button>
                                ) : (
                                    <>
                                        <Button onClick={capturePhoto} size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
                                            <Camera className="h-4 w-4 mr-2" />
                                            Chụp Ảnh
                                        </Button>
                                        <Button onClick={stopCamera} variant="destructive" size="lg" className="flex-1">
                                            <X className="h-4 w-4 mr-2" />
                                            Dừng
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Controls Panel */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Điều Chỉnh Vị Trí</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cameraActive && (
                                <>
                                    {/* X Position */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Vị trí Ngang: {position.x}%</label>
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={position.x}
                                            onChange={(e) =>
                                                setPosition((prev) => ({ ...prev, x: parseInt(e.target.value) }))
                                            }
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    {/* Y Position */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Vị trí Dọc: {position.y}%</label>
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={position.y}
                                            onChange={(e) =>
                                                setPosition((prev) => ({ ...prev, y: parseInt(e.target.value) }))
                                            }
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    {/* Scale */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Kích Thước: {scale}%</label>
                                        <input
                                            type="range"
                                            min={20}
                                            max={200}
                                            step={5}
                                            value={scale}
                                            onChange={(e) => setScale(parseInt(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    {/* Reset */}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            setPosition({ x: 50, y: 30 });
                                            setScale(100);
                                        }}
                                    >
                                        Đặt Lại
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Product Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {product.description}
                            </p>
                            <Button asChild className="w-full">
                                <Link href={`/product/${productId}`}>Xem Chi Tiết</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
