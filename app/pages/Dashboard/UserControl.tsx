'use client';

import { useAuth } from "@/app/context/AuthContext";

interface UserControlProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function UserControl({ activeTab, onTabChange }: UserControlProps) {
    const { logout } = useAuth();

    const handleSignOut = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
    };

    return (
        <>
            <aside className="col-md-4 col-lg-3">
                <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => onTabChange('account')}
                            role="tab"
                            href="#"
                        >
                            Account Details
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => onTabChange('orders')}
                            role="tab"
                            href="#"
                        >
                            Orders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                            onClick={() => onTabChange('address')}
                            role="tab"
                            href="#"
                        >
                            Addresses
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={handleSignOut}>Sign Out</a>
                    </li>
                </ul>
            </aside>
        </>
    )
}