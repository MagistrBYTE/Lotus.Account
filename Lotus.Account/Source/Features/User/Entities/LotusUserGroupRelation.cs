using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
	*@{*/
    /// <summary>
    /// Класс для связывания пользователя и группы.
    /// </summary>
    public class UserGroupRelation : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserGroupRelation";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserGroupRelation"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserGroupRelation>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Идентификатор группы.
        /// </summary>
        public int GroupId { get; set; }

        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public Guid UserId { get; set; }
        #endregion
    }
    /**@}*/
}