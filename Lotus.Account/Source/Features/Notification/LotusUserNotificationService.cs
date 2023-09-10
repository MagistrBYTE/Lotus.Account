//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с уведомлениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserNotificationService.cs
*		Cервис для работы с уведомлениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountNotification
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с уведомлениями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class UserNotificationService : ILotusUserNotificationService
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
            public UserNotificationService(ILotusDataStorage dataStorage)
            {
                _dataStorage = dataStorage;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание уведомления по указанным данным
            /// </summary>
            /// <param name="notificationCreate">Параметры для создания уведомления</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Уведомление</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<UserNotificationDto>> CreateAsync(UserNotificationCreateRequest notificationCreate, CancellationToken token)
            {
                UserNotification entity = notificationCreate.Adapt<UserNotification>();

				await _dataStorage.AddAsync(entity);
                await _dataStorage.FlushAsync(token);

                UserNotificationDto result = entity.Adapt<UserNotificationDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Обновление данных указанного уведомления
			/// </summary>
			/// <param name="notificationUpdate">Параметры обновляемого уведомления</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Уведомление</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserNotificationDto>> UpdateAsync(UserNotificationDto notificationUpdate, CancellationToken token)
            {
                UserNotification entity = notificationUpdate.Adapt<UserNotification>();
				entity.Created = DateTime.UtcNow;

				_dataStorage.Update(entity);
                await _dataStorage.FlushAsync(token);

                UserNotificationDto result = entity.Adapt<UserNotificationDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанного уведомления
			/// </summary>
			/// <param name="id">Идентификатор уведомления</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Уведомление</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserNotificationDto>> GetAsync(Guid id, CancellationToken token)
			{
				UserNotification? entity = await _dataStorage.GetByIdAsync<UserNotification, Guid>(id, token);
				if (entity == null)
				{
					return XResponse.Failed<UserNotificationDto>(XUserNotificationErrors.NotFound);
				}

				UserNotificationDto result = entity.Adapt<UserNotificationDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка уведомлений
			/// </summary>
			/// <param name="notificationRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок уведомлений</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<UserNotificationDto>> GetAllAsync(UserNotificationsRequest notificationRequest, CancellationToken token)
            {
                var query = _dataStorage.Query<UserNotification>();

                query = query.Filter(notificationRequest.Filtering);

				var queryOrder = query.Sort(notificationRequest.Sorting, x => x.Created);

				var result = await queryOrder.ToResponsePageAsync<UserNotification, UserNotificationDto>(notificationRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление уведомления
            /// </summary>
            /// <param name="id">Идентификатор уведомления</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Guid id, CancellationToken token)
            {
				UserNotification? entity = await _dataStorage.GetByIdAsync<UserNotification, Guid>(id, token);
				if (entity == null)
                {
                    return XResponse.Failed(XUserNotificationErrors.NotFound);
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