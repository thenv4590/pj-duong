import Link from "next/link";
import Image from "next/image";
import { Phone, Search, User, ChevronDown, ChevronRight } from "lucide-react";
import { mainNav, siteConfig, type NavChild } from "@/lib/site-config";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartSheet } from "@/components/cart/cart-sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-topbar text-white">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-4 text-xs">
          <div className="hidden items-center gap-4 sm:flex">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.value}
                href={`tel:${phone.value.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-white/90 hover:text-white"
              >
                <Phone className="size-3" />
                <span>
                  {phone.label}: {phone.value}
                </span>
              </a>
            ))}
          </div>
          <div className="flex w-full items-center justify-end gap-4 sm:w-auto">
            <Link href="/account/login" className="text-white/90 hover:text-white">
              Đăng nhập
            </Link>
            <Link href="/account/register" className="text-white/90 hover:text-white">
              Tạo tài khoản
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 lg:h-20 lg:gap-6">
          <MobileNav />

          <Link
            href="/"
            aria-label={siteConfig.name}
            className="relative h-10 w-[137px] shrink-0 lg:h-[51px] lg:w-[176px]"
          >
            <Image
              src="/images/brand/logo.svg"
              alt={siteConfig.name}
              fill
              priority
              sizes="176px"
              className="object-contain object-left"
            />
          </Link>

          <form
            role="search"
            action="/search"
            className="mx-2 hidden flex-1 items-center md:flex"
          >
            <label htmlFor="site-search" className="sr-only">
              Tìm kiếm sản phẩm
            </label>
            <div className="relative w-full max-w-xl">
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder="Bạn muốn tìm sản phẩm gì?"
                className="h-11 w-full rounded-full border border-border bg-muted/40 pl-4 pr-11 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark"
              >
                <Search className="size-4" />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-3 lg:gap-5">
            <Link
              href="/search"
              aria-label="Tìm kiếm"
              className="text-ink hover:text-brand md:hidden"
            >
              <Search className="size-5" />
            </Link>
            <Link
              href="/account"
              aria-label="Tài khoản"
              className="hidden text-ink hover:text-brand lg:block"
            >
              <User className="size-5" />
            </Link>
            <CartSheet />
          </div>
        </div>
      </div>

      <div className="hidden border-b bg-background lg:block">
        <nav aria-label="Menu chính" className="mx-auto max-w-[1280px] px-4">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 -translate-y-1 rounded-md border bg-background py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <NavDropdownItem key={child.label} item={child} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavDropdownItem({ item }: { item: NavChild }) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 text-sm text-ink hover:bg-accent hover:text-brand"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/sub relative">
      <Link
        href={item.href}
        className="flex items-center justify-between gap-4 px-4 py-2 text-sm text-ink hover:bg-accent hover:text-brand"
      >
        {item.label}
        <ChevronRight className="size-3.5" />
      </Link>
      <div className="invisible absolute left-full top-0 z-50 min-w-56 -translate-x-1 rounded-md border bg-background py-2 opacity-0 shadow-lg transition-all duration-150 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
        {item.children.map((grandchild) => (
          <Link
            key={grandchild.label}
            href={grandchild.href}
            className="block px-4 py-2 text-sm text-ink hover:bg-accent hover:text-brand"
          >
            {grandchild.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
