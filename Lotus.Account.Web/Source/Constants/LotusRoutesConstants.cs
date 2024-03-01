namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiConstants Константы
     * \ingroup AccountWebApi
     * \brief Константы модуля.
     * @{
     */
    /// <summary>
    /// Константы для определения путей.
    /// </summary>
    public static class XRoutesConstants
    {
        /// <summary>
        /// Адрес сервера авторизации и валидации.
        /// </summary>
        public const string ServerUri = "ServerUri";

        /// <summary>
        /// Конечная точка для получения токена.
        /// </summary>
        public const string TokenEndpoint = "/connect/token";

        /// <summary>
        /// Конечная точка для получение информации пользвателе.
        /// </summary>
        public const string UserInfoEndpoint = "/connect/userinfo";

        /// <summary>
        /// Конечная точка для выхода пользователя.
        /// </summary>
        public const string LogoutEndpoint = "/connect/logout";

        /// <summary>
        /// Конечная точка для регистрации пользователя.
        /// </summary>
        public const string RegisterEndpoint = "api/Authorize/Register";
    }
    /**@}*/
}