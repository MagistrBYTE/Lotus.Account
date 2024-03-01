using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Cервис для работы с дожностями.
    /// </summary>
    public class UserPermissionService : ILotusUserPermissionService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserPermissionService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserPermissionService methods
        /// <inheritdoc/>
        public async Task<Response<UserPermissionDto>> CreateAsync(UserPermissionCreateRequest permissionCreate, CancellationToken token)
        {
            var entity = permissionCreate.Adapt<UserPermission>();

            await _dataStorage.AddAsync(entity, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserPermissionDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserPermissionDto>> UpdateAsync(UserPermissionDto permissionUpdate, CancellationToken token)
        {
            var entity = permissionUpdate.Adapt<UserPermission>();

            _dataStorage.Update(entity);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserPermissionDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserPermissionDto>> GetAllAsync(UserPermissionsRequest permissionRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<UserPermission>();

            query = query.Filter(permissionRequest.Filtering);

            var queryOrder = query.Sort(permissionRequest.Sorting, x => x.Id);

            var result = await queryOrder.ToResponsePageAsync<UserPermission, UserPermissionDto>(permissionRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserPermission, int>(id, token);
            if (entity == null)
            {
                return XResponse.Failed(XUserPermissionErrors.NotFound);
            }

            if (entity.Id < 4)
            {
                return XResponse.Failed(XUserPermissionErrors.NotDeleteConst);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}