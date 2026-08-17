export const siteConfig = {
  name: "Kuka Home Việt Nam",
  shortName: "Kuka Home",
  tagline: "Nội thất cao cấp - Không gian xứng tầm",
  description:
    "Kuka Home Việt Nam mang đến sofa, nội thất phòng khách, phòng ngủ, phòng ăn cao cấp phong cách Ý, chất lượng toàn cầu với chế độ bảo hành lâu dài.",
  keywords: [
    "kuka home",
    "sofa da cao cấp",
    "nội thất phòng khách",
    "nội thất phòng ngủ",
    "sofa nhập khẩu",
    "nội thất liền tường",
  ],
  url: "https://www.kukahome-clone.example.com",
  ogImage: "/og-image.svg",
  phones: [
    { label: "Hotline TP.HCM", value: "088 899 51 58" },
    { label: "Hotline Hà Nội", value: "0889 210 008" },
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    messenger: "https://m.me/kukahomevietnam",
    zalo: "https://zalo.me/kukahomevietnam",
  },
} as const;

export type NavChild = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavChild[] = [
  { label: "TRANG CHỦ", href: "/" },
  {
    label: "GIỚI THIỆU",
    href: "/pages/gioi-thieu",
    children: [
      { label: "Câu Chuyện Thương Hiệu", href: "/pages/cau-chuyen-thuong-hieu" },
      { label: "Chính Sách Bảo Hành", href: "/pages/chinh-sach-bao-hanh" },
      { label: "Catalog", href: "/pages/catalog" },
    ],
  },
  {
    label: "SẢN PHẨM",
    href: "/collections/all",
    children: [
      {
        label: "Phòng Ngủ",
        href: "/collections/phong-ngu",
        children: [
          { label: "Giường Ngủ", href: "/collections/phong-ngu/giuong-ngu" },
          { label: "Nệm", href: "/collections/phong-ngu/nem" },
          { label: "Gối", href: "/collections/phong-ngu/goi" },
          { label: "Tủ Đầu Giường", href: "/collections/phong-ngu/tu-dau-giuong" },
          { label: "Bàn Trang Điểm", href: "/collections/phong-ngu/ban-trang-diem" },
          { label: "Ghế Trang Điểm", href: "/collections/phong-ngu/ghe-trang-diem" },
        ],
      },
      {
        label: "Phòng Ăn",
        href: "/collections/phong-an",
        children: [
          { label: "Bàn Ăn", href: "/collections/phong-an/ban-an" },
          { label: "Ghế Ăn", href: "/collections/phong-an/ghe-an" },
          { label: "Tủ Rượu", href: "/collections/phong-an/tu-ruou" },
          { label: "Tủ Bếp", href: "/collections/phong-an/tu-bep" },
        ],
      },
      {
        label: "Phòng Khách",
        href: "/collections/phong-khach",
        children: [
          { label: "Sofa", href: "/collections/phong-khach/sofa" },
          { label: "Bàn Trà", href: "/collections/phong-khach/ban-tra" },
          { label: "Kệ Tivi", href: "/collections/phong-khach/ke-tivi" },
          { label: "Tủ Trang Trí", href: "/collections/phong-khach/tu-trang-tri" },
        ],
      },
      { label: "Sản Phẩm Khác", href: "/collections/san-pham-khac" },
    ],
  },
  { label: "NỘI THẤT LIỀN TƯỜNG", href: "/collections/noi-that-lien-tuong" },
  { label: "TIN TỨC", href: "/blogs/tin-tuc" },
  { label: "HỆ THỐNG SHOWROOM", href: "/pages/he-thong-showroom" },
];

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  inStock: boolean;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  category: string;
  variants: string[];
  /** Optional per-variant price override, same length/order as `variants`. */
  variantPrices?: number[];
};

