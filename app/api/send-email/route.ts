import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { to, subject, name, password } = await request.json();

        // Create a transporter with the required configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'marketingemail.test1@gmail.com',
                pass: 'mggh yqya hvmp acnx' // Note: Replace with actual app password in production
            }
        });

        // Email content
        const mailOptions = {
            from: 'marketingemail.test1@gmail.com',
            to: to,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Xác nhận đăng ký tài khoản</h2>
                    
                    <p>Xin chào <strong>${name}</strong>,</p>
                    
                    <p>Cảm ơn bạn đã đăng ký tài khoản trên hệ thống của chúng tôi.</p>
                    
                    <p>Dưới đây là thông tin tài khoản của bạn:</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p><strong>Email:</strong> ${to}</p>
                        <p><strong>Mật khẩu ngẫu nhiên:</strong> ${password}</p>
                    </div>
                    
                    <p>Bạn có thể sử dụng mật khẩu ngẫu nhiên này để đăng nhập vào tài khoản của bạn. Chúng tôi khuyến nghị bạn nên thay đổi mật khẩu này sau khi đăng nhập.</p>
                    
                    <p style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                        Email này được gửi tự động. Vui lòng không trả lời email này.
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
} 