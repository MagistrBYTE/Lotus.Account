using System.Security.Claims;

using Lotus.Repository;

namespace Lotus.Account
{
    /**
     * \defgroup AccountAuthorize Подсистема авторизации
     * \ingroup Account
     * \brief Подсистема авторизации.
     * @{
     */
    /// <summary>
    /// Интерфейса сервиса для авторизации пользователя.
    /// </summary>
    public interface ILotusAuthorizeService
    {
        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <param name="loginParameters">Параметры для аутентификации пользователя.</param>
        /// <returns>Набор утверждений.</returns>
        Task<Response<ClaimsPrincipal>> LoginAsync(LoginParametersDto loginParameters);

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <returns>Задача.</returns>
        Task LogoutAsync();

        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response> RegisterAsync(RegisterParametersDto registerParameters, CancellationToken token);
    }
    /**@}*/
}