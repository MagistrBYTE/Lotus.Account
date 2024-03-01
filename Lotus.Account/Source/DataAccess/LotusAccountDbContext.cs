using Lotus.Repository;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Lotus.Account
{
    /**
     * \defgroup AccountDataAccess Слой данных
     * \ingroup Account
     * \brief Слой данных модуля.
     * @{
     */
    /// <summary>
    /// Контекст базы данных представляющий собой всех пользователей и учетных данных.
    /// </summary>
    public class AccountDbContext : DbContext
    {
        #region Properties
        /// <summary>
        /// Список пользователей.
        /// </summary>
        public DbSet<User> Users { get; set; } = null!;

        /// <summary>
        /// Список ролей.
        /// </summary>
        public DbSet<UserRole> Roles { get; set; } = null!;

        /// <summary>
        /// Список разрешений.
        /// </summary>
        public DbSet<UserPermission> Permissions { get; set; } = null!;

        /// <summary>
        /// Список должностей.
        /// </summary>
        public DbSet<UserPosition> Positions { get; set; } = null!;

        /// <summary>
        /// Список групп.
        /// </summary>
        public DbSet<UserGroup> Groups { get; set; } = null!;

        /// <summary>
        /// Список сфер деятельности.
        /// </summary>
        public DbSet<UserFieldActivity> FieldActivities { get; set; } = null!;

        /// <summary>
        /// Список сообщений.
        /// </summary>
        public DbSet<UserMessage> Messages { get; set; } = null!;

        /// <summary>
        /// Список уведомления.
        /// </summary>
        public DbSet<UserNotification> Notifications { get; set; } = null!;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор по умолчанию инициализирует объект класса предустановленными значениями.
        /// </summary>
        public AccountDbContext()
        {
        }

        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="options">Параметры конфигурации.</param>
        public AccountDbContext(DbContextOptions<AccountDbContext> options)
                : base(options)
        {
        }

        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="options">Параметры конфигурации.</param>
        protected AccountDbContext(DbContextOptions options)
            : base(options)
        {
        }
        #endregion

        #region DbContext methods
        /// <summary>
        /// Конфигурирование контекста.
        /// </summary>
        /// <param name="optionsBuilder">Билдер для конфигурирования контекста.</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(delegate (WarningsConfigurationBuilder warnings)
            {
                // The following line will suppress the warning
                // "'Foo.Bar' and 'Bar.Foo' were separated into two relationships as
                // ForeignKeyAttribute was specified on properties 'BarId' and
                // 'FooId' on both sides."
                warnings.Ignore(CoreEventId.ForeignKeyAttributesOnBothNavigationsWarning);
            });
        }

        /// <summary>
        /// Конфигурирование моделей.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            XDbConfiguration.ConfigurationAccountDatabase(modelBuilder);

            base.OnModelCreating(modelBuilder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder)

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                for (var type = entity; type != null; type = type.BaseType)
                {
                    if (type.ClrType.Name.Contains("OpenIddict"))
                    {
                        entity.SetSchema("security");
                        break;
                    }
                }
            }
        }
        #endregion
    }

    /// <summary>
    /// Хранилища данных всех пользователей и учетных данных.
    /// </summary>
    public class DataStorageContextAccount : DataStorageContextDb<AccountDbContext>
    {
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="context">Контекс базы данных.</param>
        public DataStorageContextAccount(AccountDbContext context)
            : base(context)
        {
        }
    }
    /**@}*/
}