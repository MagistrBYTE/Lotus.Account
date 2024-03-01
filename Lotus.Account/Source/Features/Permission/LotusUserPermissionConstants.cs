namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с разрешениями.
    /// </summary>
    public static class XUserPermissionConstants
    {
        /// <summary>
        /// Базовое разрешение для полного доступа в систему.
        /// </summary>
        public static readonly UserPermission Admin = new()
        {
            Id = 1,
            Name = "admin",
            DisplayName = "Администратор",
        };

        /// <summary>
        /// Базовое разрешение для модератора/редактора.
        /// </summary>
        public static readonly UserPermission Editor = new()
        {
            Id = 2,
            Name = "editor",
            DisplayName = "Модератор",
        };

        /// <summary>
        /// Базовое разрешение для пользователя.
        /// </summary>
        public static readonly UserPermission User = new()
        {
            Id = 3,
            Name = "user",
            DisplayName = "Пользователь",
        };
    }
    /**@}*/
}