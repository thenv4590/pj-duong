import { Globe2, ShieldCheck, HeartHandshake, Trophy } from "lucide-react";
import { valueProps } from "@/lib/site-config";

const icons = [Globe2, ShieldCheck, HeartHandshake, Trophy];

export function ValueProps() {
  return (
    <section
      aria-labelledby="value-props-heading"
      className="bg-[#222222] py-12 text-white lg:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4">
        <h2
          id="value-props-heading"
          className="mb-8 text-center text-xl font-bold uppercase tracking-wide sm:text-2xl"
        >
          Tại Sao Chọn Kuka Home
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Icon className="size-7" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
