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
    /// Контролёр для работы с группами.
    /// </summary>
    public class UserGroupController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusUserGroupService _groupService;
        private readonly ILogger<UserGroupController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="groupService">Интерфейс сервиса для работы с группами.</param>
        /// <param name="logger">Интерфейс сервиса логгера.</param>
        public UserGroupController(ILotusUserGroupService groupService, ILogger<UserGroupController> logger)
        {
            _groupService = groupService;
            _logger = logger;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Создание группы по указанным данным.
        /// </summary>
        /// <param name="groupCreate">Параметры для создания группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Response<UserGroupDto>), StatusCodes.Status201Created)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Create([FromBody] UserGroupCreateRequest groupCreate, CancellationToken token)
        {
            var result = await _groupService.CreateAsync(groupCreate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Обновление данных указанной группы.
        /// </summary>
        /// <param name="groupUpdate">Параметры обновляемой группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        [HttpPut("update")]
        [ProducesResponseType(typeof(Response<UserGroupDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Update([FromBody] UserGroupDto groupUpdate, CancellationToken token)
        {
            var result = await _groupService.UpdateAsync(groupUpdate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение указанной группы.
        /// </summary>
        /// <param name="id">Идентификатор группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        [HttpGet("get")]
        [ProducesResponseType(typeof(Response<UserGroupDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromQuery] int id, CancellationToken token)
        {
            var result = await _groupService.GetAsync(id, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение списка групп.
        /// </summary>
        /// <param name="groupRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок групп.</returns>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(ResponsePage<UserGroupDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll([FromQuery] UserGroupsRequest groupRequest, CancellationToken token)
        {
            var result = await _groupService.GetAllAsync(groupRequest, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Удаление группы.
        /// </summary>
        /// <param name="id">Идентификатор группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        [HttpDelete("delete")]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete([FromQuery] int id, CancellationToken token)
        {
            var result = await _groupService.DeleteAsync(id, token);
            return SendResponse(result);
        }
        #endregion
    }
    /**@}*/
}