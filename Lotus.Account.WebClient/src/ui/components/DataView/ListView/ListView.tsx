import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IResponsePage } from 'src/core/types/Response';
import { IPageInfoResponse, IPageInfoRequest } from 'src/core/types/PageInfo';
import { Stack, Pagination, CircularProgress, Box, List, IconButton } from '@mui/material';
import { IGrouping } from 'src/core/types/Grouping';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IRequest } from 'src/shared/request/Request';
import { localization } from 'src/shared/localization';
import { getLayoutClientHeight } from 'src/shared/layout';
import { IFilterProperty } from 'src/shared/filtering/FilterProperty';
import { ToastWrapper, toastError } from '../../Info/Toast';
import { DialogFilterPanel } from './components/DialogFilterPanel';


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

  // Фильтрация
  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>([]);
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);
  
  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  // Ссылки на элементы
  const refTabFilter = useRef(null);
  const refPangiantion = useRef(null);

  // Размеры и отступы
  const marginBottom = 10;
  const marginTop = 10;
 
  const [heightTabFilter, setHeightTabFilter] = useState<number>(0);
  const [heightPangiantion, setHeightPangiantion] = useState<number>(0);

  const calcHeightViewList = ():number =>
  {
    return getLayoutClientHeight() - (marginTop + marginBottom + heightTabFilter + heightPangiantion);
  }

  const [heightViewList, setHeightViewList] = useState<number>(calcHeightViewList());

  //
  // Получение данных
  //
  const getFilterQueryItems = (): IRequest => 
  {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex - 1, pageSize: paginationModel.pageSize };

    const filtering = filterProperties;

    return { pageInfo: pageInfo, filtering:filtering };
  }

  const refreshItems = (async (filter: IRequest) => 
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
  // Обработчики событий
  //

  const handleScreenChange = ()=>
  {
    setHeightViewList(calcHeightViewList());
  }

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

  //
  // Методы жизненного цикла
  //

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenChange);
    window.addEventListener('orientationchange', handleScreenChange);

    return () => 
    {
      window.removeEventListener('resize', handleScreenChange);
      window.removeEventListener('orientationchange', handleScreenChange);
    };
  }, []);

  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, filterProperties]);

  useEffect(() => 
  {
    const elemTabFilter: HTMLElement = refTabFilter.current! as HTMLElement;
    setHeightTabFilter(elemTabFilter.clientHeight);

    const elemPangiantion: HTMLElement = refPangiantion.current! as HTMLElement;
    setHeightPangiantion(elemPangiantion.clientHeight);

    setHeightViewList(calcHeightViewList());
  }, [refTabFilter.current, refPangiantion.current]); 

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
      <Box sx={{height: heightViewList, overflow: 'scroll'}}>
        <List>
          <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} >
            {isLoading && <CircularProgress color="secondary" />}
            {!isLoading && renderList(items)}  
          </Stack>
        </List>
      </Box>
      <Stack ref={refPangiantion} sx={{marginTop: '10px'}} display={'flex'} flexDirection={'row'} justifyContent={'center'} >
        <Pagination size='large' count={getCountPage()} 
          onChange={pageChangeHandle}
          page={paginationModel.pageIndex} shape="rounded" />
      </Stack>    
      <ToastWrapper
        autoClose={autoCloseToastify}
      />
      <DialogFilterPanel  
        open={openFilterDialog}
        close={handleCloseFilterDialog}
        propertiesInfo={propertiesInfo} 
        initialFilterProperties={filterProperties}
        applyFilterProperties={setFilterProperties} />
    </>
  );
}
