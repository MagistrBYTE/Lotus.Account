//=====================================================================================================================
// Проект: Модуль WebApi учетной записи пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusPositionController.cs
*		Контролёр для работы с должностями.
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
        /// Контролёр для работы с должностями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class PositionController : ControllerResultBase
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusPositionService _positionService;
            private readonly ILogger<PositionController> _logger;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="positionService">Интерфейс сервиса для работы с должностями</param>
            /// <param name="logger">Интерфейс сервиса логгера</param>
            //---------------------------------------------------------------------------------------------------------
            public PositionController(ILotusPositionService positionService, ILogger<PositionController> logger)
            {
                _positionService = positionService;
                _logger = logger;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание должности по указанным данным
            /// </summary>
            /// <param name="positionCreate">Параметры для создания должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPost("create")]
            [ProducesResponseType(typeof(Response<CPositionDto>), StatusCodes.Status201Created)]
            public async Task<IActionResult> Create([FromBody] CPositionCreateDto positionCreate, CancellationToken token)
            {
                var result = await _positionService.CreateAsync(positionCreate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной должности
            /// </summary>
            /// <param name="positionUpdate">Параметры обновляемой должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpPut("update")]
            [ProducesResponseType(typeof(Response<CPositionDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> Update([FromBody] CPositionDto positionUpdate, CancellationToken token)
            {
                var result = await _positionService.UpdateAsync(positionUpdate, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка должностей
            /// </summary>
            /// <param name="positionRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок должностей</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpGet("getall")]
            [ProducesResponseType(typeof(ResponsePage<CPositionDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> GetAll([FromQuery] CPositionsDto positionRequest, CancellationToken token)
            {
                var result = await _positionService.GetAllAsync(positionRequest, token);
                return SendResponse(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление должности
            /// </summary>
            /// <param name="id">Идентификатор должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            [HttpDelete("delete")]
            public async Task<IActionResult> Delete([FromQuery] Int32 id, CancellationToken token)
            {
                var result = await _positionService.DeleteAsync(id, token);
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