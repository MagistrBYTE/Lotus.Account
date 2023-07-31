import React, { useEffect, useRef, useState } from 'react';
import { IResponsePage } from 'src/core/types/Response';
import { IPageInfoResponse, IPageInfoRequest } from 'src/core/types/PageInfo';
import { Stack, Pagination, CircularProgress, Box, List, IconButton, Button, Dialog, DialogActions, DialogContent, AppBar, Toolbar, Typography } from '@mui/material';
import { IGrouping } from 'src/core/types/Grouping';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IRequest } from 'src/shared/request/Request';
import { localization } from 'src/shared/localization';
import { useLayoutClientHeight } from 'src/shared/layout';
import { ToastWrapper, toastError } from '../../Info/Toast';
import { FilterPanel } from './components/FilterPanel';


export interface IListViewProps<TItem extends Record<string, any>> 
{
  onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>
  renderList: (list: TItem[]|IGrouping<TItem>[]) => JSX.Element;
  propertiesInfo: IPropertiesInfo;
}

export const ListView = <TItem extends Record<string, any>>(props: IListViewProps<TItem>) => 
{
  const { onGetItems, renderList, propertiesInfo} = props;

  const pageSize = 10;

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>({ pageNumber: 0, pageSize: pageSize, currentPageSize: 10, totalCount: 10 });
  const [paginationModel, setPaginationModel] = useState({ pageSize: pageSize, pageIndex: 1 });

  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  // Ссылки на элементы
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);

  // Ссылки на элементы
  const refTabFilter = useRef(null);

  const marginBottom = 10;
  const marginTop = 10;
  const heightBox = useLayoutClientHeight(40 + marginTop + marginBottom); 

  const properties = propertiesInfo.getProperties();
  console.log(properties);

  //
  // Получение данных
  //
  const getFilterQueryItems = (): IRequest => 
  {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex - 1, pageSize: paginationModel.pageSize };

    return { pageInfo: pageInfo };
  }

  const refreshItems = (async (filter: any) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await onGetItems(filter);

      setItems(response.payload!);
      setPageInfo(response.pageInfo!);

      setIsLoading(false);
    }
    catch (exc) 
    {
      setIsLoading(false);
      toastError(exc, localization.actions.gettingFailed);
    }
  });

  //
  // Методы жизненного цикла
  //

  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    refreshItems(filter);

    const elemTabFilter: HTMLElement = refTabFilter.current! as HTMLElement;
    console.log(`elemTabFilter.clientHeight = ${elemTabFilter.clientHeight }`);
  }, [paginationModel.pageIndex, paginationModel.pageSize]);

  const handleCloseFilterDialog = () => 
  {
    setOpenFilterDialog(false);
  }

  const handleOpenFilterDialog = () => 
  {
    setOpenFilterDialog(true);
  }  


  const pageChangeHandle = (event: React.ChangeEvent<unknown>, page: number) =>
  {
    setPaginationModel({pageSize: paginationModel.pageSize, pageIndex: page});
  }

  const getCountPage = ():number =>
  {
    if(pageInfo.totalCount <= pageSize)
    {
      return 0;
    }

    return Math.ceil(pageInfo.totalCount / pageSize);
  }

  return (
    <>
      <Stack ref={refTabFilter} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
        <IconButton size='large' >
          <SortIcon/>
        </IconButton>
        <IconButton  size='large'>
          <DensitySmallIcon/>
        </IconButton>
        <IconButton size='large' onClick={handleOpenFilterDialog} >
          <FilterListIcon/>
        </IconButton>
      </Stack>
      <Box sx={{height: heightBox, overflow: 'auto'}}>
        <List>
          <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} >
            {isLoading && <CircularProgress color="secondary" />}
            {!isLoading && renderList(items)}  
          </Stack>
        </List>
      </Box>
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} >
        <Pagination size='large' sx={{marginBottom: `${marginBottom}px`, marginTop: `${marginTop}px`} } count={getCountPage()} 
          onChange={pageChangeHandle}
          page={paginationModel.pageIndex} shape="rounded" />
      </Stack>    
      <ToastWrapper
        autoClose={autoCloseToastify}
      />
      <Dialog
        fullScreen
        open={openFilterDialog}
        onClose={handleCloseFilterDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFilterDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseFilterDialog}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <FilterPanel propertiesInfo={propertiesInfo}/>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='warning' >Очистить</Button>
          <Button variant='outlined' >{localization.actions.cancel}</Button>
          <Button variant='outlined' color='primary' autoFocus>{localization.actions.confirm}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
