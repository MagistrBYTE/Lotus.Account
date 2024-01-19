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
        public class UserService : ILotusUserService
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
            public UserService(ILotusRepository repository)
            {
                _repository = repository;
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
            public async Task<Response<UserDto>> CreateAsync(UserCreateRequest userCreate, CancellationToken token)
            {
				var queryUser = _repository.Query<User>();

				var user = queryUser.FirstOrDefault(x => x.Login == userCreate.Login);

                if (user is not null)
                {
                    return XResponse.Failed<UserDto>(XUserErrors.LoginAlreadyUse);
                }

                // Создаем нового пользователя
                user = new User
                {
                    Login = userCreate.Login,
                    Email = userCreate.Email,
                    PasswordHash = XHashHelper.GetHash(userCreate.Password),
                    Name = userCreate.Name,
                    Surname = userCreate.Surname,
                    Patronymic = userCreate.Patronymic,
                    Role = XUserRoleConstants.User,
                    Post = XUserPositionConstants.Inspector
                };

				await _repository.AddAsync(user);
                await _repository.FlushAsync(token);

                UserDto result = user.Adapt<UserDto>();

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
            public async Task<Response<UserDto>> UpdateAsync(UserDto userUpdate, CancellationToken token)
            {
                User user = userUpdate.Adapt<User>();

                _repository.Update(user);
                await _repository.FlushAsync(token);

                UserDto result = user.Adapt<UserDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение указанного пользователя
			/// </summary>
			/// <param name="id">Идентификатор пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<UserDto>> GetAsync(Guid id, CancellationToken token)
			{
				User? entity = await _repository.GetByIdAsync<User, Guid>(id, token);

				if (entity == null)
				{
					return XResponse.Failed<UserDto>(XUserErrors.UserNotFound);
				}

				UserDto result = entity.Adapt<UserDto>();

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
			public async Task<ResponsePage<UserDto>> GetAllAsync(UsersRequest userRequest, CancellationToken token)
            {
				var query = _repository.Query<User>();

                query = query.Filter(userRequest.Filtering);

				var queryOrder = query.Sort(userRequest.Sorting, x => x.Id);

				var result = await queryOrder.ToResponsePageAsync<User, UserDto>(userRequest, token);

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
				User? entity = await _repository.GetByIdAsync<User, Guid>(id, token);

				if (entity == null)
				{
					return XResponse.Failed<UserDto>(XUserErrors.UserNotFound);
				}

				if (entity.Id == XUserConstants.Admin.Id)
				{
					return XResponse.Failed<UserDto>(XUserErrors.NotDeleteConst);
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