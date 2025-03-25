'use client';

import { useEffect, useRef } from 'react';

export default function SelectCategories() {
    const collapseRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Đảm bảo nội dung hiển thị khi component được mount
        if (collapseRef.current) {
            collapseRef.current.style.visibility = 'visible';
        }
    }, []);
    
    return (
        <>
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
                        Category 
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
                        <div className="filter-items filter-items-count">
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-1" />
                                    <label className="custom-control-label" htmlFor="cat-1">TV</label>
                                </div>
                                <span className="item-count">3</span>
                            </div>
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-2" />
                                    <label className="custom-control-label" htmlFor="cat-2">Computers</label>
                                </div>
                                <span className="item-count">0</span>
                            </div>
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-3" />
                                    <label className="custom-control-label" htmlFor="cat-3">Tablets &amp; Cell
                                        Phones</label>
                                </div>
                                <span className="item-count">4</span>
                            </div>
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-4" />
                                    <label className="custom-control-label" htmlFor="cat-4">Smartwatches</label>
                                </div>
                                <span className="item-count">2</span>
                            </div>
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-5" />
                                    <label className="custom-control-label" htmlFor="cat-5">Accessories</label>
                                </div>
                                <span className="item-count">2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

