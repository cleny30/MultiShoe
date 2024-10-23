using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.Account;
using RKShoesAPI.Services.Account;

namespace RKShoesAPI.Controllers.Account
{
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost("Login")]
        public APIResult Login([FromBody] LoginAccountModel userLogin)
        {
            AccountService accountService = new AccountService();
            APIResult aPIResult = new APIResult();
            ValidateResult validateResult = accountService.Validate(userLogin);
            if (!validateResult.IsValid)
            {
                aPIResult.SetValidateResult(validateResult);
                return aPIResult;
            }
            if (accountService.Login(userLogin))
            {
                aPIResult.Message = "Login success";
            }
            else
            {
                aPIResult.Message = "Login fail";
                aPIResult.IsSuccess = false;
            }
            return aPIResult;
        }
    }
}
