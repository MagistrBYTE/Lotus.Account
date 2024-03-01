using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountConfiguration
    *@{*/
    /// <summary>
    /// Статический класс для конфигурации и инициализации базы данных.
    /// </summary>
    public static class XDbSeed
    {
        #region Create methods
        /// <summary>
        /// Создание сущностей по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void Create(ModelBuilder modelBuilder)
        {
            CreatePost(modelBuilder);
            CreatePermission(modelBuilder);
            CreateRoles(modelBuilder);
            CreateRolePermission(modelBuilder);
            CreateUser(modelBuilder);
            CreateGroup(modelBuilder);
        }

        /// <summary>
        /// Создание пользователя (сущностей типа <see cref="User"/>) - Администратора системы.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateUser(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<User>();

            // Данные
            model.HasData(XUserConstants.Admin);
        }

        /// <summary>
        /// Создание ролей (сущностей типа <see cref="UserRole"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateRoles(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRole>();

            // Данные
            model.HasData(XUserRoleConstants.Admin,
                XUserRoleConstants.Editor,
                XUserRoleConstants.User);
        }

        /// <summary>
        /// Создание должностей (сущностей типа <see cref="UserPosition"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreatePost(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserPosition>();

            // Данные
            model.HasData(
                XUserPositionConstants.Inspector,
                XUserPositionConstants.ChiefInspector,
                XUserPositionConstants.LeadingSpecialist,
                XUserPositionConstants.DepartmentHead);
        }

        /// <summary>
        /// Создание разрешений (сущностей типа <see cref="UserPermission"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreatePermission(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserPermission>();

            // Данные
            model.HasData(XUserPermissionConstants.Admin,
                XUserPermissionConstants.Editor,
                XUserPermissionConstants.User);
        }

        /// <summary>
        /// Создание взаимосвязи между ролью и разрешением (сущностей типа <see cref="UserRolePermissionRelation"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateRolePermission(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRolePermissionRelation>();

            // Данные
            model.HasData(
                new UserRolePermissionRelation()
                {
                    Id = 1,
                    RoleId = XUserRoleConstants.Admin.Id,
                    PermissionId = XUserPermissionConstants.Admin.Id
                },
                new UserRolePermissionRelation()
                {
                    Id = 2,
                    RoleId = XUserRoleConstants.Editor.Id,
                    PermissionId = XUserPermissionConstants.Editor.Id
                },
                new UserRolePermissionRelation()
                {
                    Id = 3,
                    RoleId = XUserRoleConstants.User.Id,
                    PermissionId = XUserPermissionConstants.User.Id
                });
        }

        /// <summary>
        /// Создание групп (сущностей типа <see cref="UserGroup"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateGroup(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserGroup>();

            // Данные
            model.HasData(XUserGroupConstants.Guardians,
                XUserGroupConstants.North,
                XUserGroupConstants.South,
                XUserGroupConstants.East,
                XUserGroupConstants.West);
        }
        #endregion
    }
    /**@}*/
}