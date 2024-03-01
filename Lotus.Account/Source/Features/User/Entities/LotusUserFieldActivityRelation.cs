using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
	*@{*/
    /// <summary>
    /// Класс для связывания пользователя и сферы деятельности.
    /// </summary>
    public class UserFieldActivityRelation : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserFieldActivityRelation";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserFieldActivityRelation"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserFieldActivityRelation>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Идентификатор сферы деятельности.
        /// </summary>
        public int FieldActivityId { get; set; }

        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public Guid UserId { get; set; }
        #endregion
    }
    /**@}*/
}