using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models.Pages.Account;
using RKShoesAPI.Models;
using RKShoesAPI.Services.Account;

namespace RKShoesAPI.Controllers.Account
{
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        [HttpGet("VerifyAccount")]
        public APIResult VerifyAccount(string userName, string email)
        {
            AccountService accountService = new AccountService();
            APIResult aPIResult = new APIResult();
            var list = accountService.VerifyAccount(userName, email);
            aPIResult.Result = list;
            aPIResult.IsSuccess = (list != null && list.Count > 0) ? false : true;

            return aPIResult;
        }

        [HttpPost("Register")]
        public APIResult Register([FromBody] AccountModel account)
        {
            AccountService accountService = new AccountService();
            APIResult aPIResult = new APIResult();
            aPIResult.IsSuccess = accountService.Regist(account);
            return aPIResult;
        }
    }
}
