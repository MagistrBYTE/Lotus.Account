using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountPosition Подсистема работы с должностями
     * \ingroup Account
     * \brief Подсистема работы с должностями.
     * @{
     */
    /// <summary>
    /// Класс для определения должности пользователя.
    /// </summary>
    public class UserPosition : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserPosition";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserPosition"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserPosition>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Наименование должности.
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Отображаемое наименование должности.
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