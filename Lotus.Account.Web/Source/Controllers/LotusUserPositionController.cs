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
    /// Контролёр для работы с должностями.
    /// </summary>
    public class UserPositionController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusUserPositionService _positionService;
        private readonly ILogger<UserPositionController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="positionService">Интерфейс сервиса для работы с должностями.</param>
        /// <param name="logger">Интерфейс сервиса логгера.</param>
        public UserPositionController(ILotusUserPositionService positionService, ILogger<UserPositionController> logger)
        {
            _positionService = positionService;
            _logger = logger;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Создание должности по указанным данным.
        /// </summary>
        /// <param name="positionCreate">Параметры для создания должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Response<UserPositionDto>), StatusCodes.Status201Created)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Create([FromBody] UserPositionCreateRequest positionCreate, CancellationToken token)
        {
            var result = await _positionService.CreateAsync(positionCreate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Обновление данных указанной должности.
        /// </summary>
        /// <param name="positionUpdate">Параметры обновляемой должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        [HttpPut("update")]
        [ProducesResponseType(typeof(Response<UserPositionDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Update([FromBody] UserPositionDto positionUpdate, CancellationToken token)
        {
            var result = await _positionService.UpdateAsync(positionUpdate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение указанной должности.
        /// </summary>
        /// <param name="id">Идентификатор должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        [HttpGet("get")]
        [ProducesResponseType(typeof(Response<UserPositionDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromQuery] int id, CancellationToken token)
        {
            var result = await _positionService.GetAsync(id, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение списка должностей.
        /// </summary>
        /// <param name="positionRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок должностей.</returns>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(ResponsePage<UserPositionDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll([FromQuery] UserPositionsRequest positionRequest, CancellationToken token)
        {
            var result = await _positionService.GetAllAsync(positionRequest, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Удаление должности.
        /// </summary>
        /// <param name="id">Идентификатор должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        [HttpDelete("delete")]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete([FromQuery] int id, CancellationToken token)
        {
            var result = await _positionService.DeleteAsync(id, token);
            return SendResponse(result);
        }
        #endregion
    }
    /**@}*/
}