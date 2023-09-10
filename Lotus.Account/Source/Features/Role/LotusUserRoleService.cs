//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с ролями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserRoleService.cs
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
        public class UserRoleService : ILotusUserRoleService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusDataStorage _dataStorage;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="dataStorage">Интерфейс для работы с сущностями</param>
            //---------------------------------------------------------------------------------------------------------
            public UserRoleService(ILotusDataStorage dataStorage)
            {
                _dataStorage = dataStorage;
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
            public async Task<Response<UserRoleDto>> CreateAsync(UserRoleCreateRequest roleCreate, CancellationToken token)
            {
                UserRole entity = roleCreate.Adapt<UserRole>();

				await _dataStorage.AddAsync(entity);
                await _dataStorage.FlushAsync(token);

                UserRoleDto result = entity.Adapt<UserRoleDto>();

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
            public async Task<Response<UserRoleDto>> UpdateAsync(UserRoleDto roleUpdate, CancellationToken token)
            {
				var queryRoles = _dataStorage.Query<UserRole>();

				UserRole? entity = queryRoles.Include(x => x.Permissions)
                    .FirstOrDefault(x => x.Id == roleUpdate.Id);

                if (entity is not null)
                {
                    roleUpdate.Adapt<UserRoleDto, UserRole>(entity);

					var queryPermissions = _dataStorage.Query<UserPermission>();

					var actualPermissions = queryPermissions
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

					_dataStorage.Update(entity);
                    await _dataStorage.FlushAsync(token);

                    UserRoleDto result = entity.Adapt<UserRoleDto>();

                    return XResponse.Succeed(result);
                }

                return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной роли
			/// </summary>
			/// <param name="id">Идентификатор роли</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Роль</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserRoleDto>> GetAsync(Int32 id, CancellationToken token)
			{
				UserRole? entity = await _dataStorage.GetByIdAsync<UserRole, Int32>(id, token);

				if (entity == null)
				{
					return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
				}

				UserRoleDto result = entity.Adapt<UserRoleDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка ролей
			/// </summary>
			/// <param name="roleRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок ролей</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<UserRoleDto>> GetAllAsync(UserRolesRequest roleRequest, CancellationToken token)
            {
                var query = _dataStorage.Query<UserRole>();

                query = query.Filter(roleRequest.Filtering);

				var queryOrder = query.Sort(roleRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<UserRole, UserRoleDto>(roleRequest, token);

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
				UserRole? entity = await _dataStorage.GetByIdAsync<UserRole, Int32>(id, token);

				if (entity == null)
				{
					return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
				}

				if (entity.Id < 4)
                {
                    return XResponse.Failed(XUserRoleErrors.NotDeleteConst);
                }

				_dataStorage.Remove(entity!);
                await _dataStorage.FlushAsync(token);

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