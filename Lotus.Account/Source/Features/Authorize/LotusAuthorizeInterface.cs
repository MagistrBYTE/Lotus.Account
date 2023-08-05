﻿//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема авторизации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAuthorizeInterface.cs
*		Определение интерфейса сервиса для авторизации пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.Security.Claims;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /**
         * \defgroup AccountAuthorize Подсистема авторизации
         * \ingroup Account
         * \brief Подсистема авторизации.
         * @{
         */
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Интерфейса сервиса для авторизации пользователя
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public interface ILotusAuthorizeService
        {
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Аутентификация пользователя
            /// </summary>
            /// <param name="loginParameters">Параметры для аутентификации пользователя</param>
            /// <param name="browser">Браузер входа</param>
            /// <param name="device">Устройство входа</param>
            /// <returns>Набор утверждений</returns>
            //---------------------------------------------------------------------------------------------------------
            Task<Response<ClaimsPrincipal>> LoginAsync(CLoginParametersDto loginParameters, String browser, CDevice? device);

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Выход из статуса аутентификации пользователя
            /// </summary>
            /// <param name="accessToken">Токен доступа</param>
            /// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            Task LogoutAsync(String? accessToken);

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Регистрация нового пользователя
			/// </summary>
			/// <param name="registrParameters">Параметры для регистрации нового пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			Task<Response> RegistrAsync(CRegistrParametersDto registrParameters, CancellationToken token);
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================