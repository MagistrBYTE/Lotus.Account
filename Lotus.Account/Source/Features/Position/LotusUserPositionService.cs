//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с должностями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPositionService.cs
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
		public class UserPositionService : ILotusUserPositionService
        {
            #region ======================================= ДАННЫЕ ====================================================
            private readonly ILotusRepository _repository;
            #endregion

            #region ======================================= КОНСТРУКТОРЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конструктор инициализирует объект класса указанными параметрами
            /// </summary>
            /// <param name="repository">Интерфейс для работы с сущностями</param>
            //---------------------------------------------------------------------------------------------------------
            public UserPositionService(ILotusRepository repository)
            {
                _repository = repository;
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
            public async Task<Response<UserPositionDto>> CreateAsync(UserPositionCreateRequest positionCreate, CancellationToken token)
            {
                UserPosition entity = positionCreate.Adapt<UserPosition>();

				await _repository.AddAsync(entity);
                await _repository.FlushAsync(token);

                UserPositionDto result = entity.Adapt<UserPositionDto>();

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
            public async Task<Response<UserPositionDto>> UpdateAsync(UserPositionDto positionUpdate, CancellationToken token)
            {
                UserPosition entity = positionUpdate.Adapt<UserPosition>();

				_repository.Update(entity);
                await _repository.FlushAsync(token);

                UserPositionDto result = entity.Adapt<UserPositionDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной должности
			/// </summary>
			/// <param name="id">Идентификатор должности</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Должность</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserPositionDto>> GetAsync(Int32 id, CancellationToken token)
			{
				UserPosition? entity = await _repository.GetByIdAsync<UserPosition, Int32>(id, token);
				if (entity == null)
				{
					return XResponse.Failed<UserPositionDto>(XUserPositionErrors.NotFound);
				}

				UserPositionDto result = entity.Adapt<UserPositionDto>();

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
			public async Task<ResponsePage<UserPositionDto>> GetAllAsync(UserPositionsRequest positionRequest, CancellationToken token)
            {
				var query = _repository.Query<UserPosition>();

                query = query.Filter(positionRequest.Filtering);

				var queryOrder = query.Sort(positionRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<UserPosition, UserPositionDto>(positionRequest, token);

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
				UserPosition? entity = await _repository.GetByIdAsync<UserPosition, Int32>(id, token);
				if (entity == null)
				{
					return XResponse.Failed<UserPositionDto>(XUserPositionErrors.NotFound);
				}

				if (entity.Id < 4)
                {
                    return XResponse.Failed(XUserPositionErrors.NotDeleteConst);
                }

                _repository.Remove(entity!);
                await _repository.FlushAsync(token);

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