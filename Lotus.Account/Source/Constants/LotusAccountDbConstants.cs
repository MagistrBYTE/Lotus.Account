namespace Lotus.Account
{
    /** \addtogroup AccountConstants
    *@{*/
    /// <summary>
    /// Константы для базы данных аккаунта пользователя.
    /// </summary>
    public static class XDbConstants
    {
        /// <summary>
        /// Имя схемы модуля аккаунта для базы данных.
        /// </summary>
        public const string SchemeName = "adm";

        /// <summary>
        /// Имя таблицы для хранения истории миграции.
        /// </summary>
        public const string MigrationHistoryTableName = "__EFIdentityMigrationHistory";

        /// <summary>
        /// Имя строки подключения в файле конфигурации.
        /// </summary>
        public const string ConnectingUserDb = "UserDb";
    }
    /**@}*/
}