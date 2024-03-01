namespace Lotus.Account
{
    /**
     * \defgroup AccountConstants Константы
     * \ingroup Account
     * \brief Константы модуля.
     * @{
     */
    /// <summary>
    /// Константы утверждений для формирования данных в токене.
    /// </summary>
    public static class XClaimsConstants
    {
        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public const string UserId = "sub";

        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public const string UserLogin = "name";

        /// <summary>
        /// Роль пользователя.
        /// </summary>
        public const string Role = "role";

        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public const string UserName = "user_name";

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        public const string UserSurname = "user_surname";

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        public const string UserFathersname = "user_fathersname";

        /// <summary>
        /// Должность пользователя.
        /// </summary>
        public const string Position = "user_position";

        /// <summary>
        /// Группа пользователя.
        /// </summary>
        public const string UserGroup = "user_group";

        /// <summary>
        /// Разрешения пользователя.
        /// </summary>
        public const string UserPermissions = "user_permissions";

        /// <summary>
        /// Идентификатор сессии пользователя.
        /// </summary>
        public const string UserSessionId = "user_session_id";
    }
    /**@}*/
}