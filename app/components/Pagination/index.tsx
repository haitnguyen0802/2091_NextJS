interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Nếu tổng số trang ít hơn hoặc bằng maxVisiblePages, hiển thị tất cả
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <a 
                            className="page-link" 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                        >
                            {i}
                        </a>
                    </li>
                );
            }
        } else {
            // Luôn hiển thị trang đầu
            pages.push(
                <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <a 
                        className="page-link" 
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(1);
                        }}
                    >
                        1
                    </a>
                </li>
            );

            // Thêm dấu ... nếu cần
            if (currentPage > 3) {
                pages.push(
                    <li key="ellipsis1" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }

            // Hiển thị các trang xung quanh trang hiện tại
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <a 
                            className="page-link" 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                        >
                            {i}
                        </a>
                    </li>
                );
            }

            // Thêm dấu ... nếu cần
            if (currentPage < totalPages - 2) {
                pages.push(
                    <li key="ellipsis2" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }

            // Luôn hiển thị trang cuối
            pages.push(
                <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                    <a 
                        className="page-link" 
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(totalPages);
                        }}
                    >
                        {totalPages}
                    </a>
                </li>
            );
        }

        return pages;
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a 
                        className="page-link page-link-prev" 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        aria-label="Previous" 
                        tabIndex={currentPage === 1 ? -1 : undefined} 
                        aria-disabled={currentPage === 1}
                    >
                        <span aria-hidden="true">
                            <i className="icon-long-arrow-left" />
                        </span>Prev
                    </a>
                </li>
                {renderPageNumbers()}
                <li className="page-item-total">of {totalPages}</li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a 
                        className="page-link page-link-next" 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                        aria-label="Next"
                    >
                        Next
                        <span aria-hidden="true">
                            <i className="icon-long-arrow-right" />
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

