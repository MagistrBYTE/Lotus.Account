using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountConfiguration Подсистема конфигурации и инициализации
     * \ingroup Account
     * \brief Подсистема конфигурации и инициализации.
     * @{
     */
    /// <summary>
    /// Статический класс для конфигурации и инициализации базы данных.
    /// </summary>
    public static class XDbConfiguration
    {
        /// <summary>
        /// Конфигурация и первоначальная инициализация базы данных.
        /// </summary>
        /// <remarks>
        /// Вызывается в <see cref="AccountDbContext.OnModelCreating(ModelBuilder)"/>.
        /// </remarks>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ConfigurationAccountDatabase(ModelBuilder modelBuilder)
        {
            User.ModelCreating(modelBuilder);
            UserPosition.ModelCreating(modelBuilder);
            UserRole.ModelCreating(modelBuilder);
            UserMessage.ModelCreating(modelBuilder);
            UserNotification.ModelCreating(modelBuilder);
            UserGroup.ModelCreating(modelBuilder);
            UserFieldActivity.ModelCreating(modelBuilder);
            UserPermission.ModelCreating(modelBuilder);
            UserRolePermissionRelation.ModelCreating(modelBuilder);
            UserFieldActivityRelation.ModelCreating(modelBuilder);
            UserGroupRelation.ModelCreating(modelBuilder);

            // Первоначальная инициализация через миграцию
            XDbSeed.Create(modelBuilder);
        }
    }
    /**@}*/
}