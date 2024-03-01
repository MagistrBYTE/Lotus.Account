using Lotus.Repository;

namespace Lotus.Account
{
    /** \addtogroup AccountPosition
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с должностями.
    /// </summary>
    public interface ILotusUserPositionService
    {
        /// <summary>
        /// Создание должности по указанным данным.
        /// </summary>
        /// <param name="positionCreate">Параметры для создания должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        Task<Response<UserPositionDto>> CreateAsync(UserPositionCreateRequest positionCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанной должности.
        /// </summary>
        /// <param name="positionUpdate">Параметры обновляемой должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        Task<Response<UserPositionDto>> UpdateAsync(UserPositionDto positionUpdate, CancellationToken token);

        /// <summary>
        /// Получение указанной должности.
        /// </summary>
        /// <param name="id">Идентификатор должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Должность.</returns>
        Task<Response<UserPositionDto>> GetAsync(int id, CancellationToken token);

        /// <summary>
        /// Получение списка должностей.
        /// </summary>
        /// <param name="positionRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок должностей.</returns>
        Task<ResponsePage<UserPositionDto>> GetAllAsync(UserPositionsRequest positionRequest, CancellationToken token);

        /// <summary>
        /// Удаление должности.
        /// </summary>
        /// <param name="id">Идентификатор должности.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(int id, CancellationToken token);
    }
    /**@}*/
}