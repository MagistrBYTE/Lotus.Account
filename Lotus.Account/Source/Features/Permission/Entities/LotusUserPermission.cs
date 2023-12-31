﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с разрешениями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPermission.cs
*		Класс для определения разрешения пользователя.
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
         * \defgroup AccountPermission Подсистема работы с разрешениями
         * \ingroup Account
         * \brief Подсистема работы с разрешениями.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для определения разрешения пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class UserPermission : EntityDb<Int32>
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "UserPermission";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="UserPermission"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ModelCreating(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<UserPermission>();
                model.ToTable(TABLE_NAME, XDbConstants.SchemeName);

                model.HasMany(permission => permission.Roles)
                    .WithMany(role => role.Permissions)
                    .UsingEntity<UserRolePermissionRelation>(
                        role => role.HasOne<UserRole>()
                    .WithMany()
                        .HasForeignKey(x => x.RoleId)
                        .IsRequired()
                        .OnDelete(DeleteBehavior.Restrict),
                        permission => permission.HasOne<UserPermission>()
                    .WithMany()
                        .HasForeignKey(x => x.PermissionId)
                        .IsRequired()
                        .OnDelete(DeleteBehavior.Restrict))
                    .HasKey(nameof(UserRolePermissionRelation.Id));
            }
            #endregion

            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Наименование разрешения
            /// </summary>
            [MaxLength(20)]
            public String Name { get; set; } = null!;

            /// <summary>
            /// Отображаемое наименование разрешения
            /// </summary>
            [MaxLength(40)]
            public String? DisplayName { get; set; }

            /// <summary>
            /// Список ролей куда входит данное разрешение
            /// </summary>
            public ICollection<UserRole>? Roles { get; set; }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================