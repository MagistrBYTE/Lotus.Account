//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с уведомлениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusNotificationService.cs
*		Cервис для работы с уведомлениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Repository;
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtonotification AccountNotification
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с уведомлениями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CNotificationService : ILotusNotificationService
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
            public CNotificationService(CAccountDbContext context)
            {
                _context = context;
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
            public async Task<Response<CNotificationDto>> CreateAsync(CNotificationCreateDto notificationCreate, CancellationToken token)
            {
                CNotification entity = notificationCreate.Adapt<CNotification>();

                _context.Notifications.Add(entity);
                await _context.SaveChangesAsync(token);

                CNotificationDto result = entity.Adapt<CNotificationDto>();

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
			public async Task<Response<CNotificationDto>> UpdateAsync(CNotificationDto notificationUpdate, CancellationToken token)
            {
                CNotification entity = notificationUpdate.Adapt<CNotification>();
				entity.Created = DateTime.UtcNow;

				_context.Notifications.Update(entity);
                await _context.SaveChangesAsync(token);

                CNotificationDto result = entity.Adapt<CNotificationDto>();

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
			public async Task<Response<CNotificationDto>> GetAsync(Guid id, CancellationToken token)
			{
				CNotification? entity = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
				if (entity == null)
				{
					return XResponse.Failed<CNotificationDto>(XNotificationErrors.NotFound);
				}

				CNotificationDto result = entity.Adapt<CNotificationDto>();

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
			public async Task<ResponsePage<CNotificationDto>> GetAllAsync(CNotificationsDto notificationRequest, CancellationToken token)
            {
                var query = _context.Notifications.AsQueryable();

                query = query.Filter(notificationRequest.Filtering);

				var queryOrder = query.Sort(notificationRequest.Sorting, x => x.Created);

				var result = await queryOrder.ToResponsePageAsync<CNotification, CNotificationDto>(notificationRequest, token);

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
                CNotification? entity = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (entity == null)
                {
                    return XResponse.Failed(XNotificationErrors.NotFound);
                }

                _context.Notifications.Remove(entity!);
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