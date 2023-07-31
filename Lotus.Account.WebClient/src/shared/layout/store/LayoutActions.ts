import { createAction } from '@reduxjs/toolkit';
import { TScreenType } from '../domain/ScreenType';

export const SET_SCREEN_TYPE_LAYOUT = 'layout/SET_SCREEN_TYPE_LAYOUT' as const;
export const setScreenTypeAction = createAction<TScreenType>(SET_SCREEN_TYPE_LAYOUT);

export const SHOW_LEFT_PANEL_LAYOUT = 'layout/SHOW_LEFT_PANEL_LAYOUT' as const;
export const showLeftPanelLayoutAction = createAction<boolean>(SHOW_LEFT_PANEL_LAYOUT);

export const OPEN_LEFT_PANEL_LAYOUT = 'layout/OPEN_LEFT_PANEL_LAYOUT' as const;
export const openLeftPanelLayoutAction = createAction<boolean>(OPEN_LEFT_PANEL_LAYOUT);

export const SET_WIDTH_LEFT_PANEL_LAYOUT = 'layout/SET_WIDTH_LEFT_PANEL_LAYOUT' as const;
export const setWidthLeftPanelLayoutAction = createAction<number>(SET_WIDTH_LEFT_PANEL_LAYOUT);

export const SHOW_RIGHT_PANEL_LAYOUT = 'layout/SHOW_RIGHT_PANEL_LAYOUT' as const;
export const showRightPanelLayoutAction = createAction<boolean>(SHOW_RIGHT_PANEL_LAYOUT);

export const SHOW_HEADER_LAYOUT = 'layout/SHOW_HEADER_LAYOUT' as const;
export const showHeaderLayoutAction = createAction<boolean>(SHOW_HEADER_LAYOUT);

export const SHOW_FOOTER_LAYOUT = 'layout/SHOW_FOOTER_LAYOUT' as const;
export const showFooterLayoutAction = createAction<boolean>(SHOW_FOOTER_LAYOUT);

export const COLLAPSE_FOOTER_LAYOUT = 'layout/COLLAPSE_FOOTER_LAYOUT' as const;
export const collapseFooterLayoutAction = createAction<boolean>(COLLAPSE_FOOTER_LAYOUT);