export const newArrivalProducts: Product[] = [
  {
    id: "kg-a168",
    name: "Ghế sofa thư giãn bọc da bò KUKA Home KG.A168",
    slug: "ghe-sofa-thu-gian-boc-da-bo-kuka-home-kg-a168",
    sku: "90.KG.A168",
    brand: "KUKA Home",
    inStock: true,
    price: 45599000,
    image: "/images/products/kg-a168.svg",
    images: ["/images/products/kg-a168.svg", "/images/products/kg-a168-2.svg"],
    category: "Sofa da",
    variants: ["1 chỗ ngồi thư giãn - da bò màu nâu", "1 chỗ ngồi thư giãn - da bò màu kem"],
  },
  {
    id: "jd-6016",
    name: "Bộ ghế sofa bọc da bò KUKA Home JD.6016",
    slug: "bo-ghe-sofa-dien-boc-da-bo-kuka-home-jd-6016",
    sku: "90.JD.6016",
    brand: "KUKA Home",
    inStock: true,
    price: 97499000,
    image: "/images/products/jd-6016.svg",
    images: ["/images/products/jd-6016.svg", "/images/products/jd-6016-2.svg"],
    category: "Sofa da",
    variants: ["1.5(LAF)|E+1.5(OA)+1.5(RAF)|E", "1.5(LAF)|E+1.5(OA)+1.5(OA)+1.5(RAF)|E"],
    variantPrices: [97499000, 113219000],
  },
  {
    id: "lh-5009",
    name: "Bộ ghế sofa bọc da bò KUKA Home LH.5009",
    slug: "bo-ghe-sofa-boc-da-bo-kuka-home-lh-5009",
    sku: "90.LH.5009",
    brand: "KUKA Home",
    inStock: true,
    price: 69509000,
    image: "/images/products/lh-5009.svg",
    images: ["/images/products/lh-5009.svg", "/images/products/lh-5009-2.svg"],
    category: "Sofa da",
    variants: ["Góc chữ L - tay trái", "Góc chữ L - tay phải"],
  },
];

export const featuredProducts: Product[] = [
  {
    id: "8177",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home 8177",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-8177",
    sku: "90.8177",
    brand: "KUKA Home",
    inStock: true,
    price: 58559000,
    compareAtPrice: 97599000,
    image: "/images/products/8177.svg",
    images: ["/images/products/8177.svg", "/images/products/8177-2.svg"],
    category: "Sofa da",
    variants: ["Văng đơn - da bò nâu", "Văng đơn - da bò đen"],
  },
  {
    id: "8207",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home 8207",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-8207",
    sku: "90.8207",
    brand: "KUKA Home",
    inStock: true,
    price: 52799000,
    compareAtPrice: 87999000,
    image: "/images/products/8207.svg",
    images: ["/images/products/8207.svg", "/images/products/8207-2.svg"],
    category: "Sofa da",
    variants: ["Văng đơn - da bò xám", "Văng đơn - da bò kem"],
  },
  {
    id: "8216",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home 8216",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-8216",
    sku: "90.8216",
    brand: "KUKA Home",
    inStock: true,
    price: 61799000,
    compareAtPrice: 102999000,
    image: "/images/products/8216.svg",
    images: ["/images/products/8216.svg", "/images/products/8216-2.svg"],
    category: "Sofa da",
    variants: ["Góc chữ L - da bò nâu", "Góc chữ L - da bò xám"],
  },
  {
    id: "9658",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home 9658",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-9658",
    sku: "90.9658",
    brand: "KUKA Home",
    inStock: true,
    price: 47999000,
    compareAtPrice: 79999000,
    image: "/images/products/9658.svg",
    images: ["/images/products/9658.svg", "/images/products/9658-2.svg"],
    category: "Sofa da",
    variants: ["Văng đơn - da bò nâu"],
  },
  {
    id: "jl-321",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home JL.321",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-jl-321",
    sku: "90.JL.321",
    brand: "KUKA Home",
    inStock: true,
    price: 44399000,
    compareAtPrice: 73999000,
    image: "/images/products/jl-321.svg",
    images: ["/images/products/jl-321.svg", "/images/products/jl-321-2.svg"],
    category: "Sofa da",
    variants: ["Văng đôi - da bò đen", "Văng đôi - da bò nâu"],
  },
  {
    id: "km-5013",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home KM.5013",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-km-5013",
    sku: "90.KM.5013",
    brand: "KUKA Home",
    inStock: true,
    price: 53999000,
    compareAtPrice: 89999000,
    image: "/images/products/km-5013.svg",
    images: ["/images/products/km-5013.svg", "/images/products/km-5013-2.svg"],
    category: "Sofa da",
    variants: ["Góc chữ U - da bò xám"],
  },
  {
    id: "kuka-130",
    name: "[GIẢM 40%] Bộ ghế sofa bọc da bò KUKA Home 130",
    slug: "giam-40-bo-ghe-sofa-boc-da-bo-kuka-home-kuka-130",
    sku: "90.KUKA.130",
    brand: "KUKA Home",
    inStock: false,
    price: 50399000,
    compareAtPrice: 83999000,
    image: "/images/products/kuka-130.svg",
    images: ["/images/products/kuka-130.svg", "/images/products/kuka-130-2.svg"],
    category: "Sofa da",
    variants: ["Văng đơn - da bò kem"],
  },
  {
    id: "kg-6033",
    name: "[GIẢM 40%] Bộ ghế sofa bọc vải KUKA Home KG.6033",
    slug: "giam-40-bo-ghe-sofa-boc-vai-kuka-home-kg-6033",
    sku: "90.KG.6033",
    brand: "KUKA Home",
    inStock: true,
    price: 38999000,
    compareAtPrice: 64999000,
    image: "/images/products/kg-6033.svg",
    images: ["/images/products/kg-6033.svg", "/images/products/kg-6033-2.svg"],
    category: "Sofa vải",
    variants: ["Văng đơn - vải xám", "Văng đơn - vải be"],
  },
];

