namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с ролями.
    /// </summary>
    public static class XUserRoleConstants
    {
        /// <summary>
        /// Роль администратора.
        /// </summary>
        public static readonly UserRole Admin = new()
        {
            Id = 1,
            Name = "admin",
            DisplayName = "Администратор",
        };

        /// <summary>
        /// Роль редактора/модератора.
        /// </summary>
        public static readonly UserRole Editor = new()
        {
            Id = 2,
            Name = "editor",
            DisplayName = "Редактор",
        };

        /// <summary>
        /// Роль пользователя.
        /// </summary>
        public static readonly UserRole User = new()
        {
            Id = 3,
            Name = "user",
            DisplayName = "Пользователь",
        };
    }
    /**@}*/
}