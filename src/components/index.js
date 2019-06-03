import _ProductCover from './layouts/product-cover/product-cover';
import _TwoColumnLayout from './layouts/two-column-layout/two-column-layout';

export { default as SnapScroll } from './snap-scroll/snap-scroll';
export { default as ScrollableArea } from './snap-scroll/scrollabel-area';
export { default as FrameIndicator } from './snap-scroll/frame-indicator';
export const Layout = {
  TwoColumnLayout: _TwoColumnLayout,
  ProductCover: _ProductCover,
};
