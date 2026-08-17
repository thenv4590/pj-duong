import type { Product } from "@/lib/site-config";

export type ProductContent = {
  productType: string;
  specs: string[];
  description: string;
  features: string[];
};

const DEFAULT_FEATURES = [
  "Da/vải bọc cao cấp: bề mặt mềm mịn, độ bền cao, giữ màu đẹp theo thời gian sử dụng.",
  "Khung gỗ tự nhiên kết hợp khung kim loại chịu lực, kết cấu chắc chắn, vận hành ổn định.",
  "Đệm nhiều tầng nâng đỡ: kết hợp nâng - ôm - đỡ, tạo cảm giác êm ái nhưng vẫn chắc chắn.",
  "Thiết kế tối ưu không gian sống, phù hợp với nhiều phong cách nội thất hiện đại.",
];

const PRODUCT_CONTENT: Record<string, ProductContent> = {
  "jd-6016": {
    productType: "Ghế sofa điện",
    specs: [
      "Chất liệu: Da bò tự nhiên, mút xốp sponge đàn hồi cao, khung gỗ chắc chắn",
      "Xuất xứ: Trung Quốc",
      "Bảo quản: Đặt nơi khô ráo, thoáng mát, có mái che, tránh ánh nắng trực tiếp và độ ẩm cao",
    ],
    description:
      "Bộ ghế sofa điện bọc da bò KUKA Home JD.6016 mang đến trải nghiệm thư giãn chuẩn “không trọng lực” với cơ chế ngả lưng điện thông minh. Thiết kế đệm nhiều tầng nâng đỡ toàn thân, kết hợp da bò lớp trên mềm mịn giúp mỗi lần ngồi đều trở thành một khoảng nghỉ trọn vẹn. Vừa sang trọng, vừa tiện nghi, JD.6016 phù hợp cho không gian phòng khách hiện đại đề cao sự thoải mái.",
    features: [
      "Da bò lớp trên cao cấp: Bề mặt mềm mịn, độ bền cao, giữ vân da tự nhiên. Càng sử dụng càng lên màu đẹp và sang.",
      "Cơ chế zero gravity: Tư thế ngả tối ưu giúp cơ thể được thả lỏng, giảm áp lực lên lưng và chân.",
      "Ngả lưng điện thông minh: Điều chỉnh mượt mà chỉ với một thao tác, linh hoạt theo từng nhu cầu nghỉ ngơi.",
      "Thiết kế 0cm sát tường: Không cần khoảng hở phía sau, tiết kiệm diện tích và tối ưu không gian sống.",
      "Đệm nhiều tầng nâng đỡ: Kết hợp nâng - ôm - đỡ, tạo cảm giác êm ái nhưng vẫn chắc chắn.",
      "Khung kim loại chịu lực cao: Cơ cấu vững chắc, vận hành ổn định và bền bỉ theo thời gian.",
    ],
  },
};

export function getProductContent(product: Product): ProductContent {
  const preset = PRODUCT_CONTENT[product.id];
  if (preset) return preset;

  const material = product.category === "Sofa vải" ? "vải bố cao cấp" : "da bò tự nhiên";
  const productType = product.category === "Sofa vải" ? "Ghế sofa bọc vải" : "Ghế sofa bọc da";

  return {
    productType,
    specs: [
      `Chất liệu: ${material}, mút xốp sponge đàn hồi cao, khung gỗ chắc chắn`,
      "Xuất xứ: Trung Quốc",
      "Bảo quản: Đặt nơi khô ráo, thoáng mát, có mái che, tránh ánh nắng trực tiếp và độ ẩm cao",
    ],
    description: `${product.name} sở hữu thiết kế sang trọng, khung dáng vững chãi cùng lớp đệm nâng đỡ nhiều tầng mang lại cảm giác êm ái khi sử dụng. Chất liệu ${material} cao cấp được tuyển chọn kỹ lưỡng, bền đẹp theo thời gian, phù hợp với không gian phòng khách hiện đại đề cao sự thoải mái và tinh tế.`,
    features: DEFAULT_FEATURES,
  };
}
