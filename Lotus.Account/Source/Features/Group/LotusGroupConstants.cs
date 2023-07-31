﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с группами
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusGroupConstants.cs
*		Работа с константными и первоначальными данными подсистемы работы с группами.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System;
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
        /// Статический класс для определения констант и первоначальных данных подсистемы работы с группами
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XGroupConstants
        {
            /// <summary>
            /// Группа хранителей
            /// </summary>
            public static readonly CGroup Guardians = new CGroup()
            {
                Id = 1,
                Name = "Хранители",
                ShortName = "Хранители",
            };

			/// <summary>
			/// Группа Север
			/// </summary>
			public static readonly CGroup North = new CGroup()
            {
                Id = 2,
                Name = "Север",
				ShortName = "Север",
            };

			/// <summary>
			/// Группа Юг
			/// </summary>
			public static readonly CGroup South = new CGroup()
            {
                Id = 3,
				Name = "Юг",
				ShortName = "Юг",
            };

			/// <summary>
			/// Группа Восток
			/// </summary>
			public static readonly CGroup East = new CGroup()
			{
				Id = 4,
				Name = "Восток",
				ShortName = "Восток",
			};

			/// <summary>
			/// Группа Запад
			/// </summary>
			public static readonly CGroup West = new CGroup()
			{
				Id = 5,
				Name = "Запад",
				ShortName = "Запад",
			};
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================