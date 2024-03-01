namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс определяющий успешность авторизации пользователя.
    /// </summary>
    public class AuthSuccessResponseDto
    {
        #region Properties
        /// <summary>
        /// Токен доступа.
        /// </summary>
        public string AccessToken { get; set; } = null!;

        /// <summary>
        /// Время жизни.
        /// </summary>
        public string? ExpiresIn { get; set; } = null!;

        /// <summary>
        /// Вспомогательный токен.
        /// </summary>
        public string RefreshToken { get; set; } = null!;

        /// <summary>
        /// Тип токена.
        /// </summary>
        public string TokenType { get; set; } = null!;
        #endregion
    }
    /**@}*/
}