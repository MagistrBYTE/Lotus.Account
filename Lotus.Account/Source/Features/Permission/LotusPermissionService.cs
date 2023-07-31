//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с разрешениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusPermissionService.cs
*		Cервис для работы с разрешениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountPermission
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с дожностями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CPermissionService : ILotusPermissionService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly CAccountDbContext _context;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="context">Контекст БД пользователей</param>
            //---------------------------------------------------------------------------------------------------------
            public CPermissionService(CAccountDbContext context)
            {
                _context = context;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание разрешения по указанным данным
            /// </summary>
            /// <param name="permissionCreate">Параметры для создания разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CPermissionDto>> CreateAsync(CPermissionCreateDto permissionCreate, CancellationToken token)
            {
                CPermission entity = permissionCreate.Adapt<CPermission>();

                _context.Permissions.Add(entity);
                await _context.SaveChangesAsync(token);

                CPermissionDto result = entity.Adapt<CPermissionDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной разрешения
            /// </summary>
            /// <param name="permissionUpdate">Параметры обновляемого разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CPermissionDto>> UpdateAsync(CPermissionDto permissionUpdate, CancellationToken token)
            {
                CPermission entity = permissionUpdate.Adapt<CPermission>();

                _context.Permissions.Update(entity);
                await _context.SaveChangesAsync(token);

                CPermissionDto result = entity.Adapt<CPermissionDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка должностей
            /// </summary>
            /// <param name="permissionRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок должностей</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<ResponsePage<CPermissionDto>> GetAllAsync(CPermissionsDto permissionRequest, CancellationToken token)
            {
                var query = _context.Permissions.AsQueryable();

                query = query.Filter(permissionRequest.Filtering);

				var queryOrder = query.Sort(permissionRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<CPermission, CPermissionDto>(permissionRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление разрешения
            /// </summary>
            /// <param name="id">Идентификатор разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                CPermission? entity = await _context.Permissions.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (entity == null)
                {
                    return XResponse.Failed(XPermissionErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XPermissionErrors.NotDeleteConst);
                }

                _context.Permissions.Remove(entity!);
                await _context.SaveChangesAsync(token);

                return XResponse.Succeed();
            }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================