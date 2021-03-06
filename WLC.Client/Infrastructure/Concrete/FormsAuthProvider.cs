﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using WLC.Client.Infrastructure.Abstract;

namespace WLC.Client.Infrastructure.Concrete
{
    public class FormsAuthProvider : IAuthProvider
    {
        public bool Authenticate(string username, string password)
        {
            //bool result = FormsAuthentication.Authenticate(username, password);
            //if (result)
            //{
            //    FormsAuthentication.SetAuthCookie(username, false);
            //}

            FormsAuthentication.SetAuthCookie(username, false);
            return true;
        }

        public void SignOut()
        {
            FormsAuthentication.SignOut();
        }
    }
}