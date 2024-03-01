namespace Lotus.Account
{
    /** \addtogroup AccountPosition
    *@{*/
    /// <summary>
    /// Класс для создания новой должности.
    /// </summary>
    public class UserPositionCreateRequest
    {
        /// <summary>
        /// Наименование должности.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование должности.
        /// </summary>
        public string? DisplayName { get; set; }
    }
    /**@}*/
}