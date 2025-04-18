import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            console.error('Missing email for password reset');
            return NextResponse.json(
                { error: 'Vui lòng nhập địa chỉ email' },
                { status: 400 }
            );
        }

        // 1. Check if email exists in the system
        console.log('Checking if email exists:', email);
        const checkUserResponse = await fetch(`http://fpl.timefortea.io.vn/api/users/email/${encodeURIComponent(email)}`);
        
        if (!checkUserResponse.ok) {
            console.error('Error checking email:', await checkUserResponse.text());
            return NextResponse.json(
                { error: 'Không thể xác minh email. Vui lòng thử lại sau.' },
                { status: 500 }
            );
        }
        
        const userData = await checkUserResponse.json();
        
        if (!userData || !userData.id) {
            console.log('Email not found in system:', email);
            // For security, don't reveal if email exists or not
            return NextResponse.json(
                { success: true, message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.' },
                { status: 200 }
            );
        }
        
        console.log('User found:', userData.id);
        
        // Generate a temporary token just for the link - will not be stored in the database
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Send password reset email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'marketingemail.test1@gmail.com',
                    pass: 'mggh yqya hvmp acnx'
                }
            });
            
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
            const resetUrl = `${baseUrl}/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`;
            
            console.log('Sending password reset email to:', email, 'with link:', resetUrl);
            
            const mailOptions = {
                from: 'marketingemail.test1@gmail.com',
                to: email,
                subject: 'Đặt lại mật khẩu cho tài khoản của bạn',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Đặt lại mật khẩu</h2>
                        
                        <p>Xin chào,</p>
                        
                        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                            <p>Để đặt lại mật khẩu, vui lòng nhấp vào nút bên dưới:</p>
                        </div>
                        
                        <div style="margin: 25px 0; text-align: center;">
                            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Đặt lại mật khẩu</a>
                        </div>
                        
                        <p>Hoặc bạn có thể sao chép và dán liên kết sau vào trình duyệt của bạn:</p>
                        <p style="word-break: break-all; background-color: #f9f9f9; padding: 10px; border-radius: 3px; font-size: 14px;">${resetUrl}</p>
                        
                        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
                        
                        <p><strong>Lưu ý:</strong> Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                        
                        <p style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                            Email này được gửi tự động. Vui lòng không trả lời email này.
                        </p>
                    </div>
                `
            };
            
            const info = await transporter.sendMail(mailOptions);
            console.log('Password reset email sent successfully:', info.messageId);
            
            return NextResponse.json({
                success: true,
                message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.',
                emailSent: true
            });
        } catch (emailError) {
            console.error('Error sending password reset email:', emailError);
            return NextResponse.json(
                { error: 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Server error in forgot password API:', error);
        return NextResponse.json(
            { error: 'Lỗi máy chủ. Vui lòng thử lại sau.' },
            { status: 500 }
        );
    }
} 