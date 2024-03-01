namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с группами.
    /// </summary>
    public static class XUserGroupConstants
    {
        /// <summary>
        /// Группа хранителей.
        /// </summary>
        public static readonly UserGroup Guardians = new()
        {
            Id = 1,
            Name = "Хранители",
            DisplayName = "Хранители",
        };

        /// <summary>
        /// Группа Север.
        /// </summary>
        public static readonly UserGroup North = new()
        {
            Id = 2,
            Name = "Север",
            DisplayName = "Север",
        };

        /// <summary>
        /// Группа Юг.
        /// </summary>
        public static readonly UserGroup South = new()
        {
            Id = 3,
            Name = "Юг",
            DisplayName = "Юг",
        };

        /// <summary>
        /// Группа Восток.
        /// </summary>
        public static readonly UserGroup East = new()
        {
            Id = 4,
            Name = "Восток",
            DisplayName = "Восток",
        };

        /// <summary>
        /// Группа Запад.
        /// </summary>
        public static readonly UserGroup West = new()
        {
            Id = 5,
            Name = "Запад",
            DisplayName = "Запад",
        };
    }
    /**@}*/
}