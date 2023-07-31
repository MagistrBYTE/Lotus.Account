import React, { useEffect, useState } from 'react';
import MaterialReactTable, { MRT_ColumnFiltersState, MRT_FilterOption, MRT_SortingState, MaterialReactTableProps } from 'material-react-table';
import { IResponsePage } from 'src/core/types/Response';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { IPageInfoResponse, IPageInfoRequest } from 'src/core/types/PageInfo';
import { ISortObjects, ISortProperty } from 'src/core/types/Sorting';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { convertPropertiesInfoToColumns, convertColumnsFilterToFilterObjects } from 'src/shared/reflection/utilMaterialReactTable';
import { IRequest } from 'src/shared/request/Request';
import { localization } from 'src/shared/localization';
import { toastError, ToastWrapper } from '../../Info/Toast';
import './TableView.scss';

type Updater<T> = T | ((old: T) => T);

export interface ITableViewProps<TItem extends Record<string, any>> extends MaterialReactTableProps<TItem> 
{
  onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>
  propertiesInfo: IPropertiesInfo;
}

export const TableView = <TItem extends Record<string, any>>(props: ITableViewProps<TItem>) => 
{
  const { onGetItems, propertiesInfo} = props;

  const columns = convertPropertiesInfoToColumns<TItem>(propertiesInfo);

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>({ pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 });
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });

  // Сортировка и фильтрация
  const [sortingColumn, setSortingColumn] = useState<MRT_SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [columnFiltersFns, setColumnFiltersFns] = useState<Record<string, MRT_FilterOption>>();
  const [globalFilter, setGlobalFilter] = useState('');

  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  //
  // Получение данных
  //
  const getFilterQueryItems = (): IRequest => 
  {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex, pageSize: paginationModel.pageSize };

    const sorting: ISortObjects = sortingColumn.map((column) => 
    {
      const sort: ISortProperty =
      {
        propertyName: capitalizeFirstLetter(column.id),
        isDesc: column.desc
      }

      return sort;
    });

    const filtering = convertColumnsFilterToFilterObjects(propertiesInfo, columnFilters, columnFiltersFns);

    return { pageInfo: pageInfo, sorting: sorting, filtering: filtering };
  }

  const refreshItems = (async (filter: IRequest) => 
  {
    try 
    {
      if (!items.length) 
      {
        setIsLoading(true);
      }
      else 
      {
        setIsRefetching(true);
      }

      const response = await onGetItems(filter);

      setItems(response.payload!);
      setPageInfo(response.pageInfo!);

      setIsLoading(false);
      setIsRefetching(false);
    }
    catch (exc) 
    {
      setIsLoading(false);
      setIsRefetching(false);
      toastError(exc, localization.actions.gettingFailed);
    }
  });

  //
  // Фильтрация
  // 
  const handleColumnFilterFnsChange = (updaterOrValue: Updater<{ [key: string]: MRT_FilterOption }>) => 
  {
    const data = updaterOrValue as Record<string, MRT_FilterOption>;
    setColumnFiltersFns(data);
  }

  //
  // Методы жизненного цикла
  //

  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, sortingColumn, columnFilters, columnFiltersFns, globalFilter]);

  const localizationFull = {
    ...MRT_Localization_RU,
    filterIncludeAny: localization.filtres.includeAny,
    filterIncludeAll: localization.filtres.includeAll,
    filterIncludeEquals: localization.filtres.includeEquals,
    filterIncludeNone: localization.filtres.includeNone     
  }

  return (
    <>
      <MaterialReactTable
        {...props}
        columns={columns}
        data={items}
        editingMode='row'
        enableEditing={true}
        enableRowActions={true}
        positionActionsColumn={'last'}
        manualSorting={true}
        manualFiltering={true}
        enablePagination={true}
        manualPagination={true}
        rowCount={pageInfo.totalCount}
        onColumnFiltersChange={setColumnFilters}
        onColumnFilterFnsChange={handleColumnFilterFnsChange}
        onGlobalFilterChange={setGlobalFilter}
        enableColumnFilterModes={true}
        filterFns={{
          includeAny: (row, id, filterValue) => 
          {
            return true;
          },
          includeAll: (row, id, filterValue) => 
          {
            return true;
          },
          includeEquals: (row, id, filterValue) => 
          {
            return true;
          },
          includeNone: (row, id, filterValue) => 
          {
            return true;
          }                        
        }}

        onSortingChange={setSortingColumn}
        onPaginationChange={setPaginationModel}
        state={
          {
            isLoading: isLoading,
            showProgressBars: isRefetching,
            showSkeletons: false,
            pagination: paginationModel,
            columnFilters: columnFilters,
            columnFilterFns: columnFiltersFns,
            globalFilter: globalFilter,
            sorting: sortingColumn
          }}
        localization={localizationFull}
      />
      <ToastWrapper autoClose={autoCloseToastify}/>
    </>
  );
}
