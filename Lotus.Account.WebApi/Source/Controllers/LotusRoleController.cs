//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusRoleController.cs
*		Контролёр для работы с ролями.
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
        /** \addtogroup AccountWebApiController
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Контролёр для работы с ролями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class RoleController : ControllerResultBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusRoleService _roleService;
            private readonly ILogger<RoleController> _logger;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="roleService">Интерфейс сервиса для работы с ролями</param>
            /// <param name="logger">Интерфейс сервиса логгера</param>
            //---------------------------------------------------------------------------------------------------------
            public RoleController(ILotusRoleService roleService, ILogger<RoleController> logger)
            {
                _roleService = roleService;
                _logger = logger;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание роли по указанным данным
            /// </summary>
            /// <param name="roleCreate">Параметры для создания роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Роль</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost("create")]
            [ProducesResponseType(typeof(Response<CRoleDto>), StatusCodes.Status201Created)]
            public async Task<IActionResult> Create([FromBody] CRoleCreateDto roleCreate, CancellationToken token)
            {
                var result = await _roleService.CreateAsync(roleCreate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной роли
            /// </summary>
            /// <param name="roleUpdate">Параметры обновляемой роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Роль</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPut("update")]
            [ProducesResponseType(typeof(Response<CRoleDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> Update([FromBody] CRoleDto roleUpdate, CancellationToken token)
            {
                var result = await _roleService.UpdateAsync(roleUpdate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка ролей
            /// </summary>
            /// <param name="roleRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок ролей</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpGet("getall")]
            [ProducesResponseType(typeof(ResponsePage<CRoleDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> GetAll([FromQuery] CRolesDto roleRequest, CancellationToken token)
            {
                var result = await _roleService.GetAllAsync(roleRequest, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление роли
            /// </summary>
            /// <param name="id">Идентификатор роли</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpDelete("delete")]
            public async Task<IActionResult> Delete([FromQuery] Int32 id, CancellationToken token)
            {
                var result = await _roleService.DeleteAsync(id, token);
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