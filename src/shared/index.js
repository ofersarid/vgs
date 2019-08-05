export { default as SnapScroll } from './snap-scroll/snap-scroll';
export { default as ScrollableArea } from './snap-scroll/scrollabel-area';
export { default as DropMenu } from './drop-menu/drop-menu';
export { default as Button } from './button/button';
export { default as EventFooter } from './event-footer';

export default {
  SnapScroll: require('./snap-scroll/snap-scroll').default,
  ScrollableArea: require('./snap-scroll/scrollabel-area').default,
  DropMenu: require('./drop-menu/drop-menu').default,
  Button: require('./button/button').default,
  EventFooter: require('./event-footer').default,
};
