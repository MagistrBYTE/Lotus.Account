//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с разрешениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPermissionService.cs
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
        public class UserPermissionService : ILotusUserPermissionService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusRepository _repository;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="repository">Интерфейс для работы с сущностями</param>
            //---------------------------------------------------------------------------------------------------------
            public UserPermissionService(ILotusRepository repository)
            {
                _repository = repository;
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
            public async Task<Response<UserPermissionDto>> CreateAsync(UserPermissionCreateRequest permissionCreate, CancellationToken token)
            {
                UserPermission entity = permissionCreate.Adapt<UserPermission>();

				await _repository.AddAsync(entity);
                await _repository.FlushAsync(token);

                UserPermissionDto result = entity.Adapt<UserPermissionDto>();

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
            public async Task<Response<UserPermissionDto>> UpdateAsync(UserPermissionDto permissionUpdate, CancellationToken token)
            {
                UserPermission entity = permissionUpdate.Adapt<UserPermission>();

				_repository.Update(entity);
                await _repository.FlushAsync(token);

                UserPermissionDto result = entity.Adapt<UserPermissionDto>();

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
            public async Task<ResponsePage<UserPermissionDto>> GetAllAsync(UserPermissionsRequest permissionRequest, CancellationToken token)
            {
				var query = _repository.Query<UserPermission>();

                query = query.Filter(permissionRequest.Filtering);

				var queryOrder = query.Sort(permissionRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<UserPermission, UserPermissionDto>(permissionRequest, token);

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
                UserPermission? entity = await _repository.GetByIdAsync<UserPermission, Int32>(id, token);
                if (entity == null)
                {
                    return XResponse.Failed(XUserPermissionErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XUserPermissionErrors.NotDeleteConst);
                }

				_repository.Remove(entity!);
                await _repository.FlushAsync(token);

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