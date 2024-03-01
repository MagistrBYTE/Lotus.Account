using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Класс группы.
    /// </summary>
    public class UserGroupDto : IdentifierDtoId<int>
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