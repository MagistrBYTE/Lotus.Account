using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountPosition
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с должностями.
    /// </summary>
    public static class XUserPositionErrors
    {
        #region Fields
        /// <summary>
        /// Должность не найдена.
        /// </summary>
        public static readonly Result NotFound = new()
        {
            Code = 1000,
            Message = "Должность не найдена",
            Succeeded = false,
        };

        /// <summary>
        /// Нельзя удалить константную должность.
        /// </summary>
        public static readonly Result NotDeleteConst = new()
        {
            Code = 1002,
            Message = "Нельзя удалить константную должность",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}