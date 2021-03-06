import { createSelector } from 'reselect';

export const deviceType = state => state.getIn(['device', 'type']);
export const isTouchDevice = state => state.getIn(['device', 'isTouchDevice']);
export const isMobile = createSelector(deviceType, type => type === 'mobile');
export const isTablet = createSelector(isMobile, isTouchDevice, (mobile, touch) => !mobile && touch);
export const orientation = state => state.getIn(['device', 'orientation']);
