namespace Lotus.Account
{
    /** \addtogroup AccountPosition
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с должностями.
    /// </summary>
    public static class XUserPositionConstants
    {
        #region Fields
        /// <summary>
        /// Инспектор.
        /// </summary>
        public static readonly UserPosition Inspector = new()
        {
            Id = 1,
            Name = "Инспектор",
            DisplayName = "Инспектор",
        };

        /// <summary>
        /// Старший инспектор.
        /// </summary>
        public static readonly UserPosition ChiefInspector = new()
        {
            Id = 2,
            Name = "Старший инспектор",
            DisplayName = "Старший инспектор",
        };

        /// <summary>
        /// Ведущий специалист.
        /// </summary>
        public static readonly UserPosition LeadingSpecialist = new()
        {
            Id = 3,
            Name = "Ведущий специалист",
            DisplayName = "Ведущий специалист",
        };

        /// <summary>
        /// Начальник отдела.
        /// </summary>
        public static readonly UserPosition DepartmentHead = new()
        {
            Id = 4,
            Name = "Начальник отдела",
            DisplayName = "Начальник отдела",
        };
        #endregion
    }
    /**@}*/
}