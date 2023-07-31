import { createSlice } from '@reduxjs/toolkit';
import { TScreenType } from '../domain/ScreenType';
import { DesktopViewSettings, PortraitViewSettings } from '../domain/ViewSettings';
import { ILayoutState } from './LayoutState';
import { setScreenTypeAction, showHeaderLayoutAction, 
  showLeftPanelLayoutAction, 
  openLeftPanelLayoutAction, 
  showRightPanelLayoutAction, 
  setWidthLeftPanelLayoutAction, 
  showFooterLayoutAction, collapseFooterLayoutAction } from './LayoutActions';

const initialState: ILayoutState = {

  screenType: TScreenType.Desktop,

  header:
  {
    height: DesktopViewSettings.headerHeight,
    isVisible: true
  },
  leftPanel:
  {
    isVisible: true,
    isOpen: false,
    maxWidth: DesktopViewSettings.leftPanelWidthMax,
    minWidth: DesktopViewSettings.leftPanelWidthMin,
    width: DesktopViewSettings.leftPanelWidthMin
  },
  rightPanel:
  {
    isVisible: false,
    isOpen: false,
    maxWidth: DesktopViewSettings.rightPanelWidthMax,
    minWidth: DesktopViewSettings.rightPanelWidthMin,
    width: DesktopViewSettings.rightPanelWidthMin
  },
  footer:
  {
    height: DesktopViewSettings.footerHeight,
    isVisible: true,
    isCollapsed: true
  }
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    builder.addCase(setScreenTypeAction, (state, action) => 
    {     
      state.screenType = action.payload;
      switch(action.payload)
      {
        case TScreenType.Desktop:
          {
            state.header.height = DesktopViewSettings.headerHeight;
            state.leftPanel.maxWidth = DesktopViewSettings.leftPanelWidthMax;
            state.leftPanel.minWidth = DesktopViewSettings.leftPanelWidthMin;
            state.leftPanel.width = DesktopViewSettings.leftPanelWidthMin;
            state.rightPanel.maxWidth = DesktopViewSettings.rightPanelWidthMax;
            state.rightPanel.minWidth = DesktopViewSettings.rightPanelWidthMin;
            state.rightPanel.width = DesktopViewSettings.rightPanelWidthMin;
            state.footer.height = DesktopViewSettings.footerHeight;
          }break;
        case TScreenType.Landscape:
          {
  
          }break;    
        case TScreenType.Portrait:
          {
            state.header.height = PortraitViewSettings.headerHeight;
            state.leftPanel.maxWidth = PortraitViewSettings.leftPanelWidthMax;
            state.leftPanel.minWidth = PortraitViewSettings.leftPanelWidthMin;
            state.leftPanel.width = PortraitViewSettings.leftPanelWidthMin;
            state.rightPanel.maxWidth = PortraitViewSettings.rightPanelWidthMax;
            state.rightPanel.minWidth = PortraitViewSettings.rightPanelWidthMin;
            state.rightPanel.width = PortraitViewSettings.rightPanelWidthMin;
            state.footer.height = PortraitViewSettings.footerHeight;    
          }break;                    
      }
    });    

    //
    // Шапка
    //    
    builder.addCase(showHeaderLayoutAction, (state, action) => 
    {
      state.header.isVisible = action.payload;
    });    

    builder.addCase(showLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.isVisible = action.payload;
    });

    builder.addCase(openLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.isOpen = action.payload;
      if(action.payload)
      {
        state.leftPanel.width = state.leftPanel.maxWidth;
      }
      else
      {
        state.leftPanel.width = state.leftPanel.minWidth;
      }
    });    

    builder.addCase(showRightPanelLayoutAction, (state, action) => 
    {
      // state.isOpenRightPanel = action.payload;
    });

    builder.addCase(setWidthLeftPanelLayoutAction, (state, action) => 
    {
      // state.widthLeftPanel = action.payload;
    });

    //
    // Подвал
    //
    builder.addCase(showFooterLayoutAction, (state, action) => 
    {
      state.footer.isVisible = action.payload;
    });
    builder.addCase(collapseFooterLayoutAction, (state, action) => 
    {
      state.footer.isCollapsed = action.payload;
    });
  }
});
