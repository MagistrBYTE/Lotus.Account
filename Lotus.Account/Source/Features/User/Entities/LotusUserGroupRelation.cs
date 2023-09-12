﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с пользователем
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserGroupRelation.cs
*		Класс для связывания пользователя и группы.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AccountUser
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для связывания пользователя и группы
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserGroupRelation : EntityDb<Int32>
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "UserGroupRelation";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="UserGroupRelation"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ModelCreating(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<UserGroupRelation>();
                model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
            }
            #endregion

            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Идентификатор группы
            /// </summary>
            public Int32 GroupId { get; set; }

            /// <summary>
            /// Идентификатор пользователя
            /// </summary>
            public Guid UserId { get; set; }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================