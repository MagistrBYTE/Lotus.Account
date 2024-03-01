using Microsoft.AspNetCore.Authorization;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiInfrastructure
    *@{*/
    /// <summary>
    /// Требование для авторизации на основе разрешений.
    /// </summary>
    public class PermissionsRequirement : IAuthorizationRequirement
    {
        /// <summary>
        /// Набор разрешений.
        /// </summary>
        public HashSet<string> Permissions { get; set; } = new HashSet<string>();
    }
    /**@}*/
}