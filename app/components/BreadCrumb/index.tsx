import { PATHS } from '@/public/constants/paths';
import Link from 'next/link';

interface BreadCrumbProps {
    title?: string;
}

export default function BreadCrumb({ title = 'Product' }: BreadCrumbProps) {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href={PATHS.HOME}>Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </div>
            </nav>
        </>
    );
}
