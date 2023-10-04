//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPermissionController.cs
*		Контролёр для работы с разрешениями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using OpenIddict.Validation.AspNetCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Web;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountWebApiController
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Контролёр для работы с разрешениями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class UserPermissionController : ControllerResultBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusUserPermissionService _permissionService;
            private readonly ILogger<UserPermissionController> _logger;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="positionService">Интерфейс сервиса для работы с разрешениями</param>
            /// <param name="logger">Интерфейс сервиса логгера</param>
            //---------------------------------------------------------------------------------------------------------
            public UserPermissionController(ILotusUserPermissionService positionService, 
				ILogger<UserPermissionController> logger)
            {
                _permissionService = positionService;
                _logger = logger;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание разрешения по указанным данным
            /// </summary>
            /// <param name="positionCreate">Параметры для создания разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Разрешение</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost("create")]
            [ProducesResponseType(typeof(Response<UserPermissionDto>), StatusCodes.Status201Created)]
			[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
			public async Task<IActionResult> Create([FromBody] UserPermissionCreateRequest positionCreate, CancellationToken token)
            {
                var result = await _permissionService.CreateAsync(positionCreate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанного разрешения
            /// </summary>
            /// <param name="positionUpdate">Параметры обновляемого разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Разрешение</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPut("update")]
            [ProducesResponseType(typeof(Response<UserPermissionDto>), StatusCodes.Status200OK)]
			[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
			public async Task<IActionResult> Update([FromBody] UserPermissionDto positionUpdate, CancellationToken token)
            {
                var result = await _permissionService.UpdateAsync(positionUpdate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка разрешений
            /// </summary>
            /// <param name="positionRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок разрешений</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpGet("getAll")]
            [ProducesResponseType(typeof(ResponsePage<UserPermissionDto>), StatusCodes.Status200OK)]
			[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
			public async Task<IActionResult> GetAll([FromQuery] UserPermissionsRequest positionRequest, CancellationToken token)
            {
                var result = await _permissionService.GetAllAsync(positionRequest, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление разрешения
            /// </summary>
            /// <param name="id">Идентификатор разрешения</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpDelete("delete")]
			[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
			public async Task<IActionResult> Delete([FromQuery] Int32 id, CancellationToken token)
            {
                var result = await _permissionService.DeleteAsync(id, token);
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