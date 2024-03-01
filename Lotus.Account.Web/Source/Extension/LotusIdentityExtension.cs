using Microsoft.AspNetCore.Identity;

namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiExtension Методы расширения
     * \ingroup AccountWebApi
     * \brief Методы расширения.
     * @{
     */
    /// <summary>
    /// Статический класс реализующий методы расширения для работы подсистемой Identity.
    /// </summary>
    public static class XIdentityExtension
    {
        /// <summary>
        /// Получение ошибок IdentityResult в виде строки.
        /// </summary>
        /// <param name="identityResult">IdentityResult.</param>
        /// <returns>Строка с ошибками.</returns>
        public static string GetErrorsText(this IdentityResult identityResult)
        {
            var errors = new List<string>();
            foreach (var error in identityResult.Errors)
            {
                errors.Add(error.Description);
            }

            return string.Join("\n", errors);
        }
    }
    /**@}*/
}