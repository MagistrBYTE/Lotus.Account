using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Lotus.Core;

using OpenIddict.Abstractions;

namespace Lotus.Account
{
    /**
     * \defgroup AccountExtension Методы расширения
     * \ingroup Account
     * \brief Методы расширения модуля.
     * @{
     */
    /// <summary>
    /// Статический класс для реализации методов расширения <see cref="IUserInfo"/>.
    /// </summary>
    public static class XUserInfoExtension
    {
        /// <summary>
        /// Заполнение текущего экземпляра данными из набора утверждений.
        /// </summary>
        /// <param name="userInfo">Данные пользователя.</param>
        /// <param name="identity">Удостоверение, представленное набором утверждений.</param>
        public static void SetThisFrom(this IUserInfo userInfo, ClaimsIdentity? identity)
        {
            if (identity == null) return;

            userInfo.SetThisFrom(identity.Claims);
        }

        /// <summary>
        /// Заполнение текущего экземпляра данными из набора утверждений.
        /// </summary>
        /// <param name="userInfo">Данные пользователя.</param>
        /// <param name="claims">Список утверждений.</param>
        public static void SetThisFrom(this IUserInfo userInfo, IEnumerable<Claim> claims)
        {
            userInfo.Login = claims.FindFirstValue(ClaimTypes.Name) ?? string.Empty;

            var id = claims.FindFirstValue(XClaimsConstants.UserId);
            if (id is not null)
            {
                userInfo.Id = new Guid(id);
            }

            userInfo.Email = claims.FindFirstValue(ClaimTypes.Email);

            userInfo.RoleSystemName = claims.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
            userInfo.PermissionsSystemNamesAsText = claims.FindFirstValue(XClaimsConstants.UserPermissions) ?? string.Empty;

            userInfo.Name = claims.FindFirstValue(XClaimsConstants.UserName);
            userInfo.Surname = claims.FindFirstValue(XClaimsConstants.UserSurname);
            userInfo.Patronymic = claims.FindFirstValue(XClaimsConstants.UserFathersname);

            var birthday = claims.FindFirstValue(ClaimTypes.DateOfBirth);
            userInfo.Birthday = birthday != null ? DateOnly.Parse(birthday) : null;

            userInfo.PostShortName = claims.FindFirstValue(XClaimsConstants.Position) ?? string.Empty;

            userInfo.GroupNamesAsText = claims.FindFirstValue(XClaimsConstants.UserGroup) ?? string.Empty;
        }

        /// <summary>
        /// Заполнение текущего экземпляра данными из токена доступа.
        /// </summary>
        /// <param name="userInfo">Данные пользователя.</param>
        /// <param name="accessToken">Токен доступа.</param>
        public static void SetThisFrom(this IUserInfo userInfo, string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);
            var claims = jwtSecurityToken.Claims;
            userInfo.SetThisFrom(claims);
        }

        /// <summary>
        /// Заполнение текущего экземпляра данными из другого экземпляра.
        /// </summary>
        /// <param name="userInfo">Данные пользователя.</param>
        /// <param name="userInfoSource">Данные пользователя.</param>
        public static void SetThisFrom(this IUserInfo userInfo, IUserInfo userInfoSource)
        {
            if (userInfo == userInfoSource) return;

            userInfo.Id = userInfoSource.Id;
            userInfo.Login = userInfoSource.Login;
            userInfo.Email = userInfoSource.Email;
            userInfo.EmailConfirmed = userInfoSource.EmailConfirmed;

            userInfo.Name = userInfoSource.Name;
            userInfo.Surname = userInfoSource.Surname;
            userInfo.Patronymic = userInfoSource.Patronymic;
            userInfo.Birthday = userInfoSource.Birthday;

            userInfo.RoleSystemName = userInfoSource.RoleSystemName;
            userInfo.PermissionsSystemNamesAsText = userInfoSource.PermissionsSystemNamesAsText;

            userInfo.PostShortName = userInfoSource.PostShortName;
            userInfo.GroupNamesAsText = userInfoSource.GroupNamesAsText;
            userInfo.FieldActivityNamesAsText = userInfoSource.FieldActivityNamesAsText;
        }

        /// <summary>
        /// Заполнение утверждений по данным пользователя.
        /// </summary>
        /// <param name="userInfo">Данные пользователя.</param>
        /// <param name="identity">Удостоверение, представленное набором утверждений.</param>
        /// <param name="sessionId">Идентификатор сессии.</param>
        public static void FillClaims(this IUserInfo userInfo, ClaimsIdentity identity, string? sessionId = null)
        {
            Claim claimId = new(OpenIddictConstants.Claims.Subject, userInfo.Id.ToString("D"), ClaimValueTypes.String);
            claimId.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimId);

            Claim claimLogin = new(OpenIddictConstants.Claims.Name, userInfo.Login, ClaimValueTypes.String);
            claimLogin.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimLogin);

            Claim claimEmail = new(OpenIddictConstants.Claims.Email, userInfo.Email ?? string.Empty, ClaimValueTypes.String);
            claimEmail.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimEmail);

            Claim claimRole = new(OpenIddictConstants.Claims.Role, userInfo.RoleSystemName ?? string.Empty, ClaimValueTypes.String);
            claimRole.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimRole);

            var permissionsName = userInfo.PermissionsSystemNamesAsText ?? string.Empty;
            Claim claimUserPermissions = new(XClaimsConstants.UserPermissions, permissionsName, ClaimValueTypes.String);
            claimUserPermissions.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimUserPermissions);

            Claim claimUserName = new(XClaimsConstants.UserName, userInfo.Name ?? string.Empty, ClaimValueTypes.String);
            claimUserName.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimUserName);

            Claim claimUserSurname = new(XClaimsConstants.UserSurname, userInfo.Surname ?? string.Empty, ClaimValueTypes.String);
            claimUserSurname.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimUserSurname);

            Claim claimUserFathersName = new(XClaimsConstants.UserFathersname, userInfo.Patronymic ?? string.Empty, ClaimValueTypes.String);
            claimUserFathersName.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimUserFathersName);

            var positionName = userInfo.PostShortName ?? string.Empty;
            Claim claimPosition = new(XClaimsConstants.Position, positionName ?? string.Empty, ClaimValueTypes.String);
            claimPosition.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimPosition);

            var groupsName = userInfo.GroupNamesAsText ?? string.Empty;
            Claim claimUserGroups = new(XClaimsConstants.UserGroup, groupsName, ClaimValueTypes.String);
            claimUserGroups.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
            identity.AddClaim(claimUserGroups);

            if (sessionId is not null)
            {
                Claim claimSessionId = new(XClaimsConstants.UserSessionId, sessionId, ClaimValueTypes.String);
                claimUserPermissions.SetDestinations(OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken);
                identity.AddClaim(claimSessionId);
            }
        }
    }
    /**@}*/
}