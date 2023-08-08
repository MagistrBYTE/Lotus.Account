//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusOpenIddictConfiguration.cs
*		Статический класс для конфигурации и инициализации OpenIddict.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.EntityFrameworkCore.Models;
using static OpenIddict.Abstractions.OpenIddictConstants;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountWebApiConfiguration
        *@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс для конфигурации и инициализации OpenIddict
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XOpenIddictConfiguration
        {
            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение по умолчанию набора разрешений
            /// </summary>
            /// <returns>Массив разрешений</returns>
            //---------------------------------------------------------------------------------------------------------
            public static String[] GetScopesDefaults()
            {
                return new String[]
                {
                    Scopes.OpenId,
                    Scopes.Email,
                    Scopes.Profile,
                    Scopes.OfflineAccess,
                    Scopes.Roles
                };
            }
            #endregion

            #region ======================================= НАСТРОЙКА ТАБЛИЦ ==========================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Установление схем расположения в БД для таблиц сервера OpenIddict
            /// </summary>
            /// <param name="modelBuilder">Построитель моделей</param>
            //---------------------------------------------------------------------------------------------------------
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
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================