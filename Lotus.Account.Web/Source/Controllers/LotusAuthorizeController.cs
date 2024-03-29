using System.Net;
using System.Security.Claims;

using Lotus.Core;
using Lotus.Repository;

using Lotus.Web;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;

using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiController Подсистема контролеров
     * \ingroup AccountWebApi
     * \brief Подсистема контролеров.
     * @{
     */
    /// <summary>
    /// Контролёр для авторизации и аутентификации пользователя.
    /// </summary>
    [ApiController]
    [Route($"{XConstants.PrefixApi}/[controller]")]
    public class AuthorizeController : ControllerBase
    {
        #region Fields
        private readonly IOpenIddictApplicationManager _applicationManager;
        private readonly IOpenIddictAuthorizationManager _authorizationManager;
        private readonly IOpenIddictScopeManager _scopeManager;
        private readonly ILotusAuthorizeService _authorizeService;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="applicationManager">Менеджер приложений.</param>
        /// <param name="authorizationManager">Менеджер авторизации.</param>
        /// <param name="scopeManager">Менеджер прав.</param>
        /// <param name="authorizeService">Сервис для авторизации пользователя.</param>
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

        #region Main methods
        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <returns>Общий результат работы.</returns>
        [HttpPost($"~{XRoutesConstants.TokenEndpoint}")]
        public async Task<IActionResult> Login()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

            ArgumentNullException.ThrowIfNull(request);

            if (request.GrantType == GrantTypes.Password)
            {
                LoginParametersDto parameters = new()
                {
                    Login = request.Username!,
                    Password = request.Password!,
                };

                // var device = HttpContext.GetDeviceFromRequest();
                // var browser = HttpContext.GetBrowserFromRequest();

                var response = await _authorizeService.LoginAsync(parameters);

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
                    var result = await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)!;

                    var principal = result.Principal!;

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

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <returns>Общий результат работы.</returns>
        [HttpPost($"~{XRoutesConstants.LogoutEndpoint}")]
        public async Task<IActionResult> Logout()
        {
            await _authorizeService.LogoutAsync();

            return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Общий результат работы.</returns>
        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register([FromBody] RegisterParametersDto registerParameters,
            CancellationToken token)
        {
            var result = await _authorizeService.RegisterAsync(registerParameters, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение информации о статусе аутентификации текущего пользователя.
        /// </summary>
        /// <returns>Информация о статусе аутентификации текущего пользователя.</returns>
        [HttpGet(XRoutesConstants.UserInfoEndpoint)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UserAuthorizeInfoAsync()
        {
            var claimsPrincipal = (await this.HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)).Principal;

            if (claimsPrincipal is not null)
            {
                var info = new UserAuthorizeInfo();
                info.SetThisFrom(claimsPrincipal.Identity as ClaimsIdentity);
                return new JsonResult(info);
            }
            else
            {
                return BadRequest("Пользователь не авторизован");
            }
        }

        /// <summary>
        /// Получить набор разрешений.
        /// </summary>
        /// <param name="claim"></param>
        /// <param name="principal"></param>
        /// <returns></returns>
        private IEnumerable<string> GetDestinations(Claim claim, ClaimsPrincipal principal)
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

        /// <summary>
        /// Формирование ошибки о запрете доступа к ресурсу.
        /// </summary>
        /// <param name="errorType"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        private ForbidResult ReturnAccessForbiddenResult(string errorType, string message)
        {
            var properties = new AuthenticationProperties(new Dictionary<string, string>
            {
                [OpenIddictServerAspNetCoreConstants.Properties.Error] = errorType,
                [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = message
            }
            !);

            return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// Отправка ответа с указанными данными.
        /// </summary>
        /// <param name="response">Базовый интерфейс получения данных.</param>
        /// <returns>Ответ.</returns>
        protected IActionResult SendResponse(ILotusResponse response)
        {
            if (response == null)
            {
                return BadRequest();
            }

            if (response.Result == null)
            {
                return Ok(response);
            }

            if (response.Result!.Succeeded)
            {
                if (response.Result is ILotusResultHttp resultHttp)
                {
                    switch (resultHttp.HttpCode)
                    {
                        case HttpStatusCode.Created: return Created("", response);
                        case HttpStatusCode.NoContent: return NoContent();
                        default: return Ok(response);
                    }
                }
                else
                {
                    return Ok(response);
                }
            }
            else
            {
                if (response.Result is ILotusResultHttp resultHttp)
                {
                    switch (resultHttp.HttpCode)
                    {
                        case HttpStatusCode.NotFound: return NotFound(response);
                        case HttpStatusCode.Forbidden: return Forbid();
                        default: return BadRequest(response);
                    }
                }
                else
                {
                    return BadRequest(response.Result);
                }
            }
        }
        #endregion
    }
    /**@}*/
}