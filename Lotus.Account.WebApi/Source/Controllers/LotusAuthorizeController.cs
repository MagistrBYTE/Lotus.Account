//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAuthorizeController.cs
*		Контролёр для авторизации и аутентификации пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Web;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /**
         * \defgroup AccountWebApiController Подсистема контролеров
         * \ingroup AccountWebApi
         * \brief Подсистема контролеров.
         * @{
         */
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Контролёр для авторизации и аутентификации пользователя
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        [ApiController]
        [Route($"{XConstants.PrefixApi}/[controller]")]
        public class AuthorizeController : ControllerBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly IOpenIddictApplicationManager _applicationManager;
            private readonly IOpenIddictAuthorizationManager _authorizationManager;
            private readonly IOpenIddictScopeManager _scopeManager;
            private readonly ILotusAuthorizeService _authorizeService;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="applicationManager">Менеджер приложений</param>
            /// <param name="authorizationManager">Менеджер авторизации</param>
            /// <param name="scopeManager">Менеджер прав</param>
            /// <param name="authorizeService">Сервис для авторизации пользователя</param>
            //---------------------------------------------------------------------------------------------------------
            public AuthorizeController(IOpenIddictApplicationManager applicationManager,
                IOpenIddictAuthorizationManager authorizationManager,
                IOpenIddictScopeManager scopeManager, ILotusAuthorizeService authorizeService)
            {
                _applicationManager = applicationManager;
                _authorizationManager = authorizationManager;
                _scopeManager = scopeManager;
                _authorizeService = authorizeService;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Аутентификация пользователя
            /// </summary>
            /// <returns>Общий результат работы</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost($"~{XRoutesConstants.TokenEndpoint}")]
            public async Task<IActionResult> Login()
            {
                var request = HttpContext.GetOpenIddictServerRequest() ??
                    throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

                if (request is null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                if (request.GrantType == GrantTypes.Password)
                {
                    CLoginParametersDto parameters = new()
                    {
                        Login = request.Username!,
                        Password = request.Password!,
                    };

                    var device = HttpContext.GetDeviceFromRequest();
                    var browser = HttpContext.GetBrowserFromRequest();

                    var response = await _authorizeService.LoginAsync(parameters, browser, device);

                    if (response.Result != null && response.Result.Succeeded == false)
                    {
                        return ReturnAccessForbiddenResult(Errors.AccessDenied, response.Result.Message);
                    }

                    var principal = response.Payload;

                    // Набор утверждений
                    principal.SetScopes(XOpenIddictConfiguration.GetScopesDefaults());

                    foreach (var claim in principal.Claims)
                    {
                        claim.SetDestinations(GetDestinations(claim, principal));
                    }

                    // Входим
                    var resultSign = SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    return resultSign;
                }
                else
                {
                    if (request.GrantType == GrantTypes.RefreshToken)
                    {
                        // Retrieve the claims principal stored in the refresh token.
                        var principal = (await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)).Principal;

                        // Набор утверждений
                        principal.SetScopes(XOpenIddictConfiguration.GetScopesDefaults());

                        foreach (var claim in principal.Claims)
                        {
                            claim.SetDestinations(GetDestinations(claim, principal));
                        }

                        // Входим
                        var resultSign = SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                        return resultSign;
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Выход из статуса аутентификации пользователя
            /// </summary>
            /// <returns>Общий результат работы</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost(nameof(Logout))]
            [Authorize(AuthenticationSchemes = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)]
            public async Task<IActionResult> Logout()
            {
                await _authorizeService.LogoutAsync(this.HttpContext.GetAccessToken());
                return Ok();
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение информации о статусе аутентификации текущего пользователя
            /// </summary>
            /// <returns>Информация о статусе аутентификации текущего пользователя</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpGet(XRoutesConstants.UserInfoEndpoint)]
            [Authorize(AuthenticationSchemes = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)]
            public async Task<IActionResult> UserAuthorizeInfoAsync()
            {
                var claimsPrincipal = (await this.HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)).Principal;

                if (claimsPrincipal is not null)
                {
                    var info = new CUserAuthorizeInfo();
                    info.SetThisFrom(claimsPrincipal.Identity as ClaimsIdentity);
                    return new JsonResult(info);
                }
                else
                {
                    return BadRequest("Пользователь не авторизован");
                }
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// 
            /// </summary>
            /// <param name="claim"></param>
            /// <param name="principal"></param>
            /// <returns></returns>
            //---------------------------------------------------------------------------------------------------------
            private IEnumerable<String> GetDestinations(Claim claim, ClaimsPrincipal principal)
            {
                // Note: by default, claims are NOT automatically included in the access and identity tokens.
                // To allow OpenIddict to serialize them, you must attach them a destination, that specifies
                // whether they should be included in access tokens, in identity tokens or in both.

                switch (claim.Type)
                {
                    case Claims.Name:
                        yield return Destinations.AccessToken;

                        if (principal.HasScope(Scopes.Profile))
                        {
                            yield return Destinations.IdentityToken;
                        }

                        yield break;

                    case Claims.Email:
                        yield return Destinations.AccessToken;

                        if (principal.HasScope(Scopes.Email))
                        {
                            yield return Destinations.IdentityToken;
                        }

                        yield break;

                    case Claims.Role:
                        yield return Destinations.AccessToken;

                        if (principal.HasScope(Scopes.Roles))
                        {
                            yield return Destinations.IdentityToken;
                        }

                        yield break;

                    // Never include the security stamp in the access and identity tokens, as it's a secret value.
                    case "AspNet.Identity.SecurityStamp": yield break;

                    default:
                        yield return Destinations.AccessToken;
                        yield break;
                }
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// 
            /// </summary>
            /// <param name="errorType"></param>
            /// <param name="message"></param>
            /// <returns></returns>
            //---------------------------------------------------------------------------------------------------------
            private ForbidResult ReturnAccessForbiddenResult(String errorType, String message)
            {
                var properties = new AuthenticationProperties(new Dictionary<String, String>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = errorType,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = message
                }
                !);

                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            #endregion

        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================