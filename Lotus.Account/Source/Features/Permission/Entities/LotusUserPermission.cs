using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountPermission Подсистема работы с разрешениями
     * \ingroup Account
     * \brief Подсистема работы с разрешениями.
     * @{
     */
    /// <summary>
    /// Класс для определения разрешения пользователя.
    /// </summary>
    public class UserPermission : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserPermission";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserPermission"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
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

        #region Properties
        /// <summary>
        /// Наименование разрешения.
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование разрешения.
        /// </summary>
        [MaxLength(40)]
        public string? DisplayName { get; set; }

        /// <summary>
        /// Список ролей куда входит данное разрешение.
        /// </summary>
        public ICollection<UserRole>? Roles { get; set; }
        #endregion
    }
    /**@}*/
}