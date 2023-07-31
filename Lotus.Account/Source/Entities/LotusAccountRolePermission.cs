﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Сущности предметной области
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAccountRolePermission.cs
*		Класс для связывания роли пользователя и разрешения.
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
        /** \addtogroup AccountEntities
        *@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Класс для связывания роли пользователя и разрешения
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CRolePermission : EntityDb<Int32>
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "RolePermission";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="CRolePermission"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ModelCreating(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CRolePermission>();
                model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
            }
            #endregion

            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Идентификатор роли
            /// </summary>
            public Int32 RoleId { get; set; }

            /// <summary>
            /// Идентификатор разрешения
            /// </summary>
            public Int32 PermissionId { get; set; }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================