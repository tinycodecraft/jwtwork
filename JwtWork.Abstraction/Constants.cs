using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction
{
    public static class Constants
    {
        public enum QueryOpType
        {
            StartsWith,
            EndsWith,
            ContainsWith,
            LikesWith,
            NotEq,
            GreaterOrEq,
            LessOrEq,
            Less,
            InListOp,
            OrderBy,
            ThenBy,
        }
        public static class Status
        {
            public const string success = nameof(success);
            public const string failure = nameof(failure);  
        }
        public static class Session
        {
            public const string REFRESHTOKEN = nameof(REFRESHTOKEN);
            public const string USERID=nameof(USERID);
            
        }

        public static class Setting
        {
            public const string AuthSetting = nameof(AuthSetting);
            public const string PathSetting = nameof(PathSetting);
        }
    }
}
