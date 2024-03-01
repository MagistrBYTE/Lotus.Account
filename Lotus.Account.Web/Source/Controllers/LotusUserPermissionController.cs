using Lotus.Repository;
using Lotus.Web;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OpenIddict.Validation.AspNetCore;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiController
    *@{*/
    /// <summary>
    /// Контролёр для работы с разрешениями.
    /// </summary>
    public class UserPermissionController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusUserPermissionService _permissionService;
        private readonly ILogger<UserPermissionController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="positionService">Интерфейс сервиса для работы с разрешениями.</param>
        /// <param name="logger">Интерфейс сервиса логгера.</param>
        public UserPermissionController(ILotusUserPermissionService positionService,
        ILogger<UserPermissionController> logger)
        {
            _permissionService = positionService;
            _logger = logger;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Создание разрешения по указанным данным.
        /// </summary>
        /// <param name="positionCreate">Параметры для создания разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Разрешение.</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Response<UserPermissionDto>), StatusCodes.Status201Created)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Create([FromBody] UserPermissionCreateRequest positionCreate, CancellationToken token)
        {
            var result = await _permissionService.CreateAsync(positionCreate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Обновление данных указанного разрешения.
        /// </summary>
        /// <param name="positionUpdate">Параметры обновляемого разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Разрешение.</returns>
        [HttpPut("update")]
        [ProducesResponseType(typeof(Response<UserPermissionDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Update([FromBody] UserPermissionDto positionUpdate, CancellationToken token)
        {
            var result = await _permissionService.UpdateAsync(positionUpdate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение списка разрешений.
        /// </summary>
        /// <param name="positionRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок разрешений.</returns>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(ResponsePage<UserPermissionDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll([FromQuery] UserPermissionsRequest positionRequest, CancellationToken token)
        {
            var result = await _permissionService.GetAllAsync(positionRequest, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Удаление разрешения.
        /// </summary>
        /// <param name="id">Идентификатор разрешения.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        [HttpDelete("delete")]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete([FromQuery] int id, CancellationToken token)
        {
            var result = await _permissionService.DeleteAsync(id, token);
            return SendResponse(result);
        }
        #endregion
    }
    /**@}*/
}