﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с ролями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserRoleCreateRequest.cs
*		Класс для создания новой роли.
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
        /** \addtogroup AccountRole
        *@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Класс для создания новой роли
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class UserRoleCreateRequest
		{
            /// <summary>
            /// Наименование роли
            /// </summary>
            public String Name { get; set; } = null!;

			/// <summary>
			/// Отображаемое наименование роли
			/// </summary>
			public String? DisplayName { get; set; }
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================