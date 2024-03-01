using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Cервис для работы с дожностями.
    /// </summary>
    public class UserRoleService : ILotusUserRoleService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserRoleService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserRoleService methods
        /// <inheritdoc/>
        public async Task<Response<UserRoleDto>> CreateAsync(UserRoleCreateRequest roleCreate, CancellationToken token)
        {
            var entity = roleCreate.Adapt<UserRole>();

            await _dataStorage.AddAsync(entity, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserRoleDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserRoleDto>> UpdateAsync(UserRoleDto roleUpdate, CancellationToken token)
        {
            var queryRoles = _dataStorage.Query<UserRole>();

            var entity = queryRoles.Include(x => x.Permissions)
                    .FirstOrDefault(x => x.Id == roleUpdate.Id);

            if (entity is not null)
            {
                roleUpdate.Adapt<UserRoleDto, UserRole>(entity);

                var queryPermissions = _dataStorage.Query<UserPermission>();

                var actualPermissions = queryPermissions
                    .Where(x => roleUpdate.PermissionIds.Contains(x.Id))
                    .ToArray();

                entity.Permissions.Clear();

                if (actualPermissions.Length > 0)
                {
                    foreach (var permission in actualPermissions)
                    {
                        entity.Permissions.Add(permission);
                    }
                }

                _dataStorage.Update(entity);
                await _dataStorage.SaveChangesAsync(token);

                var result = entity.Adapt<UserRoleDto>();

                return XResponse.Succeed(result);
            }

            return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
        }

        /// <inheritdoc/>
        public async Task<Response<UserRoleDto>> GetAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserRole, int>(id, token);

            if (entity == null)
            {
                return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
            }

            var result = entity.Adapt<UserRoleDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserRoleDto>> GetAllAsync(UserRolesRequest roleRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<UserRole>();

            query = query.Filter(roleRequest.Filtering);

            var queryOrder = query.Sort(roleRequest.Sorting, x => x.Id);

            var result = await queryOrder.ToResponsePageAsync<UserRole, UserRoleDto>(roleRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserRole, int>(id, token);

            if (entity == null)
            {
                return XResponse.Failed<UserRoleDto>(XUserRoleErrors.NotFound);
            }

            if (entity.Id < 4)
            {
                return XResponse.Failed(XUserRoleErrors.NotDeleteConst);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}