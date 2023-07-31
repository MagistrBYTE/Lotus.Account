//=====================================================================================================================
// Проект: Модуль учетной записи пользователя
// Раздел: Подсистема работы с пользователем
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserService.cs
*		Cервис для работы с пользователями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Mapster;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Account
    {
        //-------------------------------------------------------------------------------------------------------------
        /** \addtogroup AccountUser
		*@{*/
        //-------------------------------------------------------------------------------------------------------------
        /// <summary>
        /// Cервис для работы с пользователями
        /// </summary>
        //-------------------------------------------------------------------------------------------------------------
        public class CUserService : ILotusUserService
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
            public CUserService(CAccountDbContext context)
            {
                _context = context;
            }
            #endregion

            #region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание пользователя по указанным данным
            /// </summary>
            /// <param name="userCreate">Параметры для создания/регистрации нового пользователя</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Пользователь</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CUserDto>> CreateAsync(CUserCreateDto userCreate, CancellationToken token)
            {
                var user = _context.Users.FirstOrDefault(x => x.Login == userCreate.Login);

                if (user is not null)
                {
                    return XResponse.Failed<CUserDto>(XUserErrors.LoginAlreadyUse);
                }

                // Создаем нового пользователя
                user = new CUser
                {
                    Login = userCreate.Login,
                    Email = userCreate.Email,
                    PasswordHash = XHashHelper.GetHash(userCreate.Password),
                    Name = userCreate.Name,
                    Surname = userCreate.Surname,
                    Patronymic = userCreate.Patronymic,
                    Role = XRoleConstants.User,
                    Post = XPositionConstants.Inspector
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync(token);

                CUserDto result = user.Adapt<CUserDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Обновление данных указанного пользователя
            /// </summary>
            /// <param name="userUpdate">Параметры обновляемого пользователя</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Пользователь</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response<CUserDto>> UpdateAsync(CUserDto userUpdate, CancellationToken token)
            {
                CUser user = userUpdate.Adapt<CUser>();

                _context.Users.Update(user);
                await _context.SaveChangesAsync(token);

                CUserDto result = user.Adapt<CUserDto>();

                return XResponse.Succeed(result);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение списка пользователей
            /// </summary>
            /// <param name="userRequest">Параметры получения списка</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Cписок пользователей</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<ResponsePage<CUserDto>> GetAllAsync(CPositionsDto userRequest, CancellationToken token)
            {
                var query = _context.Users.AsQueryable();

                query = query.Filter(userRequest.Filtering);

				var queryOrder = query.Sort(userRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<CUser, CUserDto>(userRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление пользователя
            /// </summary>
            /// <param name="id">Идентификатор пользователя</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Guid id, CancellationToken token)
            {
                CUser? user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (user == null)
                {
                    return XResponse.Failed(XUserErrors.UserNotFound);
                }

                _context.Users.Remove(user!);
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