//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAccountDbConfiguration.cs
*		Статический класс для конфигурации и инициализации базы данных.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /**
         * \defgroup AccountConfiguration Подсистема конфигурации и инициализации
         * \ingroup Account
         * \brief Подсистема конфигурации и инициализации.
         * @{
         */
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс для конфигурации и инициализации базы данных
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XDbConfiguration
        {
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурация и первоначальная инициализация базы данных
            /// </summary>
            /// <remarks>
            /// Вызывается в <see cref="CAccountDbContext.OnModelCreating(ModelBuilder)"/>
            /// </remarks>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ConfigurationUserDatabase(ModelBuilder modelBuilder)
            {
                CUser.ModelCreating(modelBuilder);
                CPosition.ModelCreating(modelBuilder);
                CRole.ModelCreating(modelBuilder);
                CAvatar.ModelCreating(modelBuilder);
                CMessage.ModelCreating(modelBuilder);
				CNotification.ModelCreating(modelBuilder);
				CGroup.ModelCreating(modelBuilder);
                CFieldActivity.ModelCreating(modelBuilder);
                CDevice.ModelCreating(modelBuilder);
                CSession.ModelCreating(modelBuilder);
                CPermission.ModelCreating(modelBuilder);
                CRolePermission.ModelCreating(modelBuilder);
                CUserFieldActivity.ModelCreating(modelBuilder);
                CUserGroup.ModelCreating(modelBuilder);

				// Первоначальная инициализация через миграцию
				XDbSeed.Create(modelBuilder);
			}
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================