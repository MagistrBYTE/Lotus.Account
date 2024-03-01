using Microsoft.AspNetCore.Authorization;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiInfrastructure
*@{*/
    /// <summary>
    /// Обработчик для авторизации на основе разрешений.
    /// </summary>
    public class PermissionsHandler : AuthorizationHandler<PermissionsRequirement>
    {
        #region Fields
        private readonly Func<UserAuthorizeInfo?> _authorizeInfo;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="authorizeInfo">Делегат для получения информация об авторизации пользователя.</param>
        public PermissionsHandler(Func<UserAuthorizeInfo?> authorizeInfo)
        {
            _authorizeInfo = authorizeInfo;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Обработчик для авторизации на основе разрешений.
        /// </summary>
        /// <param name="context">Контекст авторизации.</param>
        /// <param name="requirement">Объект ограничения.</param>
        /// <returns>Задача.</returns>
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionsRequirement requirement)
        {
            var info = _authorizeInfo();

            if (info != null)
            {
                var isPermission = requirement.Permissions.Any(x => info.PermissionsSystemNamesAsText.Contains(x));
                if (isPermission)
                {
                    context.Succeed(requirement);
                }
                else
                {
                    context.Fail();
                }
            }
            else
            {
                context.Fail();
            }
            return Task.CompletedTask;
        }
        #endregion
    }
    /**@}*/
}