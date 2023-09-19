using JwtWork.Abstraction.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;
using static JwtWork.Abstraction.Interfaces;

namespace JwtWork.UserDB
{
    public class JwtManager : IJwtManager
    {
        private readonly UserManager<IdentityUser> mgr;
        public JwtManager(UserManager<IdentityUser> itmgr)
        {
            mgr = itmgr;
        }



        public async Task<string> Register(string username, string password)
        {
            var result = await mgr.CreateAsync(new IdentityUser { UserName = username, Email = $"{username}@mail.com" }, password);
            //var user = await mgr.FindByNameAsync(username);
            //var emailtoken = await mgr.GenerateEmailConfirmationTokenAsync(user);
            //var confirmed = await mgr.ConfirmEmailAsync(user, emailtoken);
            if (result.Succeeded)
            {
                return "";
            }
            return  string.Join("\n", result.Errors.Select(e=> e.Description));
        }

        /// <summary>
        /// Please register the user with confirmemail token generated with created user
        /// </summary>
        /// <param name="username">user login</param>
        /// <param name="password">password for login</param>
        /// <returns></returns>
        public async Task<ILoginError?> Authenticate(string username, string password, string? newpassword=null)
        {
            var user = await mgr.FindByNameAsync(username);
            
            if (user == null)
            {
                return new LoginError { Error = $"{username} could not be found" };

            }

            var valid = await mgr.CheckPasswordAsync(user, password);



            if (!valid)
            {
                var token = await mgr.GeneratePasswordResetTokenAsync(user);
                var succeeded = await mgr.ResetPasswordAsync(user, token, "abc123");
                return new LoginError { Error = $"{username} does not match the password in DB, it's now reset to abc123", NeedNew = true };
            }
            else if (!string.IsNullOrEmpty(newpassword))
            {
                var result = await mgr.ChangePasswordAsync(user, password, newpassword);
                if (result.Succeeded)
                    return null;
                return new LoginError { Error = $"{username} could not change the password with error {string.Join("/n", result.Errors)}", NeedNew = false };
            }
            
            return null;
        }
    }
}
