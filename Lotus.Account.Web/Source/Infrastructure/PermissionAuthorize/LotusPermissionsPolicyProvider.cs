using System.Diagnostics.CodeAnalysis;

using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiInfrastructure
    *@{*/
    /// <summary>
    /// Политика для авторизации на основе разрешений.
    /// </summary>
    public class PermissionsPolicyProvider : IAuthorizationPolicyProvider
    {
        #region Fields
        private readonly DefaultAuthorizationPolicyProvider _policyProvider;
        private static readonly char[] separator = new[] { ',' };
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="options">Опции авторизации.</param>
        public PermissionsPolicyProvider([NotNull] IOptions<AuthorizationOptions> options)
        {
            _policyProvider = new DefaultAuthorizationPolicyProvider(options);
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Получение политки по умолчанию.
        /// </summary>
        /// <returns>Задача.</returns>
        public Task<AuthorizationPolicy> GetDefaultPolicyAsync()
        {
            var builder = new AuthorizationPolicyBuilder();
            builder.RequireAuthenticatedUser();

            return Task.FromResult(builder.Build());
        }

        /// <summary>
        /// Получение политки по умолчанию.
        /// </summary>
        /// <returns>Задача.</returns>
        public Task<AuthorizationPolicy?> GetFallbackPolicyAsync()
        {
            return _policyProvider.GetFallbackPolicyAsync()!;
        }

        /// <summary>
        /// Получение политики.
        /// </summary>
        /// <param name="policyName">Имя политики.</param>
        /// <returns>Задача.</returns>
        public Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
        {
            var functions = policyName.Split(separator, StringSplitOptions.RemoveEmptyEntries).ToArray();
            var builder = new AuthorizationPolicyBuilder();

            builder.RequireAuthenticatedUser();
            builder.AddRequirements(new PermissionsRequirement
            {
                Permissions = new HashSet<string>(functions, StringComparer.OrdinalIgnoreCase)
            });

            return Task.FromResult(builder.Build())!;
        }
        #endregion
    }
    /**@}*/
}