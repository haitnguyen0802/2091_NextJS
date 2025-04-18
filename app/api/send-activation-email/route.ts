import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { userId, to, subject, name, token } = await request.json();

        // Validate required parameters
        if (!userId || !to || !token) {
            console.error('Missing required parameters for activation email:', { userId, to, token });
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        // Create a transporter with the required configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'marketingemail.test1@gmail.com',
                pass: 'mggh yqya hvmp acnx' // Note: This will be replaced by the actual password
            }
        });

        // Create activation link
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
        const activationLink = `${baseUrl}/activate-account?userId=${userId}&token=${token}`;

        console.log('Sending activation email to:', to, 'with link:', activationLink);

        // Email content
        const mailOptions = {
            from: 'marketingemail.test1@gmail.com',
            to: to,
            subject: subject || 'Kích hoạt tài khoản',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Kích hoạt tài khoản</h2>
                    
                    <p>Xin chào <strong>${name}</strong>,</p>
                    
                    <p>Cảm ơn bạn đã đăng ký tài khoản trên hệ thống của chúng tôi.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p><strong>Thông tin tài khoản:</strong></p>
                        <p><strong>Email:</strong> ${to}</p>
                        <p><strong>Tên người dùng:</strong> ${name}</p>
                        <p><strong>ID người dùng:</strong> ${userId}</p>
                    </div>
                    
                    <p>Để hoàn tất quá trình đăng ký và kích hoạt tài khoản của bạn, vui lòng nhấp vào liên kết bên dưới:</p>
                    
                    <div style="margin: 25px 0; text-align: center;">
                        <a href="${activationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Kích hoạt tài khoản</a>
                    </div>
                    
                    <p>Hoặc bạn có thể sao chép và dán liên kết sau vào trình duyệt của bạn:</p>
                    <p style="word-break: break-all; background-color: #f9f9f9; padding: 10px; border-radius: 3px; font-size: 14px;">${activationLink}</p>
                    
                    <p>Liên kết này sẽ hết hạn sau 24 giờ.</p>
                    
                    <p><strong>Lưu ý:</strong> Nếu bạn không thực hiện đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
                    
                    <p style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                        Email này được gửi tự động. Vui lòng không trả lời email này.
                    </p>
                </div>
            `
        };

        try {
            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            
            return NextResponse.json({ success: true, messageId: info.messageId });
        } catch (emailError: unknown) {
            console.error('Error sending email:', emailError);
            const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
            return NextResponse.json(
                { error: 'Failed to send email', details: errorMessage },
                { status: 500 }
            );
        }
    } catch (error: unknown) {
        console.error('Error in activation email API:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Server error', details: errorMessage },
            { status: 500 }
        );
    }
} 