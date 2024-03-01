using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Cервис для работы с группами.
    /// </summary>
    public class UserGroupService : ILotusUserGroupService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserGroupService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserGroupService methods
        /// <inheritdoc/>
        public async Task<Response<UserGroupDto>> CreateAsync(UserGroupCreateRequest groupCreate, CancellationToken token)
        {
            var entity = groupCreate.Adapt<UserGroup>();

            await _dataStorage.AddAsync(entity, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserGroupDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserGroupDto>> UpdateAsync(UserGroupDto groupUpdate, CancellationToken token)
        {
            var entity = groupUpdate.Adapt<UserGroup>();

            _dataStorage.Update(entity);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserGroupDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserGroupDto>> GetAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserGroup, int>(id, token);
            if (entity == null)
            {
                return XResponse.Failed<UserGroupDto>(XUserGroupErrors.NotFound);
            }

            var result = entity.Adapt<UserGroupDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserGroupDto>> GetAllAsync(UserGroupsRequest groupRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<UserGroup>();

            query = query.Filter(groupRequest.Filtering);

            var queryOrder = query.Sort(groupRequest.Sorting, x => x.Id);

            var result = await queryOrder.ToResponsePageAsync<UserGroup, UserGroupDto>(groupRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserGroup, int>(id, token);
            if (entity == null)
            {
                return XResponse.Failed(XUserGroupErrors.NotFound);
            }

            if (entity.Id < 4)
            {
                return XResponse.Failed(XUserGroupErrors.NotDeleteConst);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}