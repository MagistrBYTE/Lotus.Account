//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusModuleInitializer.cs
*		Инициализация модуля пользователя платформы Web.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System;
using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AccountWebApiConfiguration Подсистема конфигурации и инициализации
         * \ingroup AccountWebApi
         * \brief Подсистема конфигурации и инициализации.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Инициализация модуль WebApi учетной записи пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XModuleInitializer
        {
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Настройка сервера OpenIddict
            /// </summary>
            /// <param name="services">Коллекция сервисов</param>
            /// <param name="urlServer">Адрес сервера валидации</param>
            /// <returns>Коллекция сервисов</returns>
            //---------------------------------------------------------------------------------------------------------
            public static IServiceCollection AddLotusUserOpenIddict(this IServiceCollection services, String? urlServer)
            {
                // Register the OpenIddict core components.
                services.AddOpenIddict()
                    .AddCore(options =>
                    {
                        // Configure OpenIddict to use the EF Core stores/models.
                        options.UseEntityFrameworkCore()
                        .UseDbContext<CAccountDbContext>();
                    })

                    // Register the OpenIddict server components.
                    .AddServer(options =>
                    {
                        options
                            .AllowPasswordFlow()            // Пароль
                            .AllowClientCredentialsFlow()   // Приложение
                            .AllowRefreshTokenFlow()        // RefreshToken
                            .SetAccessTokenLifetime(TimeSpan.FromMinutes(5))
                            .SetRefreshTokenLifetime(TimeSpan.FromMinutes(60));

                        options
                            .SetTokenEndpointUris(XRoutesConstants.TokenEndpoint)
                            .SetUserinfoEndpointUris(XRoutesConstants.UserInfoEndpoint);

                        options
                            .AcceptAnonymousClients();

                        options
                            .AddEphemeralEncryptionKey()     //  В рабочей среде рекомендуется использовать сертификат X.509
                            .AddEphemeralSigningKey()
                            .DisableAccessTokenEncryption(); // Отключить шифрование токена

                        options.RegisterScopes(XOpenIddictConfiguration.GetScopesDefaults());

                        options
                            .UseAspNetCore()
                            .DisableTransportSecurityRequirement()
                            .EnableTokenEndpointPassthrough()
                            .EnableUserinfoEndpointPassthrough();
                    })

                    // Register the OpenIddict validation components.
                    .AddValidation(options =>
                    {
                        options.UseAspNetCore();
                        if (String.IsNullOrEmpty(urlServer))
                        {
                            options.UseLocalServer();
                        }
                        else
                        {
                            options.SetIssuer(urlServer);
                            options.UseSystemNetHttp();
                        }
                    });


                return services;
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Настройка сервисов модуля учетной записи пользователя
			/// </summary>
			/// <param name="services">Коллекция сервисов</param>
			/// <returns>Коллекция сервисов</returns>
			//---------------------------------------------------------------------------------------------------------
			public static IServiceCollection AddLotusAccountServices(this IServiceCollection services)
            {
                services.AddScoped<ILotusAuthorizeService, CAuthorizeService>();
				services.AddScoped<ILotusGroupService, CGroupService>();
				services.AddScoped<ILotusNotificationService, CNotificationService>();

				services.AddScoped<ILotusUserService, CUserService>();
                services.AddScoped<ILotusPositionService, CPositionService>();
                services.AddScoped<ILotusPermissionService, CPermissionService>();
                services.AddScoped<ILotusRoleService, CRoleService>();

                XMapping.Init();

                return services;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Добавление в коллекцию сервисов базы данных
            /// </summary>
            /// <param name="services">Коллекция сервисов</param>
            /// <param name="configuration">Конфигурация</param>
            /// <returns>Коллекция сервисов</returns>
            //---------------------------------------------------------------------------------------------------------
            public static IServiceCollection AddLotusUserDatabase(this IServiceCollection services, IConfiguration configuration)
            {
                // Добавление CAccountDbContext для взаимодействия с базой данных учетных записей
                // Используем для корректной работы OpenIddict
                services.AddDbContext<CAccountDbContext>(options =>
                {
                    options.UseOpenIddict();
                    options.UseNpgsql(configuration.GetConnectionString(XDbConstants.ConnectingUserDb),
                        optionsBuilder =>
                        {
                            optionsBuilder.MigrationsHistoryTable(XDbConstants.MigrationHistoryTableName,
                                XDbConstants.SchemeName);
                        });
                });

                return services;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Инициализация базы данных
            /// </summary>
            /// <param name="application">Построитель web-приложения</param>
			/// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public static async Task InitLotusUserDatabase(this IApplicationBuilder application)
            {
                if (application == null)
                {
                    throw new ArgumentNullException(nameof(application));
                }

                if (application is not null)
                {
                    using var service_scope = application!.ApplicationServices!.GetService<IServiceScopeFactory>()!.CreateScope();
                    using var context = service_scope.ServiceProvider.GetRequiredService<CAccountDbContext>();

                    try
                    {
                        await context.Database.MigrateAsync();
                    }
                    catch (Exception exc)
                    {
                        Console.WriteLine(exc.ToString());
                    }
                }
            }
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================