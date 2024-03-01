using Lotus.Web;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiController
    *@{*/
    /// <summary>
    /// Контролёр для работы с пользователями.
    /// </summary>
    public class UserController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusUserService _userService;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="userService">Интерфейс сервиса для работы с пользователем.</param>
        public UserController(ILotusUserService userService)
        {
            _userService = userService;
        }
        #endregion
    }
    /**@}*/
}