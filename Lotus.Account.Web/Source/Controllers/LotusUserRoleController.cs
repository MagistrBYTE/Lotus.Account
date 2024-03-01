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
    /// Контролёр для работы с ролями.
    /// </summary>
    public class UserRoleController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusUserRoleService _roleService;
        private readonly ILogger<UserRoleController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="roleService">Интерфейс сервиса для работы с ролями.</param>
        /// <param name="logger">Интерфейс сервиса логгера.</param>
        public UserRoleController(ILotusUserRoleService roleService, ILogger<UserRoleController> logger)
        {
            _roleService = roleService;
            _logger = logger;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Создание роли по указанным данным.
        /// </summary>
        /// <param name="roleCreate">Параметры для создания роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Response<UserRoleDto>), StatusCodes.Status201Created)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Create([FromBody] UserRoleCreateRequest roleCreate, CancellationToken token)
        {
            var result = await _roleService.CreateAsync(roleCreate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Обновление данных указанной роли.
        /// </summary>
        /// <param name="roleUpdate">Параметры обновляемой роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        [HttpPut("update")]
        [ProducesResponseType(typeof(Response<UserRoleDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Update([FromBody] UserRoleDto roleUpdate, CancellationToken token)
        {
            var result = await _roleService.UpdateAsync(roleUpdate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение указанной роли.
        /// </summary>
        /// <param name="id">Идентификатор роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Роль.</returns>
        [HttpGet("get")]
        [ProducesResponseType(typeof(Response<UserRoleDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromQuery] int id, CancellationToken token)
        {
            var result = await _roleService.GetAsync(id, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение списка ролей.
        /// </summary>
        /// <param name="roleRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок ролей.</returns>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(ResponsePage<UserRoleDto>), StatusCodes.Status200OK)]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll([FromQuery] UserRolesRequest roleRequest, CancellationToken token)
        {
            var result = await _roleService.GetAllAsync(roleRequest, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Удаление роли.
        /// </summary>
        /// <param name="id">Идентификатор роли.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        [HttpDelete("delete")]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete([FromQuery] int id, CancellationToken token)
        {
            var result = await _roleService.DeleteAsync(id, token);
            return SendResponse(result);
        }
        #endregion
    }
    /**@}*/
}