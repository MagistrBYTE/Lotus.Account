//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusNotificationController.cs
*		Контролёр для работы с уведомлениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.AspNetCore.Mvc;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Web;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtonotification AccountWebApiController
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Контролёр для работы с уведомлениями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class NotificationController : ControllerResultBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusNotificationService _notificationService;
            private readonly ILogger<NotificationController> _logger;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="notificationService">Интерфейс сервиса для работы с уведомлениями</param>
            /// <param name="logger">Интерфейс сервиса логгера</param>
            //---------------------------------------------------------------------------------------------------------
            public NotificationController(ILotusNotificationService notificationService, ILogger<NotificationController> logger)
            {
                _notificationService = notificationService;
                _logger = logger;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание уведомления по указанным данным
            /// </summary>
            /// <param name="notificationCreate">Параметры для создания уведомления</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Уведомление</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost("create")]
            [ProducesResponseType(typeof(Response<CNotificationDto>), StatusCodes.Status201Created)]
            public async Task<IActionResult> Create([FromBody] CNotificationCreateDto notificationCreate, CancellationToken token)
            {
                var result = await _notificationService.CreateAsync(notificationCreate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанного уведомления
            /// </summary>
            /// <param name="notificationUpdate">Параметры обновляемой уведомления</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Уведомление</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPut("update")]
            [ProducesResponseType(typeof(Response<CNotificationDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> Update([FromBody] CNotificationDto notificationUpdate, CancellationToken token)
            {
                var result = await _notificationService.UpdateAsync(notificationUpdate, token);
                return SendResponse(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной уведомления
			/// </summary>
			/// <param name="id">Идентификатор уведомления</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Уведомление</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpGet("get")]
			[ProducesResponseType(typeof(ResponsePage<CNotificationDto>), StatusCodes.Status200OK)]
			public async Task<IActionResult> Get([FromQuery] String id, CancellationToken token)
			{
				var result = await _notificationService.GetAsync(Guid.Parse(id), token);
				return SendResponse(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка уведомлений
			/// </summary>
			/// <param name="notificationRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок уведомлений</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpGet("getall")]
            [ProducesResponseType(typeof(ResponsePage<CNotificationDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> GetAll([FromQuery] CNotificationsDto notificationRequest, CancellationToken token)
            {
                var result = await _notificationService.GetAllAsync(notificationRequest, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление уведомления
            /// </summary>
            /// <param name="id">Идентификатор уведомления</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpDelete("delete")]
            public async Task<IActionResult> Delete([FromQuery] String id, CancellationToken token)
            {
                var result = await _notificationService.DeleteAsync(Guid.Parse(id), token);
                return SendResponse(result);
            }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================