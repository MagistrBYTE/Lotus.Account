//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с группами
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusGroupService.cs
*		Cервис для работы с группами.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Repository;
using Lotus.Core;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountGroup
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с группами
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CGroupService : ILotusGroupService
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
            public CGroupService(CAccountDbContext context)
            {
                _context = context;
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
            public async Task<Response<CGroupDto>> CreateAsync(CGroupCreateDto groupCreate, CancellationToken token)
            {
                CGroup entity = groupCreate.Adapt<CGroup>();

                _context.Groups.Add(entity);
                await _context.SaveChangesAsync(token);

                CGroupDto result = entity.Adapt<CGroupDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанной группы
            /// </summary>
            /// <param name="groupUpdate">Параметры обновляемого группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Группа</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CGroupDto>> UpdateAsync(CGroupDto groupUpdate, CancellationToken token)
            {
                CGroup entity = groupUpdate.Adapt<CGroup>();

                _context.Groups.Update(entity);
                await _context.SaveChangesAsync(token);

                CGroupDto result = entity.Adapt<CGroupDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанной группы
			/// </summary>
			/// <param name="id">Идентификатор группы</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Группа</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<CGroupDto>> GetAsync(Int32 id, CancellationToken token)
			{
				CGroup? entity = await _context.Groups.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
				if (entity == null)
				{
					return XResponse.Failed<CGroupDto>(XGroupErrors.NotFound);
				}

				CGroupDto result = entity.Adapt<CGroupDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка групп
			/// </summary>
			/// <param name="groupRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок групп</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<CGroupDto>> GetAllAsync(CGroupsDto groupRequest, CancellationToken token)
            {
                var query = _context.Groups.AsQueryable();

                query = query.Filter(groupRequest.Filtering);

				var queryOrder = query.Sort(groupRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<CGroup, CGroupDto>(groupRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление группы
            /// </summary>
            /// <param name="id">Идентификатор группы</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                CGroup? entity = await _context.Groups.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (entity == null)
                {
                    return XResponse.Failed(XGroupErrors.NotFound);
                }

                if (entity.Id < 4)
                {
                    return XResponse.Failed(XGroupErrors.NotDeleteConst);
                }

                _context.Groups.Remove(entity!);
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