'use client';

import { useEffect, useRef, useState } from 'react';

interface Category {
    id: number;
    ten_loai: string;
    slug: string | null;
    thu_tu: number;
    an_hien: number;
    created_at: string | null;
    updated_at: string | null;
}

interface SelectCategoriesProps {
    onCategorySelect: (categoryId: number) => void;
}

export default function SelectCategories({ onCategorySelect }: SelectCategoriesProps) {
    const collapseRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        // Đảm bảo nội dung hiển thị khi component được mount
        if (collapseRef.current) {
            collapseRef.current.style.visibility = 'visible';
        }

        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fpl.timefortea.io.vn/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(categoryId);
        onCategorySelect(categoryId);
    };

    if (loading) {
        return (
            <div className="widget widget-collapsible">
                <h3 className="widget-title">
                    <a 
                        data-toggle="collapse" 
                        href="#widget-1" 
                        role="button" 
                        aria-expanded="true" 
                        aria-controls="widget-1"
                        suppressHydrationWarning={true}
                    > 
                        Categories
                    </a>
                </h3>
                <div 
                    className="collapse show" 
                    id="widget-1" 
                    ref={collapseRef}
                    style={{ visibility: 'visible' }}
                    suppressHydrationWarning={true}
                >
                    <div className="widget-body">
                        <div className="filter-items">
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <span>Loading categories...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="widget widget-collapsible">
                <h3 className="widget-title">
                    <a 
                        data-toggle="collapse" 
                        href="#widget-1" 
                        role="button" 
                        aria-expanded="true" 
                        aria-controls="widget-1"
                        suppressHydrationWarning={true}
                    > 
                        Categories
                    </a>
                </h3>
                <div 
                    className="collapse show" 
                    id="widget-1" 
                    ref={collapseRef}
                    style={{ visibility: 'visible' }}
                    suppressHydrationWarning={true}
                >
                    <div className="widget-body">
                        <div className="filter-items">
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <span className="text-danger">Error: {error}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="widget widget-collapsible">
            <h3 className="widget-title">
                <a 
                    data-toggle="collapse" 
                    href="#widget-1" 
                    role="button" 
                    aria-expanded="true" 
                    aria-controls="widget-1"
                    suppressHydrationWarning={true}
                > 
                    Categories
                </a>
            </h3>
            <div 
                className="collapse show" 
                id="widget-1" 
                ref={collapseRef}
                style={{ visibility: 'visible' }}
                suppressHydrationWarning={true}
            >
                <div className="widget-body">
                    <div className="filter-items">
                        {categories.map((category) => (
                            <div key={category.id} className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`cat-${category.id}`}
                                        checked={selectedCategory === category.id}
                                        onChange={() => handleCategoryChange(category.id)}
                                    />
                                    <label className="custom-control-label" htmlFor={`cat-${category.id}`}>
                                        {category.ten_loai}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

