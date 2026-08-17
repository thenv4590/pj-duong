import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { CategorySection } from "@/components/home/category-section";
import { ProductSection } from "@/components/home/product-section";
import { ValueProps } from "@/components/home/value-props";
import { siteConfig, newArrivalProducts, featuredProducts } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/logo.svg`,
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.youtube,
    ],
    contactPoint: siteConfig.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.value,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">{siteConfig.name} - {siteConfig.tagline}</h1>

      <HeroCarousel />
      <CategorySection />
      <ProductSection
        id="new-arrival"
        title="New Arrival"
        subtitle="Bộ sưu tập sofa mới nhất từ Kuka Home"
        viewAllHref="/collections/new-arrival"
        products={newArrivalProducts}
        columns={3}
      />
      <ValueProps />
      <ProductSection
        id="featured"
        title="Sản phẩm nổi bật"
        subtitle="Ưu đãi đến 40% cho các mẫu sofa bán chạy nhất"
        viewAllHref="/collections/khuyen-mai"
        products={featuredProducts}
        columns={4}
      />
    </>
  );
}
