using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountNotification Подсистема работы с уведомлениями
     * \ingroup Account
     * \brief Подсистема работы с уведомлениями.
     * @{
     */
    /// <summary>
    /// Класс для определения сообщения пользователя.
    /// </summary>
    public class UserNotification : EntityDb<Guid>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserNotification";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserNotification"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserNotification>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Тема уведомления.
        /// </summary>
        public string? Topic { get; set; }

        /// <summary>
        /// Источник уведомления.
        /// </summary>
        public string? Sender { get; set; }

        /// <summary>
        /// Важность уведомления.
        /// </summary>
        public int? Importance { get; set; }

        /// <summary>
        /// Содержание уведомления.
        /// </summary>
        public string Content { get; set; } = null!;

        /// <summary>
        /// Время создания уведомления.
        /// </summary>
        public DateTime Created { get; set; }

        /// <summary>
        /// Статус прочитания уведомления.
        /// </summary>
        public bool IsRead { get; set; }

        /// <summary>
        /// Статус нахождения уведомления в архиве.
        /// </summary>
        public bool IsArchive { get; set; }
        #endregion
    }
    /**@}*/
}