namespace RKShoesAPI.Core.Net
{
    /// <summary>
    /// AppHttpContext
    /// </summary>
    public static class AppHttpContext
    {
        #region argument

        /// <summary>
        /// IHttpContextAccessor
        /// </summary>
        private static IHttpContextAccessor? _httpContextAccessor;

        #endregion v

        #region property

        /// <summary>
        /// HttpContext
        /// </summary>
        public static HttpContext? Current
        {
            get
            {
                return _httpContextAccessor?.HttpContext;
            }
        }

        #endregion property

        #region public method

        /// <summary>
        /// HttpContext config
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion puclic method
    }

}
