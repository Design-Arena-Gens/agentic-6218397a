import clsx from 'classnames';
import { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, subtitle, children, className }: SectionCardProps) {
  return (
    <section
      className={clsx(
        'rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6',
        'shadow-[0_50px_90px_-60px_rgba(45,131,255,0.65)] backdrop-blur',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-sm text-white/70">{subtitle}</p> : null}
      </div>
      <div className="mt-4 space-y-2 text-sm text-white/85">{children}</div>
    </section>
  );
}
