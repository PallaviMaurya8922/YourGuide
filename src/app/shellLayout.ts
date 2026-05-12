/** Main column + fixed bottom chrome (tab bar, booking bar) share this max width. */
export const SHELL_MAX_WIDTH_CLASS =
  'w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl' as const;

/** Scrollable app root: centers content on large viewports. */
export const SHELL_CONTAINER_CLASS = `relative mx-auto ${SHELL_MAX_WIDTH_CLASS}` as const;

/** Horizontal padding: tighter on phones (360–430px), roomier from `sm` up. */
export const PAGE_PAD_X = 'px-3 sm:px-5 md:px-8 lg:px-10' as const;
