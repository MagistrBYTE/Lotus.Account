//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAccountDbSeed.cs
*		Статический класс для первоначальной инициализации базы данных.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountConfiguration
        *@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс для конфигурации и инициализации базы данных
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XDbSeed
        {
			#region ======================================= МЕТОДЫ СОЗДАНИЯ ===========================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание сущностей по умолчанию
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void Create(ModelBuilder modelBuilder)
			{
				CreatePost(modelBuilder);
				CreatePermission(modelBuilder);
				CreateRoles(modelBuilder);
				CreateRolePermission(modelBuilder);
				CreateUser(modelBuilder);
				CreateGroup(modelBuilder);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание пользователя (сущностей типа <see cref="CUser"/>) - Администратора системы
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreateUser(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CUser>();

                // Данные
                model.HasData(XUserConstants.Admin);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание ролей (сущностей типа <see cref="CRole"/>) по умолчанию
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void CreateRoles(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CRole>();

                // Данные
                model.HasData(XRoleConstants.Admin,
                    XRoleConstants.Editor,
                    XRoleConstants.User);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание должностей (сущностей типа <see cref="CPosition"/>) по умолчанию
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void CreatePost(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CPosition>();

                // Данные
                model.HasData(
                    XPositionConstants.Inspector,
                    XPositionConstants.ChiefInspector,
                    XPositionConstants.LeadingSpecialist,
                    XPositionConstants.DepartmentHead);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание разрешений (сущностей типа <see cref="CPermission"/>) по умолчанию
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void CreatePermission(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CPermission>();

                // Данные
                model.HasData(XPermissionConstants.Admin,
                    XPermissionConstants.Editor,
                    XPermissionConstants.User);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание взаимосвязи между ролью и разрешением (сущностей типа <see cref="CRolePermission"/>) по умолчанию
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void CreateRolePermission(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CRolePermission>();

                // Данные
                model.HasData(
                    new CRolePermission()
                    {
                        Id = 1,
                        RoleId = XRoleConstants.Admin.Id,
                        PermissionId = XPermissionConstants.Admin.Id
                    },
                    new CRolePermission()
                    {
                        Id = 2,
                        RoleId = XRoleConstants.Editor.Id,
                        PermissionId = XPermissionConstants.Editor.Id
                    },
                    new CRolePermission()
                    {
                        Id = 3,
                        RoleId = XRoleConstants.User.Id,
                        PermissionId = XPermissionConstants.User.Id
                    });
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание групп (сущностей типа <see cref="CGroup"/>) по умолчанию
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreateGroup(ModelBuilder modelBuilder)
			{
				// Определение для таблицы
				var model = modelBuilder.Entity<CGroup>();

				// Данные
				model.HasData(XGroupConstants.Guardians,
					XGroupConstants.North,
					XGroupConstants.South,
					XGroupConstants.East,
					XGroupConstants.West);
			}
			#endregion
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================