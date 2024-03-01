using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountRole
        *@{*/
    /// <summary>
    /// Класс для связывания роли пользователя и разрешения.
    /// </summary>
    public class UserRolePermissionRelation : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserRolePermissionRelation";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserRolePermissionRelation"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRolePermissionRelation>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// Идентификатор разрешения.
        /// </summary>
        public int PermissionId { get; set; }
        #endregion
    }
    /**@}*/
}