using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountRole Подсистема работы с ролями
     * \ingroup Account
     * \brief Подсистема работы с ролями.
     * @{
     */
    /// <summary>
    /// Класс для определения роли пользователя.
    /// </summary>
    public class UserRole : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserRole";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserRole"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRole>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Наименование роли.
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование роли.
        /// </summary>
        [MaxLength(40)]
        public string? DisplayName { get; set; }

        /// <summary>
        /// Список разрешений для данной роли.
        /// </summary>
        public ICollection<UserPermission> Permissions { get; set; } = new List<UserPermission>();

        /// <summary>
        /// Все пользователи данной роли.
        /// </summary>
        public ICollection<User> Users { get; set; } = new HashSet<User>();
        #endregion
    }
    /**@}*/
}