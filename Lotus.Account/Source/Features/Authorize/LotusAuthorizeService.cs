//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема авторизации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAuthorizeService.cs
*		Сервис для авторизации пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountAuthorize
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Сервис для авторизации пользователя
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CAuthorizeService : ILotusAuthorizeService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly CAccountDbContext _context;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="context">Контекст БД пользователей</param>
            //---------------------------------------------------------------------------------------------------------
            public CAuthorizeService(CAccountDbContext context)
            {
                _context = context;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Аутентификация пользователя
            /// </summary>
            /// <param name="loginParameters">Параметры для аутентификации пользователя</param>
            /// <param name="browser">Браузер входа</param>
            /// <param name="device">Устройство входа</param>
            /// <returns>Набор утверждений</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<ClaimsPrincipal>> LoginAsync(CLoginParametersDto loginParameters, String browser, CDevice? device)
            {
                // Пробуем найти пользователя с таким именем
                var user = await _context.Users.Where(x => (x.Login == loginParameters.Login ||
                x.Email == loginParameters.Login))
                    .Include(x => x.Role)
                        .ThenInclude(a => a!.Permissions)
                    .Include(x => x.Post)
                    .Include(x => x.Groups)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return new Response<ClaimsPrincipal>(XUserErrors.UserNotFound);
                }

                // Проверяем пароль
                var sing_in_result = XHashHelper.VerifyHash(loginParameters.Password, user.PasswordHash);

                if (sing_in_result == false)
                {
                    return new Response<ClaimsPrincipal>(XUserErrors.WrongPassword);
                }

                // Сохраняем сессию
                CSession session = new CSession();
                session.Browser = browser;
                session.Device = _context.GetDevice(device);
                session.BeginTime = DateTime.UtcNow;
                session.UserId = user!.Id;
                _context.Sessions.Add(session);
                await _context.SaveChangesAsync();

                // Create a new ClaimsIdentity holding the user identity.
                var identity = new ClaimsIdentity("OpenIddict.Server.AspNetCore");

                user.FillClaims(identity, session.Id.ToString("D"));

                // Создаем новый ClaimsPrincipal, содержащий утверждения,
                // которые будут использоваться для создания id_token, токена или кода.
                var principal = new ClaimsPrincipal(identity);

                return XResponse.Succeed(principal);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Выход из статуса аутентификации пользователя
            /// </summary>
            /// <param name="accessToken">Токен доступа</param>
            /// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task LogoutAsync(String? accessToken)
            {
                if (String.IsNullOrEmpty(accessToken)) return;

                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(accessToken);
                var claims = jwtSecurityToken.Claims;

                var claimSessionId = claims.FirstOrDefault(x => x.Type == XClaimsConstants.UserSessionId);

                if (claimSessionId != null)
                {
                    CSession? session =
                        await _context.Sessions.FirstOrDefaultAsync(x => x.Id.ToString() == claimSessionId.Value);

                    if (session is not null)
                    {
                        session.EndTime = DateTime.UtcNow;
                        _context.Update(session);
                        _context.SaveChanges();
                    }
                }
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Регистрация нового пользователя
			/// </summary>
			/// <param name="registrParameters">Параметры для регистрации нового пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response> RegistrAsync(CRegistrParametersDto registrParameters, CancellationToken token)
			{
				var user = _context.Users.FirstOrDefault(x => x.Login == registrParameters.Login);

				if (user is not null)
				{
					return XResponse.Failed(XUserErrors.LoginAlreadyUse);
				}

				if (registrParameters.Password.Length < 5)
				{
					return XResponse.Failed(XUserErrors.InsecurePassword);
				}

				// Создаем нового пользователя
				user = new CUser
				{
					Login = registrParameters.Login,
					Email = registrParameters.Email,
					PasswordHash = XHashHelper.GetHash(registrParameters.Password),
					Name = registrParameters.Name,
					Surname = registrParameters.Surname,
					Patronymic = registrParameters.Patronymic,
					RoleId = XRoleConstants.User.Id,
					PostId = XPositionConstants.Inspector.Id
				};

				_context.Users.Add(user);
				await _context.SaveChangesAsync(token);

				return XResponse.Succeed();
			}
			#endregion
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================