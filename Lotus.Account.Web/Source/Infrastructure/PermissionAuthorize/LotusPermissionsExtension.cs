using Lotus.Web;

using Microsoft.AspNetCore.Authorization;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiInfrastructure
    *@{*/
    /// <summary>
    /// Статический класс реализующий методы расширения для авторизации на основе разрешений.
    /// </summary>
    public static class XPermissionsExtension
    {
        /// <summary>
        /// Добавление зависимостей для авторизации на основе разрешений.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusPermissionsExtension(this IServiceCollection services)
        {
            services
                .AddSingleton<IAuthorizationPolicyProvider, PermissionsPolicyProvider>()
                .AddScoped<IAuthorizationHandler, PermissionsHandler>()
                .AddScoped<Func<UserAuthorizeInfo?>>(sp => sp.GetService<UserAuthorizeInfo>)
                .AddScoped<UserAuthorizeInfo>(
                    sp =>
                    {
                        var contextAccessor = sp.GetService<IHttpContextAccessor>();
                        var claimsIdentity = contextAccessor!.GetClaimsIdentity();

                        if (claimsIdentity is not null)
                        {
                            var info = new UserAuthorizeInfo();
                            info.SetThisFrom(claimsIdentity);
                            return info;
                        }

                        return new UserAuthorizeInfo();
                    });

            return services;
        }
    }
    /**@}*/
}