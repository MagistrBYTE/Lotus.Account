using Lotus.Repository;

namespace Lotus.Account
{
    /** \addtogroup AccountGroup
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с группами.
    /// </summary>
    public interface ILotusUserGroupService
    {
        /// <summary>
        /// Создание группы по указанным данным.
        /// </summary>
        /// <param name="groupCreate">Параметры для создания группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        Task<Response<UserGroupDto>> CreateAsync(UserGroupCreateRequest groupCreate, CancellationToken token);

        /// <summary>
        /// Обновление данных указанной группы.
        /// </summary>
        /// <param name="groupUpdate">Параметры обновляемого группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        Task<Response<UserGroupDto>> UpdateAsync(UserGroupDto groupUpdate, CancellationToken token);

        /// <summary>
        /// Получение указанной группы.
        /// </summary>
        /// <param name="id">Идентификатор группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Группа.</returns>
        Task<Response<UserGroupDto>> GetAsync(int id, CancellationToken token);

        /// <summary>
        /// Получение списка групп.
        /// </summary>
        /// <param name="groupRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Cписок групп.</returns>
        Task<ResponsePage<UserGroupDto>> GetAllAsync(UserGroupsRequest groupRequest, CancellationToken token);

        /// <summary>
        /// Удаление группы.
        /// </summary>
        /// <param name="id">Идентификатор группы.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        Task<Response> DeleteAsync(int id, CancellationToken token);
    }
    /**@}*/
}