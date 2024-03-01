namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс определяющий минимальную информацию об авторизации пользователя.
    /// </summary>
    public class UserAuthorizeInfo : IUserInfo
    {
        #region Properties
        /// <summary>
        /// Статус авторизации пользователя.
        /// </summary>
        public bool IsAuthenticated { get; set; }

        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public string Login { get; set; } = string.Empty;

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
        public string RoleSystemName { get; set; } = string.Empty;

        /// <summary>
        /// Список системных имен разрешений в виде текста.
        /// </summary>
        public string PermissionsSystemNamesAsText { get; set; } = string.Empty;

        //
        // ДОЛЖНОСТЬ
        //
        /// <summary>
        /// Отображаемое наименование должности.
        /// </summary>
        public string PostShortName { get; set; } = string.Empty;

        //
        // ГРУППЫ
        //
        /// <summary>
        /// Список имен групп пользователя в виде текста.
        /// </summary>
        public string GroupNamesAsText { get; set; } = string.Empty;
        //
        // CФЕРЫ ДЕЯТЕЛЬНОСТИ
        //
        /// <summary>
        /// Список имен сфер деятельности пользователя в виде текста.
        /// </summary>
        public string FieldActivityNamesAsText { get; set; } = string.Empty;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор по умолчанию инициализирует объект класса предустановленными значениями.
        /// </summary>
        public UserAuthorizeInfo()
        {
        }
        #endregion
    }
    /**@}*/
}