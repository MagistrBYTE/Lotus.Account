using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountGroup Подсистема работы с группами
     * \ingroup Account
     * \brief Подсистема работы с группами.
     * @{
     */
    /// <summary>
    /// Класс для определения группы пользователя.
    /// </summary>
    public class UserGroup : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserGroup";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserGroup"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserGroup>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Наименование группы.
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Отображаемое наименование группы.
        /// </summary>
        [MaxLength(40)]
        public string? DisplayName { get; set; }

        /// <summary>
        /// Все пользователи.
        /// </summary>
        public ICollection<User> Users { get; set; } = new HashSet<User>();
        #endregion
    }
    /**@}*/
}