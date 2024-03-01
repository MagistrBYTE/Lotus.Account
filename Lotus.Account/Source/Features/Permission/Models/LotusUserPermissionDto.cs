using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Класс разрешения.
    /// </summary>
    public class UserPermissionDto : IdentifierDtoId<int>
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