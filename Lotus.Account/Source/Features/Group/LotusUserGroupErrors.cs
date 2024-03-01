using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с группами.
    /// </summary>
    public static class XUserGroupErrors
    {
        #region Fields
        /// <summary>
        /// Группа не найдена.
        /// </summary>
        public static readonly Result NotFound = new()
        {
            Code = 2000,
            Message = "Группа не найдена",
            Succeeded = false,
        };

        /// <summary>
        /// Нельзя удалить константную группу.
        /// </summary>
        public static readonly Result NotDeleteConst = new()
        {
            Code = 2001,
            Message = "Нельзя удалить константную группу",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}