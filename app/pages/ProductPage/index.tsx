import BannerSection from './BannerSection';
import BreadCrumb from '@/app/components/BreadCrumb';
import MainProduct from './MainProduct';
import ASide from './ASide';

export default function ProductPage() {
    return (
        <>
            <main className="main">
                <BannerSection />
                <BreadCrumb />
                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <MainProduct />
                            <ASide />   
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
