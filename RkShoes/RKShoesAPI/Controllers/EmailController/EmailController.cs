using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Services.Email;

namespace RKShoesAPI.Controllers.EmailController
{
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        [HttpGet("SendVerificationEmail")]
        public APIResult SendVerificationEmail(string userName, string email)
        {
            EmailService emailService = new EmailService();

            APIResult aPIResult = new APIResult();

            try
            {
                string result = emailService.VerifyEmail(userName, email);
                if (result != null)
                {
                    aPIResult.Result = result;
                    return aPIResult;
                }
                else
                {
                    // Return appropriate status code and error message when email sending fails
                    aPIResult.IsSuccess = false;
                    aPIResult.Errors = new List<Error> { new Error("Failed to send verification email. Please try again later.") };
                    return aPIResult;
                }
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                Console.WriteLine($"Error sSending verification email: {ex.Message}");
                aPIResult.IsSuccess = false;
                aPIResult.Errors = new List<Error> { new Error("An unexpected error occurred while sending verification email.") };
                return aPIResult;
            }
        }
    }
}
