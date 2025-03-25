'use client';

interface ToolBoxProps {
    onSortChange: (sortType: string) => void;
    totalProducts: number;
    currentPage: number;
    productsPerPage: number;
}

export default function ToolBox({ onSortChange, totalProducts, currentPage, productsPerPage }: ToolBoxProps) {
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = Math.min(startProduct + productsPerPage - 1, totalProducts);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log('Sort changed to:', e.target.value); // Debug log
        onSortChange(e.target.value);
    };

    return (
        <div className="toolbox">
            <div className="toolbox-left">
                <div className="toolbox-info">
                    Showing <span>{startProduct}-{endProduct} of {totalProducts}</span> Products
                </div>
            </div>
            <div className="toolbox-right">
                <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <div className="select-custom">
                        <select 
                            name="sortby" 
                            id="sortby" 
                            className="form-control"
                            onChange={handleSortChange}
                            defaultValue="popular"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="price-low-high">Price Low to High</option>
                            <option value="price-high-low">Price High to Low</option>
                            <option value="newest">Newest</option>
                            <option value="rated">Most Rated</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
