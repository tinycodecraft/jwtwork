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
            LikesWith,
            NotEq,
            GreaterOrEq,
            LessOrEq,
            Less,
            InListOp,
            OrderBy,
            ThenBy,
        }

        public static class Setting
        {
            public const string AuthSetting = nameof(AuthSetting);
            public const string PathSetting = nameof(PathSetting);
        }
    }
}
