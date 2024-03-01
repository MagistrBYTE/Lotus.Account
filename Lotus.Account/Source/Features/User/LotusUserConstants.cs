using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с пользователем.
    /// </summary>
    public static class XUserConstants
    {
        #region Fields
        /// <summary>
        /// Администратор системы.
        /// </summary>
        public static readonly User Admin = new()
        {
            Id = Guid.Parse("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
            Login = "DanielDem",
            PasswordHash = XHashHelper.GetHash("!198418dsfA!"),
            Email = "dementevds@gmail.com",
            Name = "Даниил",
            Surname = "Дементьев",
            Patronymic = "Сергеевич",
            RoleId = XUserRoleConstants.Admin.Id
        };
        #endregion
    }
    /**@}*/
}