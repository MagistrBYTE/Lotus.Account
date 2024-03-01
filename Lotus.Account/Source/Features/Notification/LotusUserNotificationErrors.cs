using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountNotification
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с уведомлениями.
    /// </summary>
    public static class XUserNotificationErrors
    {
        #region Fields
        /// <summary>
        /// Уведомление не найдена.
        /// </summary>
        public static readonly Result NotFound = new()
        {
            Code = 2000,
            Message = "Уведомление не найдено",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}