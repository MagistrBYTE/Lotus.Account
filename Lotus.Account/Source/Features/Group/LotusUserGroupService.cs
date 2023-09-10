//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с группами
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserGroupService.cs
*		Cервис для работы с группами.
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
        /** \addtogroup AccountGroup
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с группами
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class UserGroupService : ILotusUserGroupService
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
			public UserGroupService(ILotusDataStorage dataStorage)
            {
				_dataStorage = dataStorage;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание группы по указанным данным
            /// </summary>
            /// <param name="groupCreate">Параметры для создания группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Группа</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<UserGroupDto>> CreateAsync(UserGroupCreateRequest groupCreate, CancellationToken token)
            {
                UserGroup entity = groupCreate.Adapt<UserGroup>();

				await _dataStorage.AddAsync(entity);
                await _dataStorage.FlushAsync(token);

                UserGroupDto result = entity.Adapt<UserGroupDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной группы
            /// </summary>
            /// <param name="groupUpdate">Параметры обновляемого группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Группа</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<UserGroupDto>> UpdateAsync(UserGroupDto groupUpdate, CancellationToken token)
            {
                UserGroup entity = groupUpdate.Adapt<UserGroup>();

				_dataStorage.Update(entity);
                await _dataStorage.FlushAsync(token);

                UserGroupDto result = entity.Adapt<UserGroupDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной группы
			/// </summary>
			/// <param name="id">Идентификатор группы</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Группа</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserGroupDto>> GetAsync(Int32 id, CancellationToken token)
			{
				UserGroup? entity = await _dataStorage.GetByIdAsync<UserGroup, Int32>(id, token);
				if (entity == null)
				{
					return XResponse.Failed<UserGroupDto>(XUserGroupErrors.NotFound);
				}

				UserGroupDto result = entity.Adapt<UserGroupDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка групп
			/// </summary>
			/// <param name="groupRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок групп</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<UserGroupDto>> GetAllAsync(UserGroupsRequest groupRequest, CancellationToken token)
            {
				var query = _dataStorage.Query<UserGroup>();

                query = query.Filter(groupRequest.Filtering);

				var queryOrder = query.Sort(groupRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<UserGroup, UserGroupDto>(groupRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление группы
            /// </summary>
            /// <param name="id">Идентификатор группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                UserGroup? entity = await _dataStorage.GetByIdAsync<UserGroup, Int32>(id, token);
                if (entity == null)
                {
                    return XResponse.Failed(XUserGroupErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XUserGroupErrors.NotDeleteConst);
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