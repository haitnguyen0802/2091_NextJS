import BreadCrumb from "@/app/components/BreadCrumb";
import ProductDetailTop from "./ProductDetailTop";
import ProductDetailTabs from "./ProductDetailTabs";

export default function ProductDetailPage() {
    return (
        <>
            <main className="main">
                <BreadCrumb />
                <div className="page-content">
                    <div className="container">
                        <ProductDetailTop />
                        <ProductDetailTabs />
                    </div>
                </div>
            </main>
        </>
    )
}
