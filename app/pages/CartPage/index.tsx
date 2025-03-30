import BreadCrumb from "@/app/components/BreadCrumb";
import ListProduct from "./ListProducts";
import CartTotal from "./CartTotal";

export default function CartPage() {
    return (
        <>
            <main className="main">
                <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
                    <div className="container">
                        <h1 className="page-title">Shopping Cart</h1>
                    </div>
                </div>
                <BreadCrumb />
                <div className="page-content">
                    <div className="cart">
                        <div className="container">
                            <div className="row">
                                <ListProduct />
                                <CartTotal />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}