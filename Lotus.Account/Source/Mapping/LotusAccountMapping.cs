using Mapster;

namespace Lotus.Account
{
    /**
     * \defgroup AccountMapping Маппинг данных
     * \ingroup Account
     * \brief Маппинг данных.
     * @{
     */
    /// <summary>
    /// Статический класс для маппинга данных.
    /// </summary>
    public static class XMapping
    {
        public static void Init()
        {
            TypeAdapterConfig<UserRole, UserRoleDto>
                .NewConfig()
                .Map(x => x.PermissionIds, x => x.Permissions.Select(o => o.Id).ToArray());
        }
    }
    /**@}*/
}