using System.ComponentModel.DataAnnotations;

namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс определяющий минимально необходимые параметры для аутентификации.
    /// </summary>
    public class LoginParametersDto
    {
        /// <summary>
        /// Логин.
        /// </summary>
        public string Login { get; set; } = null!;

        /// <summary>
        /// Пароль.
        /// </summary>
        public string Password { get; set; } = null!;

        /// <summary>
        /// Запомнить меня.
        /// </summary>
        /// <remarks>
        /// Параметры пользователя сохраняются в куках.
        /// </remarks>
        public bool RememberMe { get; set; }
    }
    /**@}*/
}