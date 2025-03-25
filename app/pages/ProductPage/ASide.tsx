import PriceRange from './PriceRange';
import SelectCategories from './SelectCategories';
export default function ASide() {
    return (
        <>
            <aside className="col-lg-3 order-lg-first">
                <div className="sidebar sidebar-shop">
                    <div className="widget widget-clean">
                        <label>Filters:</label>
                        <a href="#" className="sidebar-filter-clear">Clean All</a>
                    </div>
                    <SelectCategories />
                    <PriceRange />
                </div>
            </aside>
        </>
    );
}
