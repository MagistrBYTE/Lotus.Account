﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема сфер деятельности пользователя
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserFieldActivity.cs
*		Класс для определения сферы деятельности пользователя.
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
         * \defgroup AccountFieldActivity Подсистема сфер деятельности пользователя
         * \ingroup Account
         * \brief Подсистема сфер деятельности пользователя.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для определения сферы деятельности пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserFieldActivity : EntityDb<Int32>
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "UserFieldActivity";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="UserFieldActivity"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ModelCreating(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<UserFieldActivity>();
                model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
            }
            #endregion

            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Наименование сферы деятельности
            /// </summary>
            [MaxLength(20)]
            public String Name { get; set; } = null!;

            /// <summary>
            /// Отображаемое наименование сферы деятельности
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