import { PATHS } from '@/public/constants/paths';
import Link from 'next/link';
export default function BreadCrumb() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href={PATHS.HOME}>Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Product</li>
                    </ol>
                </div>
            </nav>
        </>
    );
}
