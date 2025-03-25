'use client';

import { useEffect, useRef, useState } from 'react';

// Khai báo type cho noUiSlider và wNumb
declare global {
    interface Window {
        noUiSlider: {
            create: (element: HTMLElement, options: NoUiSliderOptions) => void;
        };
        wNumb: (options: WNumbOptions) => FormatFunction;
    }
    interface HTMLDivElement {
        noUiSlider: {
            on: (event: string, callback: (values: string[]) => void) => void;
            destroy: () => void;
        };
    }
}

interface NoUiSliderOptions {
    start: number[];
    connect: boolean;
    step: number;
    margin: number;
    range: {
        min: number;
        max: number;
    };
    tooltips: boolean;
    format: FormatFunction;
}

interface WNumbOptions {
    decimals: number;
    prefix: string;
}

interface FormatFunction {
    to: (value: number) => string;
    from: (value: string) => number;
}

export default function PriceRange() {
    const collapseRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [priceRange, setPriceRange] = useState<string>('$0 - $750');
    
    useEffect(() => {
        // Đảm bảo nội dung hiển thị khi component được mount
        if (collapseRef.current) {
            collapseRef.current.style.visibility = 'visible';
        }
        
        // Kiểm tra xem scripts đã load xong chưa và thử lại nếu cần
        const initSlider = () => {
            if (typeof window !== 'undefined' && window.noUiSlider && sliderRef.current) {
                try {
                    // Nếu slider đã được khởi tạo trước đó, destroy nó
                    if (sliderRef.current.noUiSlider) {
                        sliderRef.current.noUiSlider.destroy();
                    }
                    
                    window.noUiSlider.create(sliderRef.current, {
                        start: [0, 750],
                        connect: true,
                        step: 50,
                        margin: 200,
                        range: {
                            'min': 0,
                            'max': 1000
                        },
                        tooltips: true,
                        format: window.wNumb({
                            decimals: 0,
                            prefix: '$'
                        })
                    });
                    
                    // Update Price Range text
                    sliderRef.current.noUiSlider.on('update', function(values: string[]) {
                        const newPriceRange = values.join(' - ');
                        setPriceRange(newPriceRange);
                        
                        const priceRangeEl = document.getElementById('filter-price-range');
                        if (priceRangeEl) {
                            priceRangeEl.textContent = newPriceRange;
                        }
                    });
                    
                    console.log('noUiSlider initialized successfully');
                } catch (e) {
                    console.error('Error initializing noUiSlider:', e);
                    
                    // Thử lại sau 500ms nếu có lỗi (có thể do script chưa load)
                    setTimeout(initSlider, 500);
                }
            } else {
                // Thử lại sau 500ms nếu noUiSlider chưa có
                console.log('noUiSlider not available yet, retrying...');
                setTimeout(initSlider, 500);
            }
        };
        
        // Đợi một chút để scripts được load
        const timer = setTimeout(initSlider, 1000);
        
        // Cleanup function
        return () => {
            clearTimeout(timer);
            if (sliderRef.current && sliderRef.current.noUiSlider) {
                try {
                    sliderRef.current.noUiSlider.destroy();
                } catch (e) {
                    console.error('Error destroying noUiSlider:', e);
                }
            }
        };
    }, []);
    
    return (
        <>
            <div className="widget widget-collapsible">
                <h3 className="widget-title">
                    <a 
                        data-toggle="collapse" 
                        href="#widget-2" 
                        role="button" 
                        aria-expanded="true" 
                        aria-controls="widget-2"
                        suppressHydrationWarning={true}
                    > 
                        Price 
                    </a>
                </h3>
                <div 
                    className="collapse show" 
                    id="widget-2" 
                    ref={collapseRef}
                    style={{ visibility: 'visible' }}
                    suppressHydrationWarning={true}
                >
                    <div className="widget-body">
                        <div className="filter-price">
                            <div className="filter-price-text">
                                Price Range: <span id="filter-price-range" suppressHydrationWarning={true}>{priceRange}</span>
                            </div>
                            <div id="price-slider" ref={sliderRef} suppressHydrationWarning={true} style={{margin: '10px 0 20px'}} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

