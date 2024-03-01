using System.ComponentModel.DataAnnotations;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Класс для создания/регистрации нового пользователя.
    /// </summary>
    public class UserCreateRequest
    {
        /// <summary>
        /// Email.
        /// </summary>
        [Required]
        public string Email { get; set; } = null!;

        /// <summary>
        /// Логин пользователя.
        /// </summary>
        [Required]
        public string Login { get; set; } = null!;

        /// <summary>
        /// Пароль.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        public string? Surname { get; set; }

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        public string? Patronymic { get; set; }
    }
    /**@}*/
}