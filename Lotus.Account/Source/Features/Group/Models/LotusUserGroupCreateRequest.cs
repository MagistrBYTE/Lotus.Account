namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Класс для создания новой группы.
    /// </summary>
    public class UserGroupCreateRequest
    {
        /// <summary>
        /// Наименование группы.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование группы.
        /// </summary>
        public string? DisplayName { get; set; }
    }
    /**@}*/
}