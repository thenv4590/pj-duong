export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.19 4.31 15.14 4.22 13.92 4.22c-2.55 0-4.29 1.56-4.29 4.42v2.86H7.1v3h2.53V21h3.87Z" />
    </svg>
  );
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.3a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.4A2.7 2.7 0 0 0 2.4 7.3 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.7 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.4a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.7ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export function MessengerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.5 2 2 6.1 2 11.4c0 2.9 1.4 5.5 3.6 7.2V22l3.3-1.8c.9.2 1.8.4 2.8.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 12.4-2.6-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.9-2.7L13 14.4Z" />
    </svg>
  );
}

export function ZaloIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="currentColor"
      >
        Zalo
      </text>
    </svg>
  );
}
