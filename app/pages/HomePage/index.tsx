import IntroSection from './IntroSection';
import Featured from './Featured';
import DealSection from './DealSection';
import BrandSection from './BrandSection';
import FeaturedSection from './FeaturedSection';
import PrivacySection from './PrivacySection';
import HotDealSection from './HotDealSection';
export default function HomePage() {
    return (
        <>
            <main className="main">
                <IntroSection />
                <Featured />
                <div className="mb-7 mb-lg-11" />
                <DealSection />
                <BrandSection />
                <div className="container">
                    <hr className="mt-3 mb-6" />
                </div>
                <div className="container">
                    <hr className="mt-5 mb-6" />
                </div>
                <FeaturedSection />
                <div className="container">
                    <hr className="mt-5 mb-0" />
                </div>
                <PrivacySection />
                <HotDealSection />
            </main>

        </>
    )
}
