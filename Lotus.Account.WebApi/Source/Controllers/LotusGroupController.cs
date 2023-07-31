﻿//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusGroupController.cs
*		Контролёр для работы с группами.
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
        /// Контролёр для работы с группами
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class GroupController : ControllerResultBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusGroupService _groupService;
            private readonly ILogger<GroupController> _logger;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="groupService">Интерфейс сервиса для работы с группами</param>
            /// <param name="logger">Интерфейс сервиса логгера</param>
            //---------------------------------------------------------------------------------------------------------
            public GroupController(ILotusGroupService groupService, ILogger<GroupController> logger)
            {
                _groupService = groupService;
                _logger = logger;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание группы по указанным данным
            /// </summary>
            /// <param name="groupCreate">Параметры для создания группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Группа</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost("create")]
            [ProducesResponseType(typeof(Response<CGroupDto>), StatusCodes.Status201Created)]
            public async Task<IActionResult> Create([FromBody] CGroupCreateDto groupCreate, CancellationToken token)
            {
                var result = await _groupService.CreateAsync(groupCreate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной группы
            /// </summary>
            /// <param name="groupUpdate">Параметры обновляемой группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Группа</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPut("update")]
            [ProducesResponseType(typeof(Response<CGroupDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> Update([FromBody] CGroupDto groupUpdate, CancellationToken token)
            {
                var result = await _groupService.UpdateAsync(groupUpdate, token);
                return SendResponse(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной группы
			/// </summary>
			/// <param name="id">Идентификатор группы</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Группа</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpGet("get")]
			[ProducesResponseType(typeof(ResponsePage<CGroupDto>), StatusCodes.Status200OK)]
			public async Task<IActionResult> Get([FromQuery] Int32 id, CancellationToken token)
			{
				var result = await _groupService.GetAsync(id, token);
				return SendResponse(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка групп
			/// </summary>
			/// <param name="groupRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок групп</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpGet("getall")]
            [ProducesResponseType(typeof(ResponsePage<CGroupDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> GetAll([FromQuery] CGroupsDto groupRequest, CancellationToken token)
            {
                var result = await _groupService.GetAllAsync(groupRequest, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление группы
            /// </summary>
            /// <param name="id">Идентификатор группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpDelete("delete")]
            public async Task<IActionResult> Delete([FromQuery] Int32 id, CancellationToken token)
            {
                var result = await _groupService.DeleteAsync(id, token);
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