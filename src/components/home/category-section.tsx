import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/site-config";

export function CategorySection() {
  return (
    <section
      aria-labelledby="category-heading"
      className="mx-auto max-w-[1280px] px-4 py-10 lg:py-14"
    >
      <h2
        id="category-heading"
        className="mb-6 text-center text-xl font-bold uppercase tracking-wide text-ink sm:text-2xl"
      >
        Danh Mục Sản Phẩm
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-lg"
            style={{ backgroundColor: category.bg }}
          >
            <Image
              src={category.image}
              alt={category.label}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="relative z-10 w-full bg-gradient-to-t from-black/60 to-transparent p-5">
              <span className="text-lg font-bold text-white">
                {category.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
