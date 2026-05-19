import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate request
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Vui lòng cung cấp email và mật khẩu' },
        { status: 400 }
      );
    }

    // Read users from data file
    const dataFilePath = path.join(process.cwd(), 'data', 'users.json');
    let users = [];
    
    try {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      users = JSON.parse(fileData);
    } catch (error) {
      console.error('Lỗi khi đọc file data/users.json:', error);
      return NextResponse.json(
        { message: 'Lỗi máy chủ nội bộ' },
        { status: 500 }
      );
    }

    // Find user
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: 'Đăng nhập thành công',
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi API Login:', error);
    return NextResponse.json(
      { message: 'Lỗi hệ thống' },
      { status: 500 }
    );
  }
}
