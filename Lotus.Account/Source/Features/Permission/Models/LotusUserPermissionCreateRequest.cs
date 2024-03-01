namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Класс для создания нового разрешения.
    /// </summary>
    public class UserPermissionCreateRequest
    {
        /// <summary>
        /// Наименование разрешения.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование разрешения.
        /// </summary>
        public string? DisplayName { get; set; }
    }
    /**@}*/
}