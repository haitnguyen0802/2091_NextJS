'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { PATHS } from '@/public/constants/paths';

interface OwlCarouselOptions {
    items?: number;
    margin?: number;
    loop?: boolean;
    nav?: boolean;
    dots?: boolean;
    autoplay?: boolean;
    autoplayTimeout?: number;
    responsive?: Record<number, { items?: number; nav?: boolean }>;
}

interface CountdownOptions {
    until?: string | Date;
    since?: string | Date;
    timezone?: string;
    format?: string;
    layout?: string;
    compact?: boolean;
    padZeroes?: boolean;
    significant?: number;
    label?: string[];
    labels?: string[];
    onExpiry?: () => void;
    onTick?: () => void;
}

interface JQuery {
    owlCarousel(options?: OwlCarouselOptions): JQuery;
    data(key: string): unknown;
    trigger(event: string): JQuery;
    each(fn: (this: HTMLElement) => void): JQuery;
    length: number;
    countdown(options?: CountdownOptions): JQuery;
    attr(name: string): string;
    attr(name: string, value: string): JQuery;
    collapse(action?: string): JQuery;
    on(event: string, handler: (e: Event) => void): JQuery;
    hasClass(className: string): boolean;
    css(property: string, value: string): JQuery;
    addClass(className: string): JQuery;
    removeClass(className: string): JQuery;
}

interface JQueryStatic {
    fn: {
        owlCarousel?: (options?: OwlCarouselOptions) => JQuery;
        countdown?: (options?: CountdownOptions) => JQuery;
        collapse?: (options?: string | Record<string, unknown>) => JQuery;
    };
    (selector: string | JQuery): JQuery;
    (element: HTMLElement): JQuery;
    (event: Event): JQuery;
}

declare global {
    interface Window {
        jQuery: JQueryStatic;
    }
}

