//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с пользователем
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUser.cs
*		Класс для определения пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AccountUser Подсистема работы с пользователем
         * \ingroup Account
         * \brief Подсистема работы с пользователем.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для определения пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class User : EntityDb<Guid>, IUserInfo
        {
            #region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
            /// <summary>
            /// Разделитель для формирования строковых список в одну строку
            /// </summary>
            public const Char SeparatorForText = ',';

            /// <summary>
            /// Имя таблицы
            /// </summary>
            public const String TABLE_NAME = "User";
            #endregion

            #region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование модели для типа <see cref="User"/>
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
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

            #region ======================================= СВОЙСТВА ==================================================
            //
            // ИДЕНТИФИКАЦИЯ
            //
            /// <summary>
            /// Логин пользователя
            /// </summary>
            [MaxLength(10)]
            public String Login { get; set; } = null!;

            /// <summary>
            /// Почта пользователя
            /// </summary>
            [MaxLength(20)]
            public String? Email { get; set; }

            /// <summary>
            /// Статус потверждение почты
            /// </summary>
            public Boolean EmailConfirmed { get; set; }

            /// <summary>
            /// Хэшированное представление пароля
            /// </summary>
            [MaxLength(256)]
            public String PasswordHash { get; set; } = null!;

            //
            // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
            //
            /// <summary>
            /// Имя пользователя
            /// </summary>
            [MaxLength(30)]
            public String? Name { get; set; }

            /// <summary>
            /// Фамилия пользователя
            /// </summary>
            [MaxLength(30)]
            public String? Surname { get; set; }

			/// <summary>
			/// Отчество пользователя
			/// </summary>
			[MaxLength(30)]
			public String? Patronymic { get; set; }

            /// <summary>
            /// Полное имя (ФИО)
            /// </summary>
            [NotMapped]
            public String FullName
            {
                get { return ($"{Surname} {Name} {Patronymic}"); }
            }

            /// <summary>
            /// Краткое имя (Фамилия, инициалы)
            /// </summary>
            [NotMapped]
            public String ShortName
            {
                get
                {
                    return ($"{Surname} {Name?[0]}. {Patronymic?[0]}.");
                }
            }

            /// <summary>
            /// День рождение
            /// </summary>
            public DateOnly? Birthday { get; set; }

            //
            // РОЛЬ И РАЗРЕШЕНИЯ
            //
            /// <summary>
            /// Роль
            /// </summary>
            [ForeignKey(nameof(RoleId))]
            public UserRole? Role { get; set; }

            /// <summary>
            /// Идентификатор роли
            /// </summary>
            public Int32? RoleId { get; set; }

			/// <summary>
			/// Служебное наименование роли
			/// </summary>
			[NotMapped]
			public String RoleSystemName
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
            /// Список системных имен разрешений
            /// </summary>
            [NotMapped]
            public ICollection<String> PermissionsSystemNames
            {
                get
                {
                    if (Role is not null && Role.Permissions is not null)
                    {
                        return Role.Permissions.Select(p => p.Name).ToHashSet();
                    }

                    return new HashSet<String>();
                }
            }

            /// <summary>
            /// Список системных имен разрешений в виде текста
            /// </summary>
            [NotMapped]
            public String PermissionsSystemNamesAsText
            {
                get
                {
                    if (Role is not null && Role.Permissions is not null)
                    {
                        return String.Join(SeparatorForText, Role.Permissions.Select(p => p.Name).ToArray());
                    }

                    return String.Empty;
                }
                set { }
            }

            //
            // ДОЛЖНОСТЬ
            //
            /// <summary>
            /// Должность
            /// </summary>
            [ForeignKey(nameof(PostId))]
            public UserPosition? Post { get; set; }

            /// <summary>
            /// Идентификатор должности
            /// </summary>
            public Int32? PostId { get; set; }

            /// <summary>
            /// Наименование должности
            /// </summary>
            [NotMapped]
            public String PostShortName
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
            /// Группы пользователя
            /// </summary>
            public List<UserGroup>? Groups { get; set; }

            /// <summary>
            /// Список имен групп пользователя
            /// </summary>
            [NotMapped]
            public IReadOnlyList<String> GroupNames
            {
                get
                {
                    if (Groups is not null)
                    {
                        return Groups.Select(x => x.Name).ToArray();
                    }
                    else
                    {
                        return new List<String>();
                    }
                }
            }

            /// <summary>
            /// Список имен групп пользователя в виде текста
            /// </summary>
            [NotMapped]
            public String GroupNamesAsText
            {
                get
                {
                    if (Groups is not null)
                    {
                        return String.Join(SeparatorForText, Groups.Select(x => x.Name).ToArray());
                    }
                    else
                    {
                        return String.Empty;
                    }
                }
                set { }
            }

            //
            // CФЕРЫ ДЕЯТЕЛЬНОСТИ
            //
            /// <summary>
            /// Cферы деятельности пользователя
            /// </summary>
            public List<UserFieldActivity>? FieldActivities { get; set; }

            /// <summary>
            /// Список имен сфер деятельности пользователя
            /// </summary>
            [NotMapped]
            public IReadOnlyList<String> FieldActivityNames
            {
                get
                {
                    if (FieldActivities is not null)
                    {
                        return FieldActivities.Select(x => x.Name).ToArray();
                    }
                    else
                    {
                        return new List<String>();
                    }
                }
            }

            /// <summary>
            /// Список имен сфер деятельности пользователя в виде текста
            /// </summary>
            [NotMapped]
            public String FieldActivityNamesAsText
            {
                get
                {
                    if (FieldActivities is not null)
                    {
                        return String.Join(SeparatorForText, FieldActivities.Select(x => x.Name).ToArray());
                    }
                    else
                    {
                        return String.Empty;
                    }
                }
                set { }
            }

            //
            // АВАТАР
            //
            /// <summary>
            /// Идентификатор аватара
            /// </summary>
            public Guid? AvatarId { get; set; }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================