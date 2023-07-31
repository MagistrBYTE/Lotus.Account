import React, { useEffect, useState } from 'react';
import { TKey } from 'src/core/types/Key';
import MaterialReactTable, { MRT_Cell, MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption, MRT_Row, MRT_SortingState, MRT_TableInstance, MaterialReactTableProps } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IResponse, IResponsePage } from 'src/core/types/Response';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { IEditable } from 'src/core/types/Editable';
import { IPageInfoResponse, IPageInfoRequest } from 'src/core/types/PageInfo';
import { ISortObjects, ISortProperty } from 'src/core/types/Sorting';
import { convertSelectOptionToNumber, convertSelectOptionToString, getSelectOptionTextsFromValue } from 'src/core/types/SelectOption';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';
import { checkArrayIsNumbers } from 'src/core/utils/base/array';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { convertColumnsFilterToFilterObjects } from 'src/shared/reflection/utilMaterialReactTable';
import { IRequest } from 'src/shared/request/Request';
import { localization } from 'src/shared/localization';
import { MultiSelect } from '../../Editor/MultiSelect';
import { ToastWrapper, toastError, toastPromise } from '../../Info/Toast';
import './TableViewEdit.scss';
import { EditTableFilterEnum, EditTableFilterString } from './TableViewEditFilterTypes';



export interface ITableViewEditProps<TItem extends Record<string, any>> extends MaterialReactTableProps<TItem> 
{
  propertiesInfo: IPropertiesInfo;
  onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>
  onAddItemAsync?: () => Promise<IResponse<TItem>>
  onUpdateItemAsync?: (item: TItem) => Promise<IResponse<TItem>>
  onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>
  onDeleteItemAsync?: (id: TKey) => Promise<IResponse>
}

type Updater<T> = T | ((old: T) => T);

