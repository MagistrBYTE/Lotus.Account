﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с уведомлениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusNotificationErrors.cs
*		Работа с ошибками подсистемы работы с уведомлениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtonotification AccountNotification
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс для определения ошибок подсистемы работы с уведомлениями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XNotificationErrors
        {
            #region ======================================= ДАННЫЕ ====================================================
            /// <summary>
            /// Уведомление не найдена
            /// </summary>
            public static readonly Result NotFound = new()
            {
                Code = 2000,
                Message = "Уведомление не найдено",
                Succeeded = false,
            };
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================