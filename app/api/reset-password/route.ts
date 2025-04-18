import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, newPassword } = await request.json();

        if (!email || !newPassword) {
            console.error('Missing required parameters for password reset:', { email: !!email, newPassword: !!newPassword });
            return NextResponse.json(
                { error: 'Vui lòng nhập email và mật khẩu mới' },
                { status: 400 }
            );
        }

        console.log('Resetting password for email:', email);
        
        // Call the backend API to reset the password
        const resetResponse = await fetch('http://fpl.timefortea.io.vn/api/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                newPassword
            }),
        });
        
        if (!resetResponse.ok) {
            const errorText = await resetResponse.text();
            console.error('Failed to reset password:', errorText);
            
            // Handle specific error cases
            if (resetResponse.status === 404) {
                return NextResponse.json(
                    { error: 'Không tìm thấy người dùng với email này' },
                    { status: 404 }
                );
            }
            
            return NextResponse.json(
                { error: 'Không thể cập nhật mật khẩu. Vui lòng thử lại sau.' },
                { status: 500 }
            );
        }
        
        const responseData = await resetResponse.json();
        console.log('Password reset successfully for email:', email);
        
        return NextResponse.json({
            success: true,
            message: responseData.message || 'Đặt lại mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới.'
        });
    } catch (error) {
        console.error('Server error in reset password API:', error);
        return NextResponse.json(
            { error: 'Lỗi máy chủ. Vui lòng thử lại sau.' },
            { status: 500 }
        );
    }
} 