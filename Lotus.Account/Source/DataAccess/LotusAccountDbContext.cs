﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Слой данных
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAccountDbContext.cs
*		Контекс базы данных для хранения пользователей и учетных данных.
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
         * \defgroup AccountDataAccess Слой данных
         * \ingroup Account
         * \brief Слой данных модуля.
         * @{
         */
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Контекст базы данных представляющий собой всех пользователей и учетных данных
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CAccountDbContext : DbContext
        {
            #region ======================================= СВОЙСТВА ==================================================
            /// <summary>
            /// Список пользователей
            /// </summary>
            public DbSet<CUser> Users { get; set; } = null!;

            /// <summary>
            /// Список ролей
            /// </summary>
            public DbSet<CRole> Roles { get; set; } = null!;

            /// <summary>
            /// Список разрешений
            /// </summary>
            public DbSet<CPermission> Permissions { get; set; } = null!;

            /// <summary>
            /// Список должностей
            /// </summary>
            public DbSet<CPosition> Positions { get; set; } = null!;

            /// <summary>
            /// Список групп
            /// </summary>
            public DbSet<CGroup> Groups { get; set; } = null!;

            /// <summary>
            /// Список сфер деятельности
            /// </summary>
            public DbSet<CFieldActivity> FieldActivities { get; set; } = null!;

            /// <summary>
            /// Список сообщений
            /// </summary>
            public DbSet<CMessage> Messages { get; set; } = null!;

			/// <summary>
			/// Список уведомления
			/// </summary>
			public DbSet<CNotification> Notifications { get; set; } = null!;

			/// <summary>
			/// Список аваторов
			/// </summary>
			public DbSet<CAvatar> Avatars { get; set; } = null!;

            /// <summary>
            /// Список устройств
            /// </summary>
            public DbSet<CDevice> Devices { get; set; } = null!;

            /// <summary>
            /// Список сессий
            /// </summary>
            public DbSet<CSession> Sessions { get; set; } = null!;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор по умолчанию инициализирует объект класса предустановленными значениями
            /// </summary>
            //---------------------------------------------------------------------------------------------------------
            public CAccountDbContext()
            {
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="options">Параметры конфигурации</param>
            //---------------------------------------------------------------------------------------------------------
            public CAccountDbContext(DbContextOptions<CAccountDbContext> options)
                : base(options)
            {
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурирование моделей
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                // You can globally assign schema here
                modelBuilder.HasDefaultSchema(XDbConstants.SchemeName);

                XDbConfiguration.ConfigurationUserDatabase(modelBuilder);

                base.OnModelCreating(modelBuilder);
            }
            #endregion

            #region ======================================= РАБОТА С УСТРОЙСТВАМИ =====================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение актуального устройства
            /// </summary>
            /// <param name="device">Устройство</param>
            /// <returns>Устройство</returns>
			//---------------------------------------------------------------------------------------------------------
            public CDevice GetDevice(CDevice? device)
            {
                if (device == null)
                {
                    if (Devices.Any())
                    {
                        return Devices.First();
                    }
                    else
                    {
                        CDevice newDevice = new CDevice();
                        newDevice.SetCodeId();
                        Devices.Add(newDevice);
                        SaveChanges();

                        return newDevice;
                    }
                }

                CDevice? find_device = Devices.Where(x => x.CodeId == device.CodeId).FirstOrDefault();
                if (find_device is not null)
                {
                    return find_device;
                }

                device.SetCodeId();
                Devices.Add(device);
                SaveChanges();

                return device;

            }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================