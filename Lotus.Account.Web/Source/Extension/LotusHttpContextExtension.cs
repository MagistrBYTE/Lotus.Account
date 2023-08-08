//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Методы расширения
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusHttpContextExtension.cs
*		Статический класс реализующий методы расширения для работы с контекстом запроса.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.Extensions.Primitives;
using UAParser;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /**
         * \defgroup AccountWebApiExtension Методы расширения
         * \ingroup AccountWebApi
         * \brief Методы расширения.
         * @{
         */
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Статический класс реализующий методы расширения для работы с контекстом запроса
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public static class XHttpContextExtension
        {
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение устройство входа пользователя через контекст запроса
            /// </summary>
            /// <param name="httpContex">Контекст запроса</param>
            /// <returns>Устройство входа</returns>
            //---------------------------------------------------------------------------------------------------------
            public static CDevice GetDeviceFromRequest(this HttpContext httpContex)
            {
                if (httpContex.Request.Headers.TryGetValue("User-Agent", out StringValues userAgent))
                {
                    // get a parser with the embedded regex patterns
                    var uaParser = Parser.GetDefault();

                    var client_info = uaParser.Parse(userAgent);

                    var device = new CDevice();
                    device.Platform = $"{client_info.OS.Family} {client_info.OS.Major} {client_info.OS.Minor}";
                    device.Family = client_info.Device.Family;
                    device.Brand = client_info.Device.Brand;
                    device.Model = client_info.Device.Model;
                    device.SetCodeId();

                    return device;
                }

                return new CDevice();
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение браузера пользователя через контекст запроса
            /// </summary>
            /// <param name="httpContex">Контекст запроса</param>
            /// <returns>Браузер</returns>
            //---------------------------------------------------------------------------------------------------------
            public static String GetBrowserFromRequest(this HttpContext httpContex)
            {
                if (httpContex.Request.Headers.TryGetValue("User-Agent", out StringValues userAgent))
                {
                    // get a parser with the embedded regex patterns
                    var uaParser = Parser.GetDefault();

                    var client_info = uaParser.Parse(userAgent);

                    return client_info.UA.Family;
                }

                return String.Empty;
            }
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================