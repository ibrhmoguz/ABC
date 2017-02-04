using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WLC.Domain.Entities;
using WLC.Domain.Interface;

namespace WLC.UnitTest_Server
{
    public class RepoMockHelper
    {
        public static IWLCTanimRepo Initialize()
        {
            var mock = new Mock<IWLCTanimRepo>();
            mock.Setup(x => x.WLCTanimlar).Returns(new List<WLCTanim>() {
                new WLCTanim() { KULLANICI="Ibrahim", DONE=false, SERVERNAME="ibrahim.oguz", IL="ANKARA" }
            }.AsEnumerable());

            return mock.Object;
        }
    }
}
