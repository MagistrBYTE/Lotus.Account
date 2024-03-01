using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountNotification
    *@{*/
    /// <summary>
    /// Класс уведомления.
    /// </summary>
    public class UserNotificationDto : IdentifierDtoId<Guid>
    {
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
    }
    /**@}*/
}