export const allProducts: Product[] = [...newArrivalProducts, ...featuredProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = allProducts.filter(
    (item) => item.id !== product.id && item.category === product.category
  );
  const rest = allProducts.filter(
    (item) => item.id !== product.id && item.category !== product.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export const categories = [
  { label: "Phòng Khách", href: "/collections/phong-khach", bg: "var(--category-1)", image: "/images/categories/cat-1.svg" },
  { label: "Phòng Ăn", href: "/collections/phong-an", bg: "var(--category-2)", image: "/images/categories/cat-2.svg" },
  { label: "Phòng Ngủ", href: "/collections/phong-ngu", bg: "var(--category-3)", image: "/images/categories/cat-3.svg" },
];

export const heroSlides = [
  {
    title: "Nội Thất Cao Cấp",
    subtitle: "Không Gian Xứng Tầm",
    cta: "Mua Ngay",
    href: "/collections/phong-khach",
    image: "/images/hero/banner-1.svg",
  },
  {
    title: "Sang Trọng",
    subtitle: "Bộ Sưu Tập Phòng Ngủ",
    cta: "Xem Ngay",
    href: "/collections/phong-ngu",
    image: "/images/hero/banner-2.svg",
  },
  {
    title: "Tinh Tế",
    subtitle: "Nội Thất Liền Tường",
    cta: "Xem Ngay",
    href: "/collections/noi-that-lien-tuong",
    image: "/images/hero/banner-3.svg",
  },
];

export const valueProps = [
  {
    title: "NĂNG LỰC TOÀN CẦU",
    description: "Thương hiệu nội thất hiện diện tại hơn 100 quốc gia, hệ thống sản xuất quy mô toàn cầu.",
  },
  {
    title: "BẢO HÀNH LÂU DÀI",
    description: "20 năm cho khung ghế nệm, 15 năm cho sofa điện - an tâm sử dụng lâu dài.",
  },
  {
    title: "TRÁCH NHIỆM XÃ HỘI",
    description: "Cam kết phát triển bền vững, thân thiện môi trường trong từng sản phẩm.",
  },
  {
    title: "TOP 1 DOANH THU TOÀN CẦU",
    description: "Thương hiệu sofa dẫn đầu doanh thu toàn cầu nhiều năm liên tiếp.",
  },
];

export const footerLinks = {
  about: [
    { label: "Câu Chuyện Thương Hiệu", href: "/pages/cau-chuyen-thuong-hieu" },
    { label: "Hệ Thống Showroom", href: "/pages/he-thong-showroom" },
    { label: "Tin Tức", href: "/blogs/tin-tuc" },
    { label: "Catalog", href: "/pages/catalog" },
  ],
  policy: [
    { label: "Chính Sách Vận Chuyển", href: "/pages/chinh-sach-van-chuyen" },
    { label: "Đổi/Trả Hàng", href: "/pages/doi-tra-hang" },
    { label: "Bảo Hành/Bảo Trì", href: "/pages/bao-hanh-bao-tri" },
    { label: "Bảo Mật Thông Tin", href: "/pages/bao-mat-thong-tin" },
  ],
  support: [
    { label: "Hướng Dẫn Mua Hàng", href: "/pages/huong-dan-mua-hang" },
    { label: "Câu Hỏi Thường Gặp", href: "/pages/cau-hoi-thuong-gap" },
    { label: "Liên Hệ", href: "/pages/lien-he" },
  ],
};
