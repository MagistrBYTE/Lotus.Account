﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с группами
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserGroup.cs
*		Класс для определения группы пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AccountGroup Подсистема работы с группами
         * \ingroup Account
         * \brief Подсистема работы с группами.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для определения группы пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserGroup : EntityDb<Int32>
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "UserGroup";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="UserGroup"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ModelCreating(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<UserGroup>();
                model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
            }
            #endregion

            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Наименование группы
            /// </summary>
            [MaxLength(20)]
            public String Name { get; set; } = String.Empty;

            /// <summary>
            /// Отображаемое наименование группы
            /// </summary>
            [MaxLength(40)]
            public String? DisplayName { get; set; }

            /// <summary>
            /// Все пользователи
            /// </summary>
            public ICollection<User> Users { get; set; } = new HashSet<User>();
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================