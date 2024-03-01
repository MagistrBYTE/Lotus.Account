using Lotus.Repository;

namespace Lotus.Account
{
    /** \addtogroup AccountRole
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с ролями.
    /// </summary>
    public interface ILotusUserRoleService
    {
        /// <summary>
        /// Создание роли по указанным данным.
        /// </summary>
        /// <param name="roleCreate">Параметры для создания роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        Task<Response<UserRoleDto>> CreateAsync(UserRoleCreateRequest roleCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанной роли.
        /// </summary>
        /// <param name="roleUpdate">Параметры обновляемой роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        Task<Response<UserRoleDto>> UpdateAsync(UserRoleDto roleUpdate, CancellationToken token);

        /// <summary>
        /// Получение указанной роли.
        /// </summary>
        /// <param name="id">Идентификатор роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        Task<Response<UserRoleDto>> GetAsync(int id, CancellationToken token);

        /// <summary>
        /// Получение списка ролей.
        /// </summary>
        /// <param name="roleRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок ролей.</returns>
        Task<ResponsePage<UserRoleDto>> GetAllAsync(UserRolesRequest roleRequest, CancellationToken token);

        /// <summary>
        /// Удаление роли.
        /// </summary>
        /// <param name="id">Идентификатор роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(int id, CancellationToken token);
    }
    /**@}*/
}