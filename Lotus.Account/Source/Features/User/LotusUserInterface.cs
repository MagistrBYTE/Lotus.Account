using Lotus.Repository;

namespace Lotus.Account
{
    /**
     * \defgroup AccountUser Подсистема работы с пользователем
     * \ingroup Account
     * \brief Подсистема работы с пользователем.
     * @{
     */
    /// <summary>
    /// Интерфейс сервиса для работы с пользователем.
    /// </summary>
    public interface ILotusUserService
    {
        /// <summary>
        /// Создание пользователя по указанным данным.
        /// </summary>
        /// <param name="userCreate">Параметры для создания/регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response<UserDto>> CreateAsync(UserCreateRequest userCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанного пользователя.
        /// </summary>
        /// <param name="userUpdate">Параметры обновляемого пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response<UserDto>> UpdateAsync(UserDto userUpdate, CancellationToken token);

        /// <summary>
        /// Получение указанного пользователя.
        /// </summary>
        /// <param name="id">Идентификатор пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response<UserDto>> GetAsync(Guid id, CancellationToken token);

        /// <summary>
        /// Получение списка пользователей.
        /// </summary>
        /// <param name="userRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок пользователей.</returns>
        Task<ResponsePage<UserDto>> GetAllAsync(UsersRequest userRequest, CancellationToken token);

        /// <summary>
        /// Удаление пользователя.
        /// </summary>
        /// <param name="id">Идентификатор пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(Guid id, CancellationToken token);
    }
    /**@}*/
}