using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с разрешениями.
    /// </summary>
    public static class XUserPermissionErrors
    {
        #region Fields
        /// <summary>
        /// Разрешение не найдено.
        /// </summary>
        public static readonly Result NotFound = new()
        {
            Code = 2000,
            Message = "Разрешение не найдено",
            Succeeded = false,
        };

        /// <summary>
        /// Нельзя удалить константное разрешение.
        /// </summary>
        public static readonly Result NotDeleteConst = new()
        {
            Code = 2001,
            Message = "Нельзя удалить константное разрешение",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}