'use client';

import PriceRange from './PriceRange';
import SelectCategories from './SelectCategories';

interface ASideProps {
    onCategorySelect: (categoryId: number) => void;
}

export default function ASide({ onCategorySelect }: ASideProps) {
    return (
        <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a href="#" className="sidebar-filter-clear">Clean All</a>
                </div>
                <SelectCategories onCategorySelect={onCategorySelect} />
                <PriceRange />
            </div>
        </aside>
    );
}
