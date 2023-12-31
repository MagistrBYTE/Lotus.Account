﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с должностями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPositionDto.cs
*		Класс должности.
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
        /// Класс должности
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class UserPositionDto : IdentifierDtoId<Int32>
        {
            /// <summary>
            /// Наименование должности
            /// </summary>
            public String Name { get; set; } = null!;

            /// <summary>
            /// Отображаемое наименование должности
            /// </summary>
            public String? DisplayName { get; set; }
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================