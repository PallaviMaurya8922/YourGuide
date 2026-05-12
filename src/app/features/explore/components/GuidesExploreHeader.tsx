import { ScreenHero, PillSearchInput } from '../../../components/commonComponents';

export type GuidesExploreHeaderProps = {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
};

export function GuidesExploreHeader({
  title = 'Explore Guides',
  subtitle = 'Verified experts in Varanasi',
  searchPlaceholder = 'Name, language, expertise…',
  searchAriaLabel = 'Search guides',
}: GuidesExploreHeaderProps) {
  return (
    <ScreenHero title={title} subtitle={subtitle} compact hideTitleFromLg>
      <PillSearchInput
        variant="onGradient"
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel}
      />
    </ScreenHero>
  );
}
