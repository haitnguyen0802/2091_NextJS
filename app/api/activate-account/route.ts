import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get userId and token from query parameters
        const searchParams = request.nextUrl.searchParams;
        const userIdParam = searchParams.get('userId');
        const token = searchParams.get('token');
        
        console.log('Activation request received with params:', { userIdParam, token });
        
        if (!userIdParam || !token) {
            console.error('Missing required parameters:', { userIdParam, token });
            // Redirect to error page with message about invalid parameters
            return NextResponse.redirect(new URL('/activation-error?error=missing-params', request.nextUrl.origin));
        }
        
        // Validate that userId is a number
        const userId = parseInt(userIdParam, 10);
        
        if (isNaN(userId) || userId <= 0) {
            console.error('Invalid userId format:', userIdParam);
            return NextResponse.redirect(new URL('/activation-error?error=invalid-id', request.nextUrl.origin));
        }

        try {
            // First, get current user data
            console.log(`Fetching user data for ID: ${userId}`);
            const getUserResponse = await fetch(`https://fpl.timefortea.io.vn/api/users/${userId}`);
            
            if (!getUserResponse.ok) {
                const errorStatus = getUserResponse.status;
                console.error(`User fetch failed with status ${errorStatus}`);
                if (errorStatus === 404) {
                    return NextResponse.redirect(new URL('/activation-error?error=user-not-found', request.nextUrl.origin));
                }
                throw new Error('User not found or API error');
            }
            
            const userData = await getUserResponse.json();
            console.log('User data fetched successfully', { id: userData.id, email: userData.email });
            
            // Get current timestamp
            const now = new Date().toISOString();
            
            // Check if account is already activated
            if (userData.email_verified_at) {
                console.log('Account already activated:', userData.email);
                return NextResponse.redirect(new URL('/account-already-activated', request.nextUrl.origin));
            }
            
            // Prepare update data
            const updateData = {
                ...userData,
                email_verified_at: now,
                remember_token: token,
                created_at: now
            };
            
            console.log(`Updating user ${userId} with activation data:`, {
                email_verified_at: now,
                remember_token: token,
                created_at: now
            });
            
            // Make API call to update user record with PUT method
            const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            // Log the complete response for debugging
            const responseText = await response.text();
            console.log(`API update response status: ${response.status}`, responseText);

            // Try to parse the response as JSON if possible
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                responseData = { text: responseText };
            }

            if (!response.ok) {
                console.error('API error when updating user:', responseData);
                
                // Special handling for certain error types
                if (response.status === 405) {
                    console.log('Attempting to use PATCH method instead of PUT...');
                    
                    const patchResponse = await fetch(`https://fpl.timefortea.io.vn/api/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email_verified_at: now,
                            remember_token: token,
                            created_at: now
                        }),
                    });
                    
                    if (patchResponse.ok) {
                        console.log('PATCH request successful');
                        return NextResponse.redirect(`${request.nextUrl.origin}/account-activated`);
                    } else {
                        console.error('PATCH request also failed:', await patchResponse.text());
                    }
                }
                
                throw new Error(`Failed to activate account: ${responseData?.message || 'Unknown error'}`);
            }

            console.log('Account activated successfully for user ID:', userId);
            // Redirect to success page with absolute URL
            return NextResponse.redirect(`${request.nextUrl.origin}/account-activated`);
        } catch (error) {
            console.error('Error activating account:', error);
            // Redirect to error page with absolute URL
            return NextResponse.redirect(`${request.nextUrl.origin}/activation-error?error=update-failed`);
        }
    } catch (error) {
        console.error('Error in activation route:', error);
        // Redirect to error page with absolute URL for unexpected errors
        return NextResponse.redirect(`${request.nextUrl.origin}/activation-error?error=unexpected`);
    }
} 