'use client';

import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);

    const switchToLogin = () => setMode('login');
    const switchToRegister = () => setMode('register');

    // Nếu không mở, không render gì cả
    if (!isOpen) return null;

    return (
        <>
            {mode === 'login' ? (
                <LoginModal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    onSwitchToRegister={switchToRegister} 
                />
            ) : (
                <RegisterModal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    onSwitchToLogin={switchToLogin} 
                />
            )}
            <div className="modal-backdrop fade show"></div>
        </>
    );
} 