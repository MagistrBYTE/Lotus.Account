using Lotus.Repository;

namespace Lotus.Account
{
    /** \addtogroup AccountPermission
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с разрешениями.
    /// </summary>
    public interface ILotusUserPermissionService
    {
        /// <summary>
        /// Создание разрешения по указанным данным.
        /// </summary>
        /// <param name="permissionCreate">Параметры для создания разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        Task<Response<UserPermissionDto>> CreateAsync(UserPermissionCreateRequest permissionCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанной разрешения.
        /// </summary>
        /// <param name="permissionUpdate">Параметры обновляемого разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        Task<Response<UserPermissionDto>> UpdateAsync(UserPermissionDto permissionUpdate, CancellationToken token);

        /// <summary>
        /// Получение списка разрешений.
        /// </summary>
        /// <param name="permissionRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок разрешений.</returns>
        Task<ResponsePage<UserPermissionDto>> GetAllAsync(UserPermissionsRequest permissionRequest, CancellationToken token);

        /// <summary>
        /// Удаление разрешения.
        /// </summary>
        /// <param name="id">Идентификатор разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(int id, CancellationToken token);
    }
    /**@}*/
}