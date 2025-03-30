export default function CartDiscount() {
    return (
        <>
            <div className="cart-discount">
                <form action="#">
                    <div className="input-group">
                        <input type="text" className="form-control input-error" required placeholder="Coupon code" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary-2" type="submit">
                                <i className="icon-long-arrow-right" />
                            </button>
                        </div>
                    </div>
                    <p className="form-error">Please fill in this field</p>
                </form>
            </div>
        </>
    )
}