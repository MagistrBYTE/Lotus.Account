//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с ролями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusRoleService.cs
*		Cервис для работы с ролями.
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
        /** \addtogroup AccountRole
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с дожностями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CRoleService : ILotusRoleService
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
            public CRoleService(CAccountDbContext context)
            {
                _context = context;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание роли по указанным данным
            /// </summary>
            /// <param name="roleCreate">Параметры для создания роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CRoleDto>> CreateAsync(CRoleCreateDto roleCreate, CancellationToken token)
            {
                CRole entity = roleCreate.Adapt<CRole>();

                _context.Roles.Add(entity);
                await _context.SaveChangesAsync(token);

                CRoleDto result = entity.Adapt<CRoleDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной роли
            /// </summary>
            /// <param name="roleUpdate">Параметры обновляемой роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CRoleDto>> UpdateAsync(CRoleDto roleUpdate, CancellationToken token)
            {
                CRole? entity = _context.Roles
                    .Include(x => x.Permissions)
                    .FirstOrDefault(x => x.Id == roleUpdate.Id);

                if (entity is not null)
                {
                    roleUpdate.Adapt<CRoleDto, CRole>(entity);

                    var actualPermissions = _context.Permissions
                        .Where(x => roleUpdate.PermissionIds.Contains(x.Id))
                        .ToArray();

                    entity.Permissions.Clear();

                    if (actualPermissions.Length > 0)
                    {
                        foreach (var permission in actualPermissions)
                        {
                            entity.Permissions.Add(permission);
                        }
                    }

                    _context.Roles.Update(entity);
                    await _context.SaveChangesAsync(token);

                    CRoleDto result = entity.Adapt<CRoleDto>();

                    return XResponse.Succeed(result);
                }

                return XResponse.Failed<CRoleDto>(XRoleErrors.NotFound);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка ролей
            /// </summary>
            /// <param name="roleRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок ролей</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<ResponsePage<CRoleDto>> GetAllAsync(CRolesDto roleRequest, CancellationToken token)
            {
                var query = _context.Roles.AsQueryable();

                query = query.Filter(roleRequest.Filtering);

				var queryOrder = query.Sort(roleRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<CRole, CRoleDto>(roleRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление роли
            /// </summary>
            /// <param name="id">Идентификатор роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                CRole? entity = await _context.Roles.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (entity == null)
                {
                    return XResponse.Failed(XRoleErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XRoleErrors.NotDeleteConst);
                }

                _context.Roles.Remove(entity!);
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