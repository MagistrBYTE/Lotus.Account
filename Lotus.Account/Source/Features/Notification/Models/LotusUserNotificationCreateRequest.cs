namespace Lotus.Account
{
    /** \addtogroup AccountNotification
    *@{*/
    /// <summary>
    /// Класс для создания нового уведомления.
    /// </summary>
    public class UserNotificationCreateRequest
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