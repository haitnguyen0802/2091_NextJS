'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BreadCrumb from "@/app/components/BreadCrumb";
import ProductDetailTop from "./ProductDetailTop";
import ProductDetailTabs from "./ProductDetailTabs";

interface Product {
    id: number;
    ten_sp: string;
    gia: number;
    gia_km: number | null;
    hinh: string;
    mo_ta: string;
    id_loai: number;
    created_at: string | null;
    updated_at: string | null;
    slug?: string;
}

interface ProductDetailPageProps {
    productId?: string | null;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const id = productId || params.slug;
                
                if (!id) {
                    throw new Error("Product ID not found");
                }

                const response = await fetch(`https://fpl.timefortea.io.vn/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [params.slug, productId]);

    if (loading) {
        return (
            <main className="main">
                <BreadCrumb />
                <div className="page-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="main">
                <BreadCrumb />
                <div className="page-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <div className="alert alert-danger" role="alert">
                                    {error || "Product not found"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="main">
            <BreadCrumb />
            <div className="page-content">
                <div className="container">
                    <ProductDetailTop product={product} />
                    <ProductDetailTabs product={product} />
                </div>
            </div>
        </main>
    );
}
