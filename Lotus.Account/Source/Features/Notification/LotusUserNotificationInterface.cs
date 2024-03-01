using Lotus.Repository;

namespace Lotus.Account
{
    /** \addtogroup AccountNotification
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с уведомлениями.
    /// </summary>
    public interface ILotusUserNotificationService
    {
        /// <summary>
        /// Создание уведомления по указанным данным.
        /// </summary>
        /// <param name="notificationCreate">Параметры для создания уведомления.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Уведомление.</returns>
        Task<Response<UserNotificationDto>> CreateAsync(UserNotificationCreateRequest notificationCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанного уведомления.
        /// </summary>
        /// <param name="notificationUpdate">Параметры обновляемого уведомления.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Уведомление.</returns>
        Task<Response<UserNotificationDto>> UpdateAsync(UserNotificationDto notificationUpdate, CancellationToken token);

        /// <summary>
        /// Получение указанного уведомления.
        /// </summary>
        /// <param name="id">Идентификатор уведомления.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Уведомление.</returns>
        Task<Response<UserNotificationDto>> GetAsync(Guid id, CancellationToken token);

        /// <summary>
        /// Получение списка уведомлений.
        /// </summary>
        /// <param name="notificationRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок уведомлений.</returns>
        Task<ResponsePage<UserNotificationDto>> GetAllAsync(UserNotificationsRequest notificationRequest, CancellationToken token);

        /// <summary>
        /// Удаление уведомления.
        /// </summary>
        /// <param name="id">Идентификатор уведомления.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(Guid id, CancellationToken token);
    }
    /**@}*/
}