using System.ComponentModel.DataAnnotations.Schema;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountMessage Подсистема работы с сообщениями
     * \ingroup Account
     * \brief Подсистема работы с сообщениями.
     * @{
     */
    /// <summary>
    /// Класс для определения сообщения пользователя.
    /// </summary>
    public class UserMessage : EntityDb<Guid>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserMessage";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserMessage"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserMessage>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Текст сообщения.
        /// </summary>
        public string Text { get; set; } = null!;

        /// <summary>
        /// Время отправки сообщения.
        /// </summary>
        public DateTime Time { get; set; }

        /// <summary>
        /// Статус прочитания сообщения.
        /// </summary>
        public bool IsRead { get; set; }

        //
        // АВТОР
        //
        /// <summary>
        /// Автор сообщения.
        /// </summary>
        [ForeignKey(nameof(AuthorId))]
        public User? Author { get; set; }

        /// <summary>
        /// Идентификатор автора сообщения.
        /// </summary>
        public Guid? AuthorId { get; set; }

        //
        // ПОЛУЧАТЕЛЬ
        //
        /// <summary>
        /// Получатель сообщения.
        /// </summary>
        [ForeignKey(nameof(ReceiverId))]
        public User? Receiver { get; set; }

        /// <summary>
        /// Идентификатор получателя сообщения.
        /// </summary>
        public Guid? ReceiverId { get; set; }
        #endregion
    }
    /**@}*/
}