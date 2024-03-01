using System.Security.Claims;

using IdentityModel.Client;

using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server;

using Newtonsoft.Json;

namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiInfrastructure Подсистема инфраструктуры
     * \ingroup AccountWebApi
     * \brief Подсистема инфраструктуры.
     * @{
     */
    /// <summary>
    /// Класс для информирования о состоянии валидации пользователя для компонентов Razor.
    /// </summary>
    public class IdentityAuthenticationStateProvider : ServerAuthenticationStateProvider
    {
        #region Fields
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private UserAuthorizeInfo? _userInfo;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="configuration">Параметры конфигурации.</param>
        /// <param name="httpContextAccessor">Провайдер контекста HTTP запроса.</param>
        public IdentityAuthenticationStateProvider(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            var server_uri = configuration.GetSection("Authorization").GetValue<string>(XRoutesConstants.ServerUri);
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(server_uri!)
            };
            _httpContextAccessor = httpContextAccessor;
        }
        #endregion

        #region Override methods
        /// <summary>
        /// Получение состояния аутентификации пользователя.
        /// </summary>
        /// <returns>Состояние аутентификации пользователя.</returns>
        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            var identity = new ClaimsIdentity();

            if (_userInfo != null && _userInfo.IsAuthenticated)
            {
                identity = new ClaimsIdentity("Server authentication");
                _userInfo.FillClaims(identity);
            }

            return Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <param name="loginParameters">Параметры для аутентификации пользователя.</param>
        /// <returns>Задача.</returns>
        public async Task Login(LoginParametersDto loginParameters)
        {
            var httpContex = _httpContextAccessor.HttpContext;

            // Прокидываем все заголовки от браузера
            // которые нужны для последующей идентификации пользователя
            foreach (var item in httpContex!.Request.Headers)
            {
                if (!_httpClient.DefaultRequestHeaders.Contains(item.Key))
                {
                    _httpClient.DefaultRequestHeaders.Add(item.Key, item.Value.ToString());
                }
            }
            var tokenResponse = await _httpClient.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = XRoutesConstants.TokenEndpoint,
                UserName = loginParameters.Login,
                Password = loginParameters.Password,
            });

            if (tokenResponse.IsError)
            {
                throw new ArgumentException(tokenResponse.Error, nameof(loginParameters));
            }

            _userInfo = new UserAuthorizeInfo();
            _userInfo.SetThisFrom(tokenResponse.AccessToken!);
            _userInfo.IsAuthenticated = true;

            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }

        /// <summary>
        /// Регистрация пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <returns>Задача.</returns>
        public async Task Register(RegisterParametersDto registerParameters)
        {
            var response = await _httpClient.PostAsJsonAsync(XRoutesConstants.RegisterEndpoint, registerParameters);

            response.EnsureSuccessStatusCode();

            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <returns>Задача.</returns>
        public async Task Logout()
        {
            await _httpClient.PostAsync(XRoutesConstants.LogoutEndpoint, null);
            _userInfo = null;
            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }

        /// <summary>
        /// Получение информации о статусе аутентификации текущего пользователя.
        /// </summary>
        /// <returns>Информация о статусе аутентификации текущего пользователя.</returns>
        public async Task<UserAuthorizeInfo> GetUserAuthorizeInfo()
        {
            if (_userInfo != null && _userInfo.IsAuthenticated)
            {
                return _userInfo;
            }

            var requestMessage = new HttpRequestMessage
            {
                RequestUri = new Uri(_httpClient.BaseAddress + "api/Authorize/UserAuthorizeInfo")
            };
            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            var authorizeInfo = JsonConvert.DeserializeObject<UserAuthorizeInfo>(responseBody);

            _userInfo = authorizeInfo;

            return _userInfo!;
        }
        #endregion
    }
    /**@}*/
}