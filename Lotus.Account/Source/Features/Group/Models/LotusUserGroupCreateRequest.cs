﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с группами
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserGroupCreateRequest.cs
*		Класс для создания новой группы.
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
		/** \addtogroup AccountGroup
        *@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для создания новой группы
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserGroupCreateRequest
		{
			/// <summary>
			/// Наименование группы
			/// </summary>
			public String Name { get; set; } = null!;

			/// <summary>
			/// Отображаемое наименование группы
			/// </summary>
			public String? DisplayName { get; set; }
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================