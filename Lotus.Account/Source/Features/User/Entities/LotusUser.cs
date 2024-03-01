using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountUser Подсистема работы с пользователем
     * \ingroup Account
     * \brief Подсистема работы с пользователем.
     * @{
     */
    /// <summary>
    /// Класс для определения пользователя.
    /// </summary>
    public class User : EntityDb<Guid>, IUserInfo
    {
        #region Const
        /// <summary>
        /// Разделитель для формирования строковых список в одну строку.
        /// </summary>
        public const char SeparatorForText = ',';

        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "User";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="User"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<User>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);

            model.HasMany(user => user.FieldActivities)
                .WithMany(field => field.Users)
                .UsingEntity<UserFieldActivityRelation>(
                    field => field.HasOne<UserFieldActivity>()
                .WithMany()
                    .HasForeignKey(x => x.FieldActivityId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict),
                    user => user.HasOne<User>()
                .WithMany()
                    .HasForeignKey(x => x.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict))
                .HasKey(nameof(UserFieldActivityRelation.Id));

            model.HasMany(user => user.Groups)
                .WithMany(group => group.Users)
                .UsingEntity<UserGroupRelation>(
                    group => group.HasOne<UserGroup>()
                .WithMany()
                    .HasForeignKey(x => x.GroupId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict),
                    user => user.HasOne<User>()
                .WithMany()
                    .HasForeignKey(x => x.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict))
                .HasKey(nameof(UserGroupRelation.Id));

            model
                .HasOne(user => user.Role)
                .WithMany(role => role.Users);

            model
                .HasOne(user => user.Post)
                .WithMany(post => post.Users);
        }
        #endregion

        #region Properties
        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        [MaxLength(10)]
        public string Login { get; set; } = null!;

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        [MaxLength(20)]
        public string? Email { get; set; }

        /// <summary>
        /// Статус потверждение почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }

        /// <summary>
        /// Хэшированное представление пароля.
        /// </summary>
        [MaxLength(256)]
        public string PasswordHash { get; set; } = null!;

        //
        // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
        //
        /// <summary>
        /// Имя пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Name { get; set; }

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Surname { get; set; }

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Patronymic { get; set; }

        /// <summary>
        /// Полное имя (ФИО).
        /// </summary>
        [NotMapped]
        public string FullName
        {
            get { return ($"{Surname} {Name} {Patronymic}"); }
        }

        /// <summary>
        /// Краткое имя (Фамилия, инициалы).
        /// </summary>
        [NotMapped]
        public string ShortName
        {
            get
            {
                return ($"{Surname} {Name?[0]}. {Patronymic?[0]}.");
            }
        }

        /// <summary>
        /// День рождение.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        //
        // РОЛЬ И РАЗРЕШЕНИЯ
        //
        /// <summary>
        /// Роль.
        /// </summary>
        [ForeignKey(nameof(RoleId))]
        public UserRole? Role { get; set; }

        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int? RoleId { get; set; }

        /// <summary>
        /// Служебное наименование роли.
        /// </summary>
        [NotMapped]
        public string RoleSystemName
        {
            get
            {
                if (Role == null)
                {
                    return ("Нет роли");
                }
                else
                {
                    return (Role.Name);
                }
            }
            set { }
        }

        /// <summary>
        /// Список системных имен разрешений.
        /// </summary>
        [NotMapped]
        public ICollection<string> PermissionsSystemNames
        {
            get
            {
                if (Role is not null && Role.Permissions is not null)
                {
                    return Role.Permissions.Select(p => p.Name).ToHashSet();
                }

                return new HashSet<string>();
            }
        }

        /// <summary>
        /// Список системных имен разрешений в виде текста.
        /// </summary>
        [NotMapped]
        public string PermissionsSystemNamesAsText
        {
            get
            {
                if (Role is not null && Role.Permissions is not null)
                {
                    return string.Join(SeparatorForText, Role.Permissions.Select(p => p.Name).ToArray());
                }

                return string.Empty;
            }
            set { }
        }

        //
        // ДОЛЖНОСТЬ
        //
        /// <summary>
        /// Должность.
        /// </summary>
        [ForeignKey(nameof(PostId))]
        public UserPosition? Post { get; set; }

        /// <summary>
        /// Идентификатор должности.
        /// </summary>
        public int? PostId { get; set; }

        /// <summary>
        /// Наименование должности.
        /// </summary>
        [NotMapped]
        public string PostShortName
        {
            get
            {
                if (Post is not null && Post.DisplayName is not null)
                {
                    return (Post.DisplayName);
                }
                else
                {
                    return ("Нет должности");
                }
            }
            set { }
        }

        //
        // ГРУППЫ
        //
        /// <summary>
        /// Группы пользователя.
        /// </summary>
        public List<UserGroup>? Groups { get; set; }

        /// <summary>
        /// Список имен групп пользователя.
        /// </summary>
        [NotMapped]
        public IReadOnlyList<string> GroupNames
        {
            get
            {
                if (Groups is not null)
                {
                    return Groups.Select(x => x.Name).ToArray();
                }
                else
                {
                    return new List<string>();
                }
            }
        }

        /// <summary>
        /// Список имен групп пользователя в виде текста.
        /// </summary>
        [NotMapped]
        public string GroupNamesAsText
        {
            get
            {
                if (Groups is not null)
                {
                    return string.Join(SeparatorForText, Groups.Select(x => x.Name).ToArray());
                }
                else
                {
                    return string.Empty;
                }
            }
            set { }
        }

        //
        // CФЕРЫ ДЕЯТЕЛЬНОСТИ
        //
        /// <summary>
        /// Cферы деятельности пользователя.
        /// </summary>
        public List<UserFieldActivity>? FieldActivities { get; set; }

        /// <summary>
        /// Список имен сфер деятельности пользователя.
        /// </summary>
        [NotMapped]
        public IReadOnlyList<string> FieldActivityNames
        {
            get
            {
                if (FieldActivities is not null)
                {
                    return FieldActivities.Select(x => x.Name).ToArray();
                }
                else
                {
                    return new List<string>();
                }
            }
        }

        /// <summary>
        /// Список имен сфер деятельности пользователя в виде текста.
        /// </summary>
        [NotMapped]
        public string FieldActivityNamesAsText
        {
            get
            {
                if (FieldActivities is not null)
                {
                    return string.Join(SeparatorForText, FieldActivities.Select(x => x.Name).ToArray());
                }
                else
                {
                    return string.Empty;
                }
            }
            set { }
        }

        //
        // АВАТАР
        //
        /// <summary>
        /// Идентификатор аватара.
        /// </summary>
        public Guid? AvatarId { get; set; }
        #endregion
    }
    /**@}*/
}