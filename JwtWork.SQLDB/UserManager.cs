using JwtWork.Abstraction.Models;
using JwtWork.Abstraction.Tools;
using JwtWork.SQLDB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static JwtWork.Abstraction.Interfaces;

namespace JwtWork.SQLDB
{
    public class UserManager : IJwtManager
    {
        JWTWORKContext db;
        ILogger<IJwtManager> logger;
        public UserManager(JWTWORKContext itdb,ILogger<IJwtManager> log) { 

            db = itdb;
            logger = log;
        }

        public async Task<bool> HasUser()
        {
            try
            {

                return await db.UserTB.AnyAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return false;
            }
            
        }

        public async Task<ILoginError?> Authenticate(string username, string password, string? newpassword = null)
        {
            var scm = new StringEncrypService();
            var err = new LoginError { Error = $"User {username} could not be found" };
            try
            {
                var founduser = await db.UserTB.FirstOrDefaultAsync(e => e.UserName == username || e.UserId == username);
                if (founduser == null)
                    return (ILoginError?)err;

                if (founduser.EncPassword == scm.EncryptString(password))
                {
                    return null;
                }
                founduser.EncPassword = scm.EncryptString("abc123");
                db.Entry(founduser).State = EntityState.Modified;
                await db.SaveChangesAsync();

                err.Error=$"User {username} is reset to password abc123! Please give new password to reset first!";
                err.NeedNew = true;
                return err;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return new LoginError { Error = ex.Message };

            }



            
        }

        public async Task<string> Register(string username, string password)
        {
            var scm = new StringEncrypService();

            var founduser =await db.UserTB.FirstOrDefaultAsync(e => e.UserName == username);
            if (founduser != null)
            {
                return $"{founduser.UserId} is found with {founduser.UserName}. Please select another user name for register!";
            }
            try
            {
                var userid = UtilExtensions.RandomString(username);

                var newuser = new UserTB { UserId=userid, UserName = username, EncPassword = scm.EncryptString(password), Post=username, UpdatedAt = DateTime.Now, UpdatedBy = "SYSTEM" };
                db.UserTB.Add(newuser);
                db.Entry(newuser).State = Microsoft.EntityFrameworkCore.EntityState.Added;
                await db.SaveChangesAsync();

                return "";
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return ex.Message;
            }
            
        }
    }
}