export const TableViewEdit = <TItem extends Record<string, any> & IEditable,>(props: ITableViewEditProps<TItem>) => 
{
  const { propertiesInfo, onGetItems, onAddItemAsync, onUpdateItemAsync, onDuplicateItem, onDeleteItemAsync } = props;

  const properties = propertiesInfo.getProperties();

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

  // Редактирование текущей записи
  const [currentEditRow, setCurrentEditRow] = useState<MRT_Row<TItem> | null>(null);
  const [currentItem, setCurrentItem] = useState<TItem | null>(null);
  const [currentItemInvalid, setCurrentItemInvalid] = useState<boolean>(false);

  // Удаление
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<TItem | null>(null);

  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  // Служебные методы для получения данных текущего редактируемого объекта
  const setSelectedValues = (accessorKey:string, newSelectedValues: any[]) =>
  {
    const newItem: TItem = { ...currentItem! };
    // @ts-ignore
    newItem[accessorKey] = newSelectedValues as any;
    setCurrentItem(newItem);
  }

  // Модифицированные столбцы 
  const editColumns = properties.map((property) =>
  {
    const column:MRT_ColumnDef<TItem> = 
    {
      // @ts-ignore 
      accessorKey: property.fieldName,
      header: property.name,

      // Фильтрация
      enableColumnFilter: property.filtering && property.filtering.enabled,
      filterVariant: property.filtering && property.filtering.variant,

      // Сортировка
      enableSorting: property.sorting && property.sorting.enabled,

      // Редактирование
      enableEditing: property.editing && property.editing.enabled        
    };

    if(property.editing?.editorType === 'text')
    {
      column.muiTableBodyCellEditTextFieldProps = {
        error: property.editing?.onValidation(currentItem).error,
        helperText: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        variant: 'outlined',
        size: 'small',
        type: 'text',
        onChange: (event) => 
        {
          const newItem: TItem = { ...currentItem! };
          newItem![column.accessorKey!] = event.target.value as any;
          setCurrentItem(newItem);

          let isErrorValidation = false;
          properties.forEach((c) => 
          {
            const errorValidation = c.editing?.onValidation(newItem).error;
            if (errorValidation) 
            {
              isErrorValidation = true;
              setCurrentItemInvalid(true);
            }
          })
          if (isErrorValidation === false) 
          {
            setCurrentItemInvalid(false);
          }
        }
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
    }

    if(property.editing?.editorType === 'multi-select')
    {
      column.Cell = ({ cell }) => 
      {
        const massive = cell.getValue() as any[];
        const options = property.options!;
        if(checkArrayIsNumbers(massive))
        {    
          return (<>{getSelectOptionTextsFromValue<number>(convertSelectOptionToNumber(options), massive).join(', ')}</>)
        }
        else
        {
          return (<>{getSelectOptionTextsFromValue<string>(convertSelectOptionToString(options), massive).join(', ')}</>)
        }
      }
      
      column.Edit = ({ cell, column, table }) => 
      {
        const massive = cell.getValue() as any[];
        const options = property.options!;
        if(checkArrayIsNumbers(massive))
        {
          return <MultiSelect<number> size='small' sx={{width: '100%'}}
            initialSelectedValues={massive}
            selectedValuesChange={(selectedValues)=>{setSelectedValues(property.fieldName, selectedValues)}}
            options={convertSelectOptionToNumber(options)} />
        }
        else
        {
          return <MultiSelect<string> size='small' sx={{width: '100%'}}
            initialSelectedValues={massive}
            selectedValuesChange={(selectedValues)=>{setSelectedValues(property.fieldName, selectedValues)}}
            options={convertSelectOptionToString(options)} />   
        }
      }  

      column.muiTableBodyCellEditTextFieldProps = {
        error: property.editing?.onValidation(currentItem).error,
        helperText: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        size: 'small',
        variant: 'outlined',
        select: true 
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
    }    

    return column;
  })

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

  const refreshItems = (async (filter: any) => 
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
  // Добавление данных
  //
  const handleAddRow = async () => 
  {
    if (onAddItemAsync) 
    {
      const result = toastPromise(
        onAddItemAsync(),
        localization.actions.adding,
        localization.actions.addingSucceed,
        localization.actions.addingFailed);

      result.then(() => 
      {
        refreshItems(getFilterQueryItems());
      })
    }
  };


  //
  // Редактирование данных
  //
  const handleEditRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => 
  {
    table.setEditingRow(row);
    setCurrentEditRow(row);
    setCurrentItem(row.original as TItem);
  };

  const handleCancelRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => 
  {
    table.setEditingRow(null);
    setCurrentEditRow(null);
    setCurrentItem(null);
  };


  //
  // Дублирование данных
  //
  const handleDuplicateRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => 
  {

  };


  //
  // Обновление данных
  //
  const handleSaveRow = async (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => 
  {
    const updateItem: TItem = { ...currentItem } as TItem;

    if (onUpdateItemAsync) 
    {
      const result = toastPromise(
        onUpdateItemAsync(updateItem),
        localization.actions.saving,
        localization.actions.savingSucceed,
        localization.actions.savingFailed);

      result.then((value) => 
      {
        const newItems = [...items];
        newItems[currentEditRow!.index] = value.payload!;
        setItems(newItems);

        // refreshItems(getFilterQueryItems());
      })
    }

    table.setEditingRow(null);
    setCurrentEditRow(null);
  };


  //
  // Удаление данных
  //
  const handleDeleteRow = (row: MRT_Row<TItem>) => 
  {
    setDeleteItem(row.original as TItem);
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDialog = () => 
  {
    setOpenDeleteDialog(false);
  }

  const handleOkDeleteDialog = async () => 
  {
    setOpenDeleteDialog(false);

    if (onDeleteItemAsync) 
    {
      const result = toastPromise(
        onDeleteItemAsync(deleteItem!.id),
        localization.actions.deleting,
        localization.actions.deletingSucceed,
        localization.actions.deletingFailed);

      result.then(() => 
      {
        const newItems = items.filter(x => x.id !== currentItem!.id);
        setItems(newItems);

        // refreshItems(getFilterQueryItems());
      })
    }

    setDeleteItem(null);
  }

  //
  // Фильтрация
  // 
  const handleColumnFilterFnsChange = (updaterOrValue: Updater<{ [key: string]: MRT_FilterOption }>) => 
  {
    const data = updaterOrValue as Record<string, MRT_FilterOption>;
    setColumnFiltersFns(data);
  }

  //
  // Методы оформления
  //
  const renderRowActions = (props: { cell: MRT_Cell<TItem>, table: MRT_TableInstance<TItem>, row: MRT_Row<TItem> }) => 
  {
    const { table, row } = props;

    if (currentEditRow && currentEditRow.index === row.index) 
    {
      return (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title={localization.actions.save}>
            <IconButton size='large' disabled={currentItemInvalid} onClick={() => { handleSaveRow(table, row); }}>
              <Save color={currentItemInvalid ? 'disabled' : 'primary'} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="left" title={localization.actions.cancel}>
            <IconButton size='large' onClick={() => { handleCancelRow(table, row); }}>
              <Cancel />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
    else 
    {
      return (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title={localization.actions.edit}>
            <IconButton size='large' onClick={() => { handleEditRow(table, row) }}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="left" title={localization.actions.duplicate}>
            <IconButton size='large' onClick={() => { handleDuplicateRow(table, row) }}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title={localization.actions.delete}>
            <IconButton size='large' color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  }

  const renderTopToolbarCustomActions = (props: { table: MRT_TableInstance<TItem> }) => 
  {
    return <Button
      color="secondary"
      onClick={() => handleAddRow()}
      variant="contained">
      {localization.actions.add}
    </Button>
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
        columns={editColumns}
        data={items}
        editingMode='row'
        enableEditing={true}
        enableRowActions={true}
        positionActionsColumn={'last'}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Операции', 
            size: 300 
          }
        }}
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
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
      <ToastWrapper
        autoClose={autoCloseToastify}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Удалить'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Удалить объект:<br></br>
            {JSON.stringify(deleteItem)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCloseDeleteDialog}>{localization.actions.cancel}</Button>
          <Button variant='outlined' color='primary' onClick={handleOkDeleteDialog} autoFocus>{localization.actions.confirm}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
