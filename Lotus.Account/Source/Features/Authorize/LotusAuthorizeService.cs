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
        public class AuthorizeService : ILotusAuthorizeService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusDataStorage _dataStorage;
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует объект класса указанными параметрами
			/// </summary>
			/// <param name="dataStorage">Интерфейс для работы с сущностями</param>
			//---------------------------------------------------------------------------------------------------------
			public AuthorizeService(ILotusDataStorage dataStorage)
            {
				_dataStorage = dataStorage;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Аутентификация пользователя
            /// </summary>
            /// <param name="loginParameters">Параметры для аутентификации пользователя</param>
            /// <returns>Набор утверждений</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<ClaimsPrincipal>> LoginAsync(LoginParametersDto loginParameters)
            {
				var users = _dataStorage.Query<User>();

				// Пробуем найти пользователя с таким именем
				var user = await users.Where(x => (x.Login == loginParameters.Login || x.Email == loginParameters.Login))
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

                // Create a new ClaimsIdentity holding the user identity.
                var identity = new ClaimsIdentity("OpenIddict.Server.AspNetCore");

				var sessionId = Guid.NewGuid().ToString("D");
				user.FillClaims(identity, sessionId);

                // Создаем новый ClaimsPrincipal, содержащий утверждения,
                // которые будут использоваться для создания id_token, токена или кода.
                var principal = new ClaimsPrincipal(identity);

                return XResponse.Succeed(principal);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Выход из статуса аутентификации пользователя
            /// </summary>
            /// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task LogoutAsync()
            {
				await Task.CompletedTask;
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Регистрация нового пользователя
			/// </summary>
			/// <param name="registerParameters">Параметры для регистрации нового пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response> RegisterAsync(RegisterParametersDto registerParameters, CancellationToken token)
			{
				var users = _dataStorage.Query<User>();
				var user = users.FirstOrDefault(x => x.Login == registerParameters.Login);

				if (user is not null)
				{
					return XResponse.Failed(XUserErrors.LoginAlreadyUse);
				}

				if (registerParameters.Password.Length < 5)
				{
					return XResponse.Failed(XUserErrors.InsecurePassword);
				}

				// Создаем нового пользователя
				user = new User
				{
					Login = registerParameters.Login,
					Email = registerParameters.Email,
					PasswordHash = XHashHelper.GetHash(registerParameters.Password),
					Name = registerParameters.Name,
					Surname = registerParameters.Surname,
					Patronymic = registerParameters.Patronymic,
					RoleId = XUserRoleConstants.User.Id,
					PostId = XUserPositionConstants.Inspector.Id
				};

				await _dataStorage.AddAsync(user);
				await _dataStorage.FlushAsync(token);

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