using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountFieldActivity Подсистема сфер деятельности пользователя
     * \ingroup Account
     * \brief Подсистема сфер деятельности пользователя.
     * @{
     */
    /// <summary>
    /// Класс для определения сферы деятельности пользователя.
    /// </summary>
    public class UserFieldActivity : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserFieldActivity";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserFieldActivity"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserFieldActivity>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Наименование сферы деятельности.
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование сферы деятельности.
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