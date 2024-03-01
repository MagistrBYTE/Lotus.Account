using Lotus.Core;
using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Cервис для работы с пользователями.
    /// </summary>
    public class UserService : ILotusUserService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserService methods
        /// <inheritdoc/>
        public async Task<Response<UserDto>> CreateAsync(UserCreateRequest userCreate, CancellationToken token)
        {
            var queryUser = _dataStorage.Query<User>();

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

            await _dataStorage.AddAsync(user, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = user.Adapt<UserDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserDto>> UpdateAsync(UserDto userUpdate, CancellationToken token)
        {
            var user = userUpdate.Adapt<User>();

            _dataStorage.Update(user);
            await _dataStorage.SaveChangesAsync(token);

            var result = user.Adapt<UserDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserDto>> GetAsync(Guid id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<User, Guid>(id, token);

            if (entity == null)
            {
                return XResponse.Failed<UserDto>(XUserErrors.UserNotFound);
            }

            var result = entity.Adapt<UserDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserDto>> GetAllAsync(UsersRequest userRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<User>();

            query = query.Filter(userRequest.Filtering);

            var queryOrder = query.Sort(userRequest.Sorting, x => x.Id);

            var result = await queryOrder.ToResponsePageAsync<User, UserDto>(userRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(Guid id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<User, Guid>(id, token);

            if (entity == null)
            {
                return XResponse.Failed<UserDto>(XUserErrors.UserNotFound);
            }

            if (entity.Id == XUserConstants.Admin.Id)
            {
                return XResponse.Failed<UserDto>(XUserErrors.NotDeleteConst);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}