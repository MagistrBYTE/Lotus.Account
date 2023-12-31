﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с должностями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPositionErrors.cs
*		Работа с ошибками подсистемы работы с должностями.
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
        /** \addtogroup AccountPosition
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс для определения ошибок подсистемы работы с должностями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XUserPositionErrors
        {
            #region ======================================= ДАННЫЕ ====================================================
            /// <summary>
            /// Должность не найдена
            /// </summary>
            public static readonly Result NotFound = new()
            {
                Code = 1000,
                Message = "Должность не найдена",
                Succeeded = false,
            };

            /// <summary>
            /// Нельзя удалить константную должность
            /// </summary>
            public static readonly Result NotDeleteConst = new()
            {
                Code = 1002,
                Message = "Нельзя удалить константную должность",
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