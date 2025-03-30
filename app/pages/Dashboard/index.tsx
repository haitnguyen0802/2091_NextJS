'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumb from "@/app/components/BreadCrumb";
import UserControl from "./UserControl";
import TabAccount from "./TabAccount";
import TabOrder from "./TabOrder";
import TabAddress from "./TabAddress";
import { useState } from "react";
import { useAuth } from '@/app/context/AuthContext';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<string>("account");
    const { isAuthenticated, loading, user } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <div className="container text-center py-5">Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        return null; // Will be redirected by the useEffect
    }

    return (
        <>
            <main className="main">
                <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
                    <div className="container">
                        <h1 className="page-title">My Account</h1>
                    </div>
                </div>
                <BreadCrumb />
                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <div className="row">
                                <UserControl activeTab={activeTab} onTabChange={handleTabChange} />
                                <div className="col-md-8 col-lg-9">
                                    <div className="tab-content">
                                        {activeTab === "account" && <TabAccount />}
                                        {activeTab === "orders" && <TabOrder />}
                                        {activeTab === "address" && <TabAddress />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}