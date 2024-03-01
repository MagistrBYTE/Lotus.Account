using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountPosition
	*@{*/
    /// <summary>
    /// Cервис для работы с должностями.
    /// </summary>
    public class UserPositionService : ILotusUserPositionService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public UserPositionService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusUserPositionService methods
        /// <inheritdoc/>
        public async Task<Response<UserPositionDto>> CreateAsync(UserPositionCreateRequest positionCreate, CancellationToken token)
        {
            var entity = positionCreate.Adapt<UserPosition>();

            await _dataStorage.AddAsync(entity, token);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserPositionDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserPositionDto>> UpdateAsync(UserPositionDto positionUpdate, CancellationToken token)
        {
            var entity = positionUpdate.Adapt<UserPosition>();

            _dataStorage.Update(entity);
            await _dataStorage.SaveChangesAsync(token);

            var result = entity.Adapt<UserPositionDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<Response<UserPositionDto>> GetAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserPosition, int>(id, token);
            if (entity == null)
            {
                return XResponse.Failed<UserPositionDto>(XUserPositionErrors.NotFound);
            }

            var result = entity.Adapt<UserPositionDto>();

            return XResponse.Succeed(result);
        }

        /// <inheritdoc/>
        public async Task<ResponsePage<UserPositionDto>> GetAllAsync(UserPositionsRequest positionRequest, CancellationToken token)
        {
            var query = _dataStorage.Query<UserPosition>();

            query = query.Filter(positionRequest.Filtering);

            var queryOrder = query.Sort(positionRequest.Sorting, x => x.Id);

            var result = await queryOrder.ToResponsePageAsync<UserPosition, UserPositionDto>(positionRequest, token);

            return result;
        }

        /// <inheritdoc/>
        public async Task<Response> DeleteAsync(int id, CancellationToken token)
        {
            var entity = await _dataStorage.GetByIdAsync<UserPosition, int>(id, token);
            if (entity == null)
            {
                return XResponse.Failed<UserPositionDto>(XUserPositionErrors.NotFound);
            }

            if (entity.Id < 4)
            {
                return XResponse.Failed(XUserPositionErrors.NotDeleteConst);
            }

            _dataStorage.Remove(entity!);
            await _dataStorage.SaveChangesAsync(token);

            return XResponse.Succeed();
        }
        #endregion
    }
    /**@}*/
}