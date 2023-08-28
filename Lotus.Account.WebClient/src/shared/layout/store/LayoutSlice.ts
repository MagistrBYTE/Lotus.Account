import { createSlice } from '@reduxjs/toolkit';
import { TScreenType } from '../domain/ScreenType';
import { DesktopViewSettings, LandscapeViewSettings, PortraitViewSettings } from '../domain/ViewSettings';
import { loadLayoutFromStorage } from '../utils/loadLayoutFromStorage';
import { saveLayoutToStorage } from '../utils/saveLayoutToStorage';
import { ILayoutState } from './LayoutState';
import { setScreenTypeAction, showHeaderLayoutAction, 
  showLeftPanelLayoutAction, 
  openLeftPanelLayoutAction, 
  showRightPanelLayoutAction, 
  setWidthLeftPanelLayoutAction, 
  showFooterLayoutAction, collapseFooterLayoutAction, showHeaderUserLayoutAction, showFooterUserLayoutAction } from './LayoutActions';

const initialState: ILayoutState = loadLayoutFromStorage();

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    //
    // В целом для сайта
    //       
    builder.addCase(setScreenTypeAction, (state, action) => 
    {     
      state.screenType = action.payload;
      switch(action.payload)
      {
        case TScreenType.Desktop:
          {
            state.header.isVisible = true;
            state.header.height = DesktopViewSettings.headerHeight;

            state.leftPanel.maxWidth = DesktopViewSettings.leftPanelWidthMax;
            state.leftPanel.minWidth = DesktopViewSettings.leftPanelWidthMin;
            state.leftPanel.width = DesktopViewSettings.leftPanelWidthMin;
            state.rightPanel.maxWidth = DesktopViewSettings.rightPanelWidthMax;
            state.rightPanel.minWidth = DesktopViewSettings.rightPanelWidthMin;
            state.rightPanel.width = DesktopViewSettings.rightPanelWidthMin;

            state.footer.height = DesktopViewSettings.footerHeight;
            state.footer.isVisible = true;
          }break;
        case TScreenType.Landscape:
          {
            state.header.isVisible = false;

            state.leftPanel.maxWidth = LandscapeViewSettings.leftPanelWidthMax;
            state.leftPanel.minWidth = LandscapeViewSettings.leftPanelWidthMin;
            state.leftPanel.width = LandscapeViewSettings.leftPanelWidthMin;
            state.rightPanel.maxWidth = LandscapeViewSettings.rightPanelWidthMax;
            state.rightPanel.minWidth = LandscapeViewSettings.rightPanelWidthMin;
            state.rightPanel.width = LandscapeViewSettings.rightPanelWidthMin;

            state.footer.isVisible = false;
          }break;    
        case TScreenType.Portrait:
          {
            state.header.isVisible = true;
            state.header.height = PortraitViewSettings.headerHeight;

            state.leftPanel.maxWidth = PortraitViewSettings.leftPanelWidthMax;
            state.leftPanel.minWidth = PortraitViewSettings.leftPanelWidthMin;
            state.leftPanel.width = PortraitViewSettings.leftPanelWidthMin;
            state.rightPanel.maxWidth = PortraitViewSettings.rightPanelWidthMax;
            state.rightPanel.minWidth = PortraitViewSettings.rightPanelWidthMin;
            state.rightPanel.width = PortraitViewSettings.rightPanelWidthMin;

            state.footer.height = PortraitViewSettings.footerHeight;
            state.footer.isVisible = true;  
          }break;                    
      }

      saveLayoutToStorage(state);
    });    

    //
    // Шапка
    //    
    builder.addCase(showHeaderLayoutAction, (state, action) => 
    {
      state.header.isVisible = action.payload;
      saveLayoutToStorage(state);
    });
    builder.addCase(showHeaderUserLayoutAction, (state, action) => 
    {
      state.header.isVisibleUser = action.payload;
      saveLayoutToStorage(state);
    });     

    //
    // Левая панель
    //      
    builder.addCase(showLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.isVisible = action.payload;
      saveLayoutToStorage(state);
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
      saveLayoutToStorage(state);
    });
    builder.addCase(setWidthLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.width = action.payload;
      saveLayoutToStorage(state);
    });

    //
    // Правая панель
    //    
    builder.addCase(showRightPanelLayoutAction, (state, action) => 
    {
      state.rightPanel.isVisible = action.payload;
      saveLayoutToStorage(state);
    });

    //
    // Подвал
    //
    builder.addCase(showFooterLayoutAction, (state, action) => 
    {
      state.footer.isVisible = action.payload;
      saveLayoutToStorage(state);
    });
    builder.addCase(showFooterUserLayoutAction, (state, action) => 
    {
      state.footer.isVisibleUser = action.payload;
      saveLayoutToStorage(state);
    });
    builder.addCase(collapseFooterLayoutAction, (state, action) => 
    {
      state.footer.isCollapsed = action.payload;
      saveLayoutToStorage(state);
    });
  }
});
