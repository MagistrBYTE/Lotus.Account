using Lotus.Core;

namespace Lotus.Account
{
    /**
     * \defgroup AccountInterfaces Подсистема интерфейсов
     * \ingroup Account
     * \brief Подсистема интерфейсов модуля.
     * @{
     */
    /// <summary>
    /// Интерфейс для определения данных пользователя.
    /// </summary>
    public interface IUserInfo : ILotusIdentifierGlobal
    {
        #region Properties
        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Статус потверждение почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }

        //
        // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
        //
        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        public string? Surname { get; set; }

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        public string? Patronymic { get; set; }

        /// <summary>
        /// День рождение.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        //
        // РОЛЬ И РАЗРЕШЕНИЯ
        //
        /// <summary>
        /// Служебное наименование роли.
        /// </summary>
        public string RoleSystemName { get; set; }

        /// <summary>
        /// Список системных имен разрешений в виде текста.
        /// </summary>
        public string PermissionsSystemNamesAsText { get; set; }


        //
        // ДОЛЖНОСТЬ
        //
        /// <summary>
        /// Отображаемое наименование должности.
        /// </summary>
        public string PostShortName { get; set; }

        //
        // ГРУППЫ
        //
        /// <summary>
        /// Список имен групп пользователя в виде текста.
        /// </summary>
        public string GroupNamesAsText { get; set; }

        //
        // CФЕРЫ ДЕЯТЕЛЬНОСТИ
        //
        /// <summary>
        /// Список имен сфер деятельности пользователя в виде текста.
        /// </summary>
        public string FieldActivityNamesAsText { get; set; }
        #endregion
    }
    /**@}*/
}