﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с уведомлениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserNotificationCreateRequest.cs
*		Класс для создания нового уведомления.
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
		/** \addtogroup AccountNotification
        *@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для создания нового уведомления
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserNotificationCreateRequest
		{
			/// <summary>
			/// Тема уведомления
			/// </summary>
			public String? Topic { get; set; }

			/// <summary>
			/// Источник уведомления
			/// </summary>
			public String? Sender { get; set; }

			/// <summary>
			/// Важность уведомления
			/// </summary>
			public Int32? Importance { get; set; }

			/// <summary>
			/// Содержание уведомления
			/// </summary>
			public String Content { get; set; } = null!;

			/// <summary>
			/// Статус прочитания уведомления
			/// </summary>
			public Boolean IsRead { get; set; }

			/// <summary>
			/// Статус нахождения уведомления в архиве
			/// </summary>
			public Boolean IsArchive { get; set; }
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================