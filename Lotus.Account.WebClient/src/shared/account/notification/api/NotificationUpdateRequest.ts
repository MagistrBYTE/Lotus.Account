
export interface INotificationUpdateRequest
{
    /**
     * Идентифиактор уведомления
     */
    id: string;

    /** Тема уведомления */
    topic?: string;

    /** Источник уведомления */
    sender?: string;

    /** Важность уведомления */
    importance?: number;

    /** Содержание уведомления */
    content: string;

    /** Время создания уведомления */
    created: Date;

    /** Статус прочитания уведомления */
    isRead: boolean;

    /** Статус нахождения уведомления в архиве */
    isArchive: boolean;
}