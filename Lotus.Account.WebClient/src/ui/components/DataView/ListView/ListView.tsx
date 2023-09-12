import React, { useEffect, useRef, useState } from 'react';
import { Stack, Pagination, CircularProgress, Box, List, Button, Dialog, DialogActions, DialogContent, Badge, Menu, MenuItem, IconButton } from '@mui/material';
import { TPlacementDensity } from 'src/ui/types/PlacementDensity';
import { getLayoutClientHeight } from 'src/app/layout';
import { localization } from 'src/resources/localization';
import { useScreenResizeOrOrientation } from 'src/shared/hooks/useScreenTypeChanged';
import { IObjectInfo } from 'src/shared/objectInfo/ObjectInfo';
import { IFilterProperty, hasFilterPropertiesValue } from 'src/shared/types/FilterProperty';
import { IGrouping } from 'src/shared/types/Grouping';
import { IPageInfoResponse, IPageInfoRequest } from 'src/shared/types/PageInfo';
import { IRequest } from 'src/shared/types/Request';
import { IResponsePage } from 'src/shared/types/Response';
import { ISortProperty } from 'src/shared/types/Sorting';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DialogAppBar } from '../../Display';
import { ToastWrapper, toastError } from '../../Alert/Toast';
import { DensityButton } from './components/DensityButton';
import { SortButton } from './components/SortButton';
import { IFormFilterRefType } from './components/FormFilter/FormFilter';
import { FormFilter } from './components/FormFilter';

export interface IListViewProps<TItem extends Record<string, any>> 
{
  onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>
  renderList: (list: TItem[]|IGrouping<TItem>[], density: TPlacementDensity) => JSX.Element;
  objectInfo: IObjectInfo;
}

export const ListView = <TItem extends Record<string, any>>(props: IListViewProps<TItem>) => 
{
  const { onGetItems, renderList, objectInfo} = props;

  const pageSize = 10;

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>({ pageNumber: 0, pageSize: pageSize, currentPageSize: 10, totalCount: 10 });
  const [paginationModel, setPaginationModel] = useState({ pageSize: pageSize, pageIndex: 1 });

  // Фильтрация
  const formFilterRef = useRef<IFormFilterRefType>(null);
  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>([]);
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);
  const [isFilterStatus, setIsFilterStatus] = useState<boolean>(false);

  // Сортировка
  const [sortProperties, setSortProperties] = useState<ISortProperty[]>([]);

  // Плотность размещения
  const [placementDensity, setPlacementDensity] = useState<TPlacementDensity>(TPlacementDensity.Normal);

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

    const sorting = sortProperties;

    return { pageInfo: pageInfo, filtering:filtering, sorting:sorting };
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
  // Изменение макета
  //

  const handleScreenChange = ()=>
  {
    setHeightViewList(calcHeightViewList());
  }

  //
  // Фильтрация
  //
  const handleCloseFilterDialog = () => 
  {
    setOpenFilterDialog(false);
  }

  const handleOpenFilterDialog = () => 
  {
    setOpenFilterDialog(true);
  }

  const handleApplyFilterProperties = () =>
  {
    const actualFilters = formFilterRef.current!.getFilters();
    setOpenFilterDialog(false);

    const hasValues = hasFilterPropertiesValue(actualFilters);

    setIsFilterStatus(hasValues);

    setFilterProperties(actualFilters);
  }

  const handleClearFilterProperties = () =>
  {
    formFilterRef.current!.clearFilters();
    setFilterProperties([]);
    setIsFilterStatus(false);
    setOpenFilterDialog(false);
  }

  //
  // Пангинация
  //
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
  useScreenResizeOrOrientation(handleScreenChange);

  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, filterProperties, sortProperties]);

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
        <SortButton
          objectInfo={objectInfo}
          initialSortProperties={sortProperties}
          onSetSortProperties={setSortProperties}
        />
        <DensityButton
          initialDensity={placementDensity}
          onSetPlacementDensity={setPlacementDensity}/>
        <Button variant='outlined' size='large' onClick={handleOpenFilterDialog}  
          startIcon=
            {
              <Badge variant="dot" color="success" invisible={!isFilterStatus}>
                <FilterListIcon/>
              </Badge>
            }/>
      </Stack>
      <Box sx={{height: heightViewList, overflow: 'scroll'}}>
        <List>
          <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} >
            {isLoading && <CircularProgress color="secondary" />}
            {!isLoading && renderList(items, placementDensity)}  
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
      <Dialog
        fullScreen
        open={openFilterDialog}
        onClose={handleCloseFilterDialog}>
        <DialogAppBar onClose={handleCloseFilterDialog}/>
        <DialogContent>
          <FormFilter
            ref={formFilterRef}
            initialFilterProperties={filterProperties}
            objectInfo={objectInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='warning' onClick={handleClearFilterProperties}>{localization.actions.clear}</Button>
          <Button variant='outlined' onClick={handleCloseFilterDialog}>{localization.actions.cancel}</Button>
          <Button variant='outlined' color='primary' autoFocus onClick={handleApplyFilterProperties}>{localization.actions.confirm}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
