import _Cover from './layouts/cover/cover';
import _TwoColumnLayout from './layouts/two-column-layout/two-column-layout';

export { default as SnapScroll } from './snap-scroll/snap-scroll';
export { default as ScrollableArea } from './snap-scroll/scrollabel-area';
export const Layout = {
  TwoColumnLayout: _TwoColumnLayout,
  Cover: _Cover,
};
