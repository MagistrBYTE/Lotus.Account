namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Класс для создания новой роли.
    /// </summary>
    public class UserRoleCreateRequest
    {
        /// <summary>
        /// Наименование роли.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование роли.
        /// </summary>
        public string? DisplayName { get; set; }
    }
    /**@}*/
}