using Microsoft.EntityFrameworkCore;

using OpenIddict.EntityFrameworkCore.Models;

using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiConfiguration
    *@{*/
    /// <summary>
    /// Статический класс для конфигурации и инициализации OpenIddict.
    /// </summary>
    public static class XOpenIddictConfiguration
    {
        #region Main methods
        /// <summary>
        /// Получение по умолчанию набора разрешений.
        /// </summary>
        /// <returns>Массив разрешений.</returns>
        public static string[] GetScopesDefaults()
        {
            return new string[]
            {
                    Scopes.OpenId,
                    Scopes.Email,
                    Scopes.Profile,
                    Scopes.OfflineAccess,
                    Scopes.Roles
            };
        }
        #endregion

        #region Scheme methods
        /// <summary>
        /// Установление схем расположения в БД для таблиц сервера OpenIddict.
        /// </summary>
        /// <param name="modelBuilder">Построитель моделей.</param>
        public static void SetSchemeForTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OpenIddictEntityFrameworkCoreApplication>()
                .ToTable("OpenIddictApplications", XDbConstants.SchemeName);
            modelBuilder.Entity<OpenIddictEntityFrameworkCoreAuthorization>()
                .ToTable("OpenIddictAuthorizations", XDbConstants.SchemeName);
            modelBuilder.Entity<OpenIddictEntityFrameworkCoreScope>()
                .ToTable("OpenIddictScopes", XDbConstants.SchemeName);
            modelBuilder.Entity<OpenIddictEntityFrameworkCoreToken>()
                .ToTable("OpenIddictTokens", XDbConstants.SchemeName);
        }
        #endregion
    }
    /**@}*/
}