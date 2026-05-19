"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Gửi email cho chúng tôi",
      details: ["hello@bloomshop.com", "support@bloomshop.com"],
      description: "Gửi email cho chúng tôi bất cứ lúc nào",
    },
    {
      icon: Phone,
      title: "Gọi cho chúng tôi",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Thứ Hai - Thứ Sáu, từ 8h sáng đến 5h chiều",
    },
    {
      icon: MapPin,
      title: "Ghé thăm chúng tôi",
      details: ["123 Fashion Street", "Style City, SC 12345"],
      description: "Đến chào chúng tôi tại văn phòng",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      details: ["Thứ Hai - Thứ Sáu: 9h sáng - 6h chiều", "Thứ Bảy: 10h sáng - 4h chiều"],
      description: "Chủ Nhật: Đóng cửa",
    },
  ];

  const features = [
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      description: "Nhận hỗ trợ bất cứ khi nào bạn cần",
    },
    {
      icon: MessageSquare,
      title: "Phản hồi nhanh",
      description: "Chúng tôi trả lời trong vòng 2 giờ",
    },
    {
      icon: Shield,
      title: "Bảo mật & Riêng tư",
      description: "Thông tin của bạn an toàn với chúng tôi",
    },
  ];

  return (
    <div className="bg-background">
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-primary text-primary-foreground">
              Liên lạc
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Chúng tôi rất muốn{" "}
              <span className="text-primary block lg:inline lg:ml-4">
                lắng nghe từ bạn
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Có câu hỏi, gợi ý hay chỉ muốn gửi lời chào? Chúng tôi luôn sẵn sàng hỗ trợ và rất mong nhận được tin từ bạn.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Gửi tin nhắn cho chúng tôi
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Điền vào biểu mẫu bên dưới và chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground"
                        >
                          Tên của bạn
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email của bạn
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="nguyenvana@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-foreground"
                      >
                        Chủ đề
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Chúng tôi có thể giúp gì cho bạn?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Tin nhắn của bạn
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Hãy cho chúng tôi biết thêm về câu hỏi hoặc vấn đề của bạn..."
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || isSubmitted}
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Đang gửi...
                        </div>
                      ) : isSubmitted ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Đã gửi tin nhắn!
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Gửi tin nhắn
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Thông tin liên hệ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground"
                          >
                            {detail}
                          </p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Vì sao nên liên hệ với chúng tôi?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-accent/10 rounded">
                          <feature.icon className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      {index < features.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6">
              Câu hỏi thường gặp
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Các câu hỏi thường gặp
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tìm câu trả lời nhanh cho các câu hỏi phổ biến về sản phẩm và dịch vụ của chúng tôi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Chính sách giao hàng của bạn là gì?",
                answer:
                  "Chúng tôi miễn phí giao hàng cho đơn hàng trên 500.000₫. Giao hàng tiêu chuẩn mất 3-5 ngày làm việc.",
              },
              {
                question: "Làm thế nào để tôi theo dõi đơn hàng?",
                answer:
                  "Khi đơn hàng của bạn được giao đi, bạn sẽ nhận được mã theo dõi qua email để theo dõi gói hàng.",
              },
              {
                question: "Chính sách đổi trả của bạn là gì?",
                answer:
                  "Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua. Sản phẩm phải trong tình trạng ban đầu.",
              },
              {
                question: "Bạn có giao hàng quốc tế không?",
                answer:
                  "Có, chúng tôi giao hàng toàn cầu. Phí giao hàng quốc tế thay đổi tùy theo điểm đến.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Vẫn còn thắc mắc?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Không tìm thấy điều bạn cần? Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi ngay
                </Button>

                <Button size="lg" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Chat trực tuyến
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
