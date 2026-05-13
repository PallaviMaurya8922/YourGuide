import { PillSearchInput } from '../../../components/commonComponents';

type HomeSearchBarProps = {
  placeholder: string;
  'aria-label': string;
};

export function HomeSearchBar(props: HomeSearchBarProps) {
  return (
    <PillSearchInput
      {...props}
      variant="onGradient"
      wrapperClassName="shadow-md shadow-black/6 ring-1 ring-white/35"
    />
  );
}
