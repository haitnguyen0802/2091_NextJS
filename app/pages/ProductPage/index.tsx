'use client';

import BannerSection from './BannerSection';
import BreadCrumb from '@/app/components/BreadCrumb';
import MainProduct from './MainProduct';
import ASide from './ASide';
import { useState } from 'react';

export default function ProductPage() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <>
            <main className="main">
                <BannerSection />
                <BreadCrumb />
                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <MainProduct selectedCategoryId={selectedCategoryId} />
                            <ASide onCategorySelect={handleCategorySelect} />   
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
