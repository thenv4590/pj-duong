import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/product/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductSection } from "@/components/home/product-section";
import { formatVnd } from "@/lib/format";
import { getProductContent } from "@/lib/product-content";
import {
  allProducts,
  getProductBySlug,
  getRelatedProducts,
  siteConfig,
} from "@/lib/site-config";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.name;
  const description = `${product.name} - Giá ${formatVnd(product.price)}. Mã sản phẩm ${product.sku}, thương hiệu ${product.brand}. Giao hàng, lắp đặt tận nơi, bảo hành chính hãng.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const content = getProductContent(product);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${siteConfig.url}${product.image}`],
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    description: content.description,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: "VND",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/collections/all" },
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} name={product.name} />
          <ProductBuyBox product={product} />
        </div>

        <div className="mt-12 max-w-3xl lg:mt-16">
          <section aria-labelledby="specs-heading" className="mb-8">
            <h2 id="specs-heading" className="text-lg font-bold text-ink">
              1.&nbsp;Thông số kỹ thuật
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>- Loại sản phẩm: {content.productType}</li>
              <li>- Mã tổng: {product.sku}</li>
              {content.specs.map((spec) => (
                <li key={spec}>- {spec}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="description-heading" className="mb-8">
            <h2 id="description-heading" className="text-lg font-bold text-ink">
              2. Mô tả sản phẩm
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {content.description}
            </p>
          </section>

          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-lg font-bold text-ink">
              3. Đặc điểm nổi bật
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {content.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <ProductSection
          id="related-products"
          title="Sản phẩm liên quan"
          viewAllHref="/collections/all"
          products={related}
          columns={4}
        />
      )}
    </>
  );
}
