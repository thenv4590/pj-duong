import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#222222] text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold text-white">{siteConfig.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>TP. Hồ Chí Minh &amp; Hà Nội, Việt Nam</span>
            </li>
            {siteConfig.phones.map((phone) => (
              <li key={phone.value} className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-brand" />
                <a href={`tel:${phone.value.replace(/\s/g, "")}`} className="hover:text-white">
                  {phone.label}: {phone.value}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-brand" />
              <a href="mailto:cskh@kukahome.vn" className="hover:text-white">
                cskh@kukahome.vn
              </a>
            </li>
          </ul>
        </div>

        <FooterColumn title="Về Kuka Home" links={footerLinks.about} />
        <FooterColumn title="Chính sách" links={footerLinks.policy} />

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Đăng ký nhận thông tin
          </h3>
          <p className="mt-3 text-sm text-white/70">
            Nhận ưu đãi và tin tức mới nhất từ Kuka Home Việt Nam.
          </p>
          <form className="mt-4 flex">
            <label htmlFor="footer-email" className="sr-only">
              Địa chỉ email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Email của bạn"
              className="h-11 w-full min-w-0 rounded-l-md border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-r-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Đăng ký
            </button>
          </form>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-white">
            Kết nối với chúng tôi
          </h3>
          <div className="mt-3 flex gap-3">
            <SocialLink href={siteConfig.socials.facebook} label="Facebook">
              <FacebookIcon className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.socials.instagram} label="Instagram">
              <InstagramIcon className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.socials.youtube} label="YouTube">
              <YoutubeIcon className="size-4" />
            </SocialLink>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>
            © {year} {siteConfig.name}. Bản sao giao diện chỉ nhằm mục đích học
            tập, không liên kết với thương hiệu gốc.
          </p>
          <div className="flex gap-4">
            {footerLinks.support.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-white">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/70 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
    >
      {children}
    </a>
  );
}
