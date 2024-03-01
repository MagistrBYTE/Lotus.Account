using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с ролями.
    /// </summary>
    public static class XUserRoleErrors
    {
        #region Fields
        /// <summary>
        /// Роль не найдена.
        /// </summary>
        public static readonly Result NotFound = new()
        {
            Code = 1000,
            Message = "Роль не найдена",
            Succeeded = false,
        };

        /// <summary>
        /// Нельзя удалить константную роль.
        /// </summary>
        public static readonly Result NotDeleteConst = new()
        {
            Code = 1002,
            Message = "Нельзя удалить константную роль",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}