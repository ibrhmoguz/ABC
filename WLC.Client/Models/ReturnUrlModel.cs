using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WLC.Client.Models
{
    public class ReturnUrlModel
    {
        private string url;

        public string NavUrl
        {
            get
            {
                if (this.url != string.Empty)
                    return this.url.Substring(1, this.url.Length - 1);
                else
                    return this.url;
            }
        }
        public ReturnUrlModel(string url)
        {
            this.url = url;
        }
    }
}