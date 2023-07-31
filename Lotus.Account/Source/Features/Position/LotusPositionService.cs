//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с должностями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusPositionService.cs
*		Cервис для работы с должностями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AccountPosition
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Cервис для работы с должностями
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CPositionService : ILotusPositionService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly CAccountDbContext _context;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="context">Контекст БД пользователей</param>
            //---------------------------------------------------------------------------------------------------------
            public CPositionService(CAccountDbContext context)
            {
                _context = context;
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
            public async Task<Response<CPositionDto>> CreateAsync(CPositionCreateDto positionCreate, CancellationToken token)
            {
                CPosition entity = positionCreate.Adapt<CPosition>();

                _context.Positions.Add(entity);
                await _context.SaveChangesAsync(token);

                CPositionDto result = entity.Adapt<CPositionDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной должности
            /// </summary>
            /// <param name="positionUpdate">Параметры обновляемой должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Должность</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CPositionDto>> UpdateAsync(CPositionDto positionUpdate, CancellationToken token)
            {
                CPosition entity = positionUpdate.Adapt<CPosition>();

                _context.Positions.Update(entity);
                await _context.SaveChangesAsync(token);

                CPositionDto result = entity.Adapt<CPositionDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка должностей
            /// </summary>
            /// <param name="positionRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок должностей</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<ResponsePage<CPositionDto>> GetAllAsync(CPositionsDto positionRequest, CancellationToken token)
            {
                var query = _context.Positions.AsQueryable();

                query = query.Filter(positionRequest.Filtering);

				var queryOrder = query.Sort(positionRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<CPosition, CPositionDto>(positionRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление должности
            /// </summary>
            /// <param name="id">Идентификатор должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                CPosition? entity = await _context.Positions.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (entity == null)
                {
                    return XResponse.Failed(XPositionErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XPositionErrors.NotDeleteConst);
                }

                _context.Positions.Remove(entity!);
                await _context.SaveChangesAsync(token);

                return XResponse.Succeed();
            }
            #endregion
        }
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================