export default function ClientScripts() {
    const pathname = usePathname();

    const destroyOwlCarousel = useCallback(() => {
        if (typeof window === 'undefined' || !window.jQuery) return;
        const $ = window.jQuery;

        try {
            $('.owl-carousel').each(function () {
                const $this = $(this);
                if ($this.data('owl.carousel')) {
                    $this.trigger('destroy.owl.carousel');
                }
            });
        } catch (e) {
            console.error('Error destroying carousel:', e);
        }
    }, []);

    const initOwlCarousel = useCallback(() => {
        if (typeof window === 'undefined' || !window.jQuery) return;
        const $ = window.jQuery;
        if (!$.fn?.owlCarousel) return;

        try {
            $('.owl-carousel').each(function () {
                const $this = $(this);
                let options = {};

                try {
                    const dataOptions = $this.data('owl-options');
                    if (dataOptions) {
                        options = typeof dataOptions === 'string'
                            ? JSON.parse(dataOptions.replace(/'/g, '"'))
                            : dataOptions;
                    }
                } catch (e) {
                    console.error('Error parsing options:', e);
                }

                if (!Object.keys(options).length) {
                    options = {
                        items: 4,
                        margin: 20,
                        loop: true,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        responsive: {
                            0: { items: 1 },
                            576: { items: 2 },
                            992: { items: 3 },
                            1200: { items: 4 }
                        }
                    };
                }

                try {
                    $this.owlCarousel(options);
                } catch (e) {
                    console.error('Error initializing carousel:', e);
                }
            });
        } catch (e) {
            console.error('Error in carousel setup:', e);
        }
    }, []);

    // Hàm xử lý intro-slider riêng biệt
    const initIntroSlider = useCallback(() => {
        if (typeof window === 'undefined' || !window.jQuery) return;
        const $ = window.jQuery;
        if (!$.fn?.owlCarousel) return;

        try {
            // Tìm và xử lý riêng intro-slider
            $('.intro-slider.owl-carousel').each(function () {
                const $this = $(this);

                // Đảm bảo huỷ trước khi khởi tạo lại
                if ($this.data('owl.carousel')) {
                    $this.trigger('destroy.owl.carousel');
                }

                // Options mặc định cho intro-slider
                const options = {
                    items: 1,
                    dots: true,
                    nav: true,
                    loop: true,
                    margin: 0,
                    responsive: {
                        992: {
                            items: 1,
                            nav: true
                        }
                    }
                };

                // Khởi tạo carousel
                $this.owlCarousel(options);
            });
        } catch (e) {
            console.error('Error initializing intro slider:', e);
        }
    }, []);

    // Hàm khởi tạo countdown
    const initCountdown = useCallback(() => {
        if (typeof window === 'undefined' || !window.jQuery) return;
        const $ = window.jQuery;
        if (!$.fn?.countdown) return;

        try {
            // Trước tiên, thêm suppressHydrationWarning cho các phần tử countdown để tránh lỗi hydration
            $('.deal-countdown, .product-countdown').each(function () {
                $(this).attr('suppressHydrationWarning', 'true');
            });

            // Khởi tạo cho deal-countdown
            $('.deal-countdown').each(function () {
                const $this = $(this);
                let until = $this.data('until');

                if (!until) {
                    until = '+10h'; // Giá trị mặc định nếu không có data-until
                }

                const options: CountdownOptions = {
                    until: until as string,
                    format: 'HMS',
                    padZeroes: true
                };

                try {
                    $this.countdown(options);
                } catch (e) {
                    console.error('Error initializing deal countdown:', e);
                }
            });

            // Khởi tạo cho product-countdown
            $('.product-countdown').each(function () {
                const $this = $(this);
                let until = $this.data('until');

                if (!until) {
                    until = '+10h'; // Giá trị mặc định nếu không có data-until
                }

                const options: CountdownOptions = {
                    until: until as string,
                    format: 'HMS',
                    padZeroes: true
                };

                try {
                    $this.countdown(options);
                } catch (e) {
                    console.error('Error initializing product countdown:', e);
                }
            });
        } catch (e) {
            console.error('Error in countdown setup:', e);
        }
    }, []);

    // Hàm khởi tạo các thành phần Bootstrap như collapse
    const initBootstrapComponents = useCallback(() => {
        if (typeof window === 'undefined' || !window.jQuery) return;
        const $ = window.jQuery;

        try {
            // Khởi tạo collapse
            $('[data-toggle="collapse"]').each(function () {
                const $this = $(this);
                const target = $this.attr('href') || $this.data('target');

                if (!target) return;

                // Đảm bảo thuộc tính aria-expanded phản ánh trạng thái thực tế
                const $target = $(target as string);
                const isExpanded = $target.hasClass('show');
                $this.attr('aria-expanded', isExpanded ? 'true' : 'false');

                // Xử lý sự kiện click
                $this.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                        // Toggle collapse
                        $target.collapse('toggle');

                        // Cập nhật aria-expanded
                        const newState = !$target.hasClass('show');
                        $this.attr('aria-expanded', newState ? 'true' : 'false');
                    } catch (err) {
                        console.error('Error toggling collapse:', err);
                    }

                    return false;
                });
            });

            // Khởi tạo collapse với trạng thái ban đầu
            $('.collapse.show').each(function () {
                const $this = $(this);
                try {
                    $this.collapse('show');
                } catch (e) {
                    console.error('Error showing collapse:', e);
                }
            });

        } catch (e) {
            console.error('Error initializing Bootstrap components:', e);
        }
    }, []);

    useEffect(() => {
        // Skip if we're not in the browser
        if (typeof window === 'undefined') return;

        let timeoutIds: NodeJS.Timeout[] = [];

        const setupComponents = () => {
            // Destroy existing carousels first
            destroyOwlCarousel();

            // Khởi tạo với nhiều timeout khác nhau để đảm bảo tất cả assets đã load
            const delays = [100, 300, 600, 1000];
            timeoutIds = delays.map(delay =>
                setTimeout(() => {
                    if (pathname === '/' || pathname === PATHS.HOME) {
                        // Khởi tạo tất cả carousels
                        initOwlCarousel();
                        // Khởi tạo riêng intro-slider
                        initIntroSlider();
                        // Khởi tạo countdown
                        initCountdown();
                    } else {
                        // Ở trang khác, chỉ khởi tạo carousel và countdown thông thường
                        initOwlCarousel();
                        initCountdown();
                    }

                    // Khởi tạo các thành phần Bootstrap (mọi trang)
                    initBootstrapComponents();
                }, delay)
            );
        };

        // Xử lý khi path thay đổi
        setupComponents();

        // Xử lý khi page load hoàn tất
        if (document.readyState === 'complete') {
            setupComponents();
        } else {
            // Lắng nghe sự kiện DOMContentLoaded
            const domLoadedHandler = () => {
                setupComponents();
            };
            document.addEventListener('DOMContentLoaded', domLoadedHandler);

            // Lắng nghe sự kiện load
            const loadHandler = () => {
                setupComponents();
            };
            window.addEventListener('load', loadHandler);

            // Cleanup
            return () => {
                timeoutIds.forEach(clearTimeout);
                document.removeEventListener('DOMContentLoaded', domLoadedHandler);
                window.removeEventListener('load', loadHandler);
                destroyOwlCarousel();
            };
        }

        return () => {
            timeoutIds.forEach(clearTimeout);
            destroyOwlCarousel();
        };
    }, [pathname, destroyOwlCarousel, initOwlCarousel, initIntroSlider, initCountdown, initBootstrapComponents]);

    return null;
} 