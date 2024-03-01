using Lotus.Core;
using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountNotification
    *@{*/
    /// <summary>
    /// Cервис для работы с уведомлениями.
    /// </summary>
    public class UserNotificationService : ILotusUserNotificationService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserNotificationService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserNotificationService methods
        /// <inheritdoc/>
        public async Task<Response<UserNotificationDto>> CreateAsync(UserNotificationCreateRequest notificationCreate, CancellationToken token)
        {
            var entity = notificationCreate.Adapt<UserNotification>();

            await _dataStorage.AddAsync(entity, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserNotificationDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserNotificationDto>> UpdateAsync(UserNotificationDto notificationUpdate, CancellationToken token)
        {
            var entity = notificationUpdate.Adapt<UserNotification>();
            entity.Created = DateTime.UtcNow;

            _dataStorage.Update(entity);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserNotificationDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserNotificationDto>> GetAsync(Guid id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserNotification, Guid>(id, token);
            if (entity == null)
            {
                return XResponse.Failed<UserNotificationDto>(XUserNotificationErrors.NotFound);
            }

            var result = entity.Adapt<UserNotificationDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserNotificationDto>> GetAllAsync(UserNotificationsRequest notificationRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<UserNotification>();

            query = query.Filter(notificationRequest.Filtering);

            var queryOrder = query.Sort(notificationRequest.Sorting, x => x.Created);

            var result = await queryOrder.ToResponsePageAsync<UserNotification, UserNotificationDto>(notificationRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(Guid id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserNotification, Guid>(id, token);
            if (entity == null)
            {
                return XResponse.Failed(XUserNotificationErrors.NotFound);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}