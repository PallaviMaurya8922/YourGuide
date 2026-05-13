import type { ReactNode } from 'react';
import { ScreenHero } from '../../../components/commonComponents';

type HomeHeaderProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function HomeHeader({ title, subtitle, children }: HomeHeaderProps) {
  return (
    <ScreenHero
      compact
      title={title}
      subtitle={subtitle}
      hideTitleFromLg
      className="rounded-b-[1.25rem] px-3 pb-3 pt-[max(0.4rem,env(safe-area-inset-top))] sm:rounded-b-3xl sm:px-5 sm:pb-3.5 sm:pt-2 md:px-8 md:pb-4"
    >
      {children}
    </ScreenHero>
  );
}
