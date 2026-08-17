"use client";

import * as React from "react";
import { Phone, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { MessengerIcon, ZaloIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

const channels = [
  {
    label: "Nhắn tin Messenger",
    href: siteConfig.socials.messenger,
    icon: MessengerIcon,
    className: "bg-[#0084FF] text-white",
  },
  {
    label: "Nhắn tin Zalo",
    href: siteConfig.socials.zalo,
    icon: ZaloIcon,
    className: "bg-[#0068FF] text-white",
  },
  {
    label: `Gọi ${siteConfig.phones[0].value}`,
    href: `tel:${siteConfig.phones[0].value.replace(/\s/g, "")}`,
    icon: Phone,
    className: "bg-emerald-600 text-white",
  },
];

export function FloatingContact() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
        aria-hidden={!open}
      >
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("tel:") ? undefined : "_blank"}
            rel={channel.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
            aria-label={channel.label}
            tabIndex={open ? 0 : -1}
            className={cn(
              "group flex items-center gap-2 rounded-full pl-3 pr-1 py-1 shadow-lg transition-transform hover:scale-105",
              channel.className
            )}
          >
            <span className="hidden whitespace-nowrap text-sm font-semibold sm:group-hover:inline">
              {channel.label}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full bg-black/10">
              <channel.icon className="size-6" />
            </span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
