var express = require('express');
var router = express.Router();

//登录
router.post('/login', function(req, res, next) {
  var user_name = req.body['user_name'];
  var user_pwd = req.body['user_pwd'];
  // console.log(user_name);
  // console.log(user_pwd);
  res.json(
    {
        "result":"0",
        "data":{
            "user_name":"abc",
            "role_name":"管理员",
            "access_token":"1_455a841ae49f0d71957af16e6ea5ab0f"
        }
    }
  );
  //登录失败
  // res.json(
  //   {
  //       "result":"1",
  //       "msg":"用户名或密码错误！"
  //   }
  // );
});
//退出
router.post('/logout', function(req, res, next) {
  var access_token = req.body['access_token'];
  // console.log(access_token);
  res.json(
    {
        "result":"0",
        "msg":""
    }
  );
});
//修改密码
router.post('/updatePwd', function(req, res, next) {
  var access_token = req.body['access_token'];
  var passwd = req.body['passwd'];
  var newpasswd = req.body['newpasswd'];
  // console.log(access_token);
  // console.log(passwd);
  // console.log(newpasswd);
  res.json(
    {
        "result":"0",
        "msg":""
    }
  );

});

//HiSolution产品管理
router.get('/solutionprods', function(req, res, next) {
  var solutionid = req.body['solutionid'];
  // console.log(solutionid);
  res.json(
    {
        "result":"0",
        "solutionprods":[
            {
                "solutionid":"ALI01",
                "solutionname":"阿里专项投资",
                "status":"0",
                "setupdate":"20160410",
                "accumulationRoR":"60%",
                "AnnualizedROR":"20%",
                "setupdays":"100",
                "firstinsert":"20160401",
                "solutioninfo":"确认调仓",
                "executestate":"审核中",
                "solutiontype":"主动调仓",
                "updateman":"张吉华"
            },{
                "solutionid":"H001",
                "solutionname":"安逸理财组合",
                "status":"1",
                "setupdate":"20150710",
                "accumulationRoR":"80%",
                "AnnualizedROR":"10%",
                "setupdays":"900",
                "firstinsert":"20150709",
                "solutioninfo":"确认调仓",
                "executestate":"审核中",
                "solutiontype":"日常动平衡",
                "updateman":"楼放"
            },{
                "solutionid":"H002",
                "solutionname":"从容稳进组合",
                "status":"2",
                "setupdate":"20150810",
                "accumulationRoR":"200%",
                "AnnualizedROR":"50%",
                "setupdays":"900",
                "firstinsert":"20150809",
                "solutioninfo":"确认调仓",
                "executestate":"审核中",
                "solutiontype":"主动调仓",
                "updateman":"王智强"
            },{
                "solutionid":"H003",
                "solutionname":"锐意进取组合",
                "status":"2",
                "setupdate":"20150910",
                "accumulationRoR":"500%",
                "AnnualizedROR":"90%",
                "setupdays":"900",
                "firstinsert":"20150909",
                "solutioninfo":"确认调仓",
                "executestate":"审核中",
                "solutiontype":"主动调仓",
                "updateman":"王智强"
              },{
                "solutionid":"H004",
                "solutionname":"避风港",
                "status":"1",
                "setupdate":"20140910",
                "accumulationRoR":"100%",
                "AnnualizedROR":"30%",
                "setupdays":"1200",
                "firstinsert":"20140909",
                "solutioninfo":"确认调仓",
                "executestate":"审核中",
                "solutiontype":"主动调仓",
                "updateman":"王智强"
            }
        ]
      }
    );

});
//查询客户合约
router.get('/contracts', function(req, res, next) {
  res.json(
    {
    "result":"0",
    "pageInfo":{
        "pageNum":2,
        "pageSize":2,
        "size":2,
        "orderBy":"CONTRACTDATE desc",
        "startRow":3,
        "endRow":4,
        "total":4,
        "pages":2,
        "list":[
            {
                "totaloutflows":0,
                "totalinflows":50000,
                "status":"0",
                "contractid":"207150000374014",
                "ROW_ID":3,
                "currguarantbala":50000
            },
            {
                "totaloutflows":null,
                "totalinflows":null,
                "status":"0",
                "contractid":"207150000373904",
                "ROW_ID":4,
                "currguarantbala":null
            }
        ],
        "firstPage":1,
        "prePage":1,
        "nextPage":0,
        "lastPage":2,
        "isFirstPage":false,
        "isLastPage":true,
        "hasPreviousPage":true,
        "hasNextPage":false,
        "navigatePages":8,
        "navigatepageNums":[
            1,
            2
        ]
      }
    }
  );
});
//查询客户合约详情
router.get('/contracts/detail', function(req, res, next) {
  res.json(
        {
            "result":"0",
            "solutionid":"H0001",
            "solutionname":"安逸理财",
            "contractid":"207150000374108",
            "fundacco":"071A00118511",
            "tradeacco":"888600003111",
            "requestdate":1445270400000,
            "status":"0",
            "netcode":"8886",
            "totalinflows":100000,
            "totaloutflows":50000,
        }

    );
});
//查询组合产品配置
router.get('/solutionfunds', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "fundlist":[
            {
                "fundcode":"070030",
                "fundname":"嘉实中创400联接",
                "ini_percent":"25%",
                "hold_percent":"25%",
                "isvalid":"是",
                "middleflag":"否",
                "assetclass":"指数型",
                "targetpercent":""
            },{
                "fundcode":"160706",
                "fundname":"嘉实300",
                "inipercent":"10%",
                "holdpercent":"20%",
                "isvalid":"是",
                "middleflag":"否",
                "assetclass":"指数型",
                "targetpercent":""
            },{
                "fundcode":"001616",
                "fundname":"嘉实环保低碳",
                "inipercent":"30%",
                "holdpercent":"50%",
                "isvalid":"是",
                "middleflag":"否",
                "assetclass":"股票型",
                "targetpercent":""
            }
        ]
      }
    );
});
//Test 查询solutionid
router.get('/solutionids', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "solutionids":[
            {
                "solutionid":"0",
                "solutionname":"全部"
            },
            {
                "solutionid":"ALI01",
                "solutionname":"阿里专项投资"
            },
            {
                "solutionid":"H0001",
                "solutionname":"安逸理财组合"
            },
            {
                "solutionid":"H0002",
                "solutionname":"从容稳进组合"
            },
            {
                "solutionid":"H0003",
                "solutionname":"锐意进取组合"
            },
            {
                "solutionid":"H0004",
                "solutionname":"避风港"
            },
            {
                "solutionid":"H0021",
                "solutionname":"asfdasdf"
            },
            {
                "solutionid":"H0045",
                "solutionname":"fffaaa"
            },
            {
                "solutionid":"H00P1",
                "solutionname":"测试场内"
            },
            {
                "solutionid":"M0001",
                "solutionname":"微账户-全自主"
            },
            {
                "solutionid":"M0002",
                "solutionname":"微账户-半自主"
            },
            {
                "solutionid":"M0003",
                "solutionname":"微账户-全委托"
            },
            {
                "solutionid":"M0023",
                "solutionname":"asdf"
            }
        ]
    }
  );
});
//查询调仓任务确认情况
router.get('/schedulertasks', function(req, res, next) {
  // res.json(
  //   {
  //   "result":"0",
  //   "data":[
  //       {
  //           "id":6854,
  //           "solutionid":"H0001",
  //           "taskType":"0",
  //           "taskSubtype":"0",
  //           "taskStatus":"2",
  //           "taskPrior":0,
  //           "currTaskStep":"执行成功",
  //           "firstinsert":1448380800000,
  //           "executetime":1448380800000,
  //           "lastmodify":1448380800000,
  //           "transdate":1448380800000,
  //           "insertman":"system",
  //           "updateman":"管理员",
  //           "memo":"using multiplier:2"
  //       },
  //       {
  //           "id":6848,
  //           "solutionid":"H0002",
  //           "taskType":"0",
  //           "taskSubtype":"0",
  //           "taskStatus":"2",
  //           "taskPrior":0,
  //           "currTaskStep":"正在执行",
  //           "firstinsert":1448380800000,
  //           "executetime":1448380800000,
  //           "lastmodify":1448380800000,
  //           "transdate":1448380800000,
  //           "insertman":"system",
  //           "updateman":"测试员",
  //           "memo":"测试"
  //       }
  //   ]
  // }
  //   );
  res.json(
    {
    "result":"0",
    "pageInfo":{
        "pageNum":2,
        "pageSize":2,
        "size":2,
        "orderBy":"transdate desc, id desc",
        "startRow":3,
        "endRow":4,
        "total":129,
        "pages":65,
        "list":[
            {
                "id":6854,
                "solutionid":"H0001",
                "taskType":"0",
                "taskSubtype":"0",
                "taskStatus":"2",
                "taskPrior":0,
                "currTaskStep":"执行成功",
                "firstinsert":1448380800000,
                "executetime":1448380800000,
                "lastmodify":1448380800000,
                "transdate":1448380800000,
                "insertman":"system",
                "updateman":null,
                "memo":"using multiplier:2"
            },
            {
                "id":6848,
                "solutionid":"H0002",
                "taskType":"0",
                "taskSubtype":"0",
                "taskStatus":"2",
                "taskPrior":0,
                "currTaskStep":"执行成功",
                "firstinsert":1448380800000,
                "executetime":1448380800000,
                "lastmodify":1448380800000,
                "transdate":1448380800000,
                "insertman":"system",
                "updateman":null,
                "memo":"using multiplier:2"
            }
        ],
        "firstPage":1,
        "prePage":1,
        "nextPage":3,
        "lastPage":8,
        "isFirstPage":false,
        "isLastPage":false,
        "hasPreviousPage":true,
        "hasNextPage":true,
        "navigatePages":8,
        "navigatepageNums":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ]
    }
  }
  );
});
//创建组合
router.post('/solutionprods/create', function(req, res, next) {
  var solutionid = req.body['solutionid'];//组合编号
  var solutionname = req.body['solutionname'];//组合名
  var fullname = req.body['fullname'];//组合全称
  var acct_charge_method = req.body['acct_charge_method'];//扣费方式（扣份额、扣金额）
  var acc_charge_day = req.body['acc_charge_day'];//管理费扣费日
  var acct_charge_mode = req.body['acct_charge_mode'];//收费模式 0：按固定金额 1：按固定比率 默认：1
  var acct_charge_period = req.body['acct_charge_period'];//扣费频率
  console.log("solutionid\t"+solutionid);
  console.log("solutionname\t"+solutionname);
  console.log("fullname\t"+fullname);
  console.log("acct_charge_method\t"+acct_charge_method);
  console.log("acc_charge_day\t"+acc_charge_day);
  console.log("acct_charge_mode\t"+acct_charge_mode);
  console.log("acct_charge_period\t"+acct_charge_period);
  res.json(
    {
        "result":"0",
        "msg":""
    }
  );
});
//更新组合
router.post('/solutionprods/update', function(req, res, next) {
  var solutionid = req.body['solutionid'];//组合编号
  var solutionname = req.body['solutionname'];//组合名
  var fullname = req.body['fullname'];//组合全称
  var acct_charge_method = req.body['acct_charge_method'];//扣费方式（扣份额、扣金额）
  var acc_charge_day = req.body['acc_charge_day'];//管理费扣费日
  var acct_charge_mode = req.body['acct_charge_mode'];//收费模式 0：按固定金额 1：按固定比率 默认：1
  var acct_charge_period = req.body['acct_charge_period'];//扣费频率
  console.log("solutionid\t"+solutionid);
  console.log("solutionname\t"+solutionname);
  console.log("fullname\t"+fullname);
  console.log("acct_charge_method\t"+acct_charge_method);
  console.log("acc_charge_day\t"+acc_charge_day);
  console.log("acct_charge_mode\t"+acct_charge_mode);
  console.log("acct_charge_period\t"+acct_charge_period);
  res.json(
    {
        "result":"0",
        "msg":""
    }
  );
});
//Test 数据字典管理查询
router.get('/datadictionary', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "data":[
            {
                "dataclass":"acct_charge_method",
                "dataclassname":"账户管理费类型",
                "dicdatavalue":"0",
                "diccontent":"扣份额"
            },
            {
                "dataclass":"alloc_type",
                "dataclassname":"资产分配类型",
                "dicdatavalue":"1",
                "diccontent":"按现有资产的比例"
            },
            {
                "dataclass":"business",
                "dataclassname":"交易类型",
                "dicdatavalue":"2",
                "diccontent":"基金转换入"
            }
        ]
    }
  );
});
//Test 基金代码和基金名查询
router.get('/fundquery', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "data":[
            {
                "fundcode":"070030",
                "fundname":"嘉实中创400联接"
            },
            {
                "fundcode":"160706",
                "fundname":"嘉实300"
            },
            {
                "fundcode":"160716",
                "fundname":"嘉实基本面50指数"
            },
            {
                "fundcode":"160720",
                "fundname":"嘉实中证中期企业债"
            },
            {
                "fundcode":"160721",
                "fundname":"嘉实中证中期企业债A"
            },
            {
                "fundcode":"070002",
                "fundname":"嘉实成长"
            },
            {
                "fundcode":"070006",
                "fundname":"嘉实服务"
            },
            {
                "fundcode":"070010",
                "fundname":"嘉实主题精选"
            },
            {
                "fundcode":"070011",
                "fundname":"嘉实策略增长"
            },
            {
                "fundcode":"070022",
                "fundname":"嘉实领先成长股票"
            },
            {
                "fundcode":"070099",
                "fundname":"嘉实优质"
            },
            {
                "fundcode":"070008",
                "fundname":"嘉实货币A"
            },
            {
                "fundcode":"070028",
                "fundname":"嘉实安心A"
            }
        ]
    }
  );
});
//查询全部基金
router.get('/fund', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "data":[
            {
                "fundcode":"070013",
                "fundname":"嘉实研究精选",
                "fundnav":"2.054",
                "allnav":"3.442",
                "todaygains":"0.24%",
                "yeargains":"-12.49%",
                "allgains":"82.02%"
            },{
                "fundcode":"070002",
                "fundname":"嘉实增长混合",
                "fundnav":"9.924",
                "allnav":"10.565",
                "todaygains":"0.22%",
                "yeargains":"-1.10%",
                "allgains":"97.63%"
            },{
                "fundcode":"070027",
                "fundname":"嘉实研究精选",
                "fundnav":"1.972",
                "allnav":"2.034",
                "todaygains":"2.4%",
                "yeargains":"5.6%",
                "allgains":"23.45%"
            },{
                "fundcode":"001637",
                "fundname":"嘉实腾讯自选股大数据策略股票",
                "fundnav":"1.079",
                "allnav":"1.079",
                "todaygains":"0.28%",
                "yeargains":"7.36%",
                "allgains":"7.36%"
            },{
                "fundcode":"001616",
                "fundname":"嘉实环保低碳股票",
                "fundnav":"1.208",
                "allnav":"1.208",
                "todaygains":"0.08%",
                "yeargains":"20.8%",
                "allgains":"20.8%"
            },{
                "fundcode":"002168",
                "fundname":"嘉实智能汽车股票",
                "fundnav":"1.225",
                "allnav":"1.225",
                "todaygains":"0.33%",
                "yeargains":"22.5%",
                "allgains":"22.5%"
            },{
                "fundcode":"001577",
                "fundname":"嘉实低价策略股票",
                "fundnav":"0.939",
                "allnav":"0.939",
                "todaygains":"0.11%",
                "yeargains":"-9.71%",
                "allgains":"-6.1%"
            },{
                "fundcode":"070030",
                "fundname":"嘉实中创400联接",
                "fundnav":"9.4",
                "allnav":"9.9",
                "todaygains":"2.7%",
                "yeargains":"6.3%",
                "allgains":"9.6%"
            },{
                "fundcode":"160706",
                "fundname":"嘉实300",
                "fundnav":"2.1",
                "allnav":"2.9",
                "todaygains":"1.7%",
                "yeargains":"2.3%",
                "allgains":"2.8%"
            },{
                "fundcode":"160716",
                "fundname":"嘉实基本面50指数",
                "fundnav":"3.6",
                "allnav":"4.5",
                "todaygains":"1.7%",
                "yeargains":"8.3%",
                "allgains":"7.6%"
            },{
                "fundcode":"160720",
                "fundname":"嘉实中证中期企业债",
                "fundnav":"6.4",
                "allnav":"7.2",
                "todaygains":"16%",
                "yeargains":"60%",
                "allgains":"96%"
            },{
                "fundcode":"160721",
                "fundname":"嘉实中证中期企业债A",
                "fundnav":"5.2",
                "allnav":"6.1",
                "todaygains":"16%",
                "yeargains":"25%",
                "allgains":"36%"
            }
        ]
    }
  );
});
//Test uploadfile
router.post('/uploadfile', function(req, res, next) {
  var name = req.body['name'];
  console.log(req);
  console.log(name);
  res.json(
    {
        "result":"0",
        "data":{
            "filename":"test2016"
        }
    }
  );
});
//用户查询
router.get('/user', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "data":[
            {
                "id":"1",
                "cname":"admin",
                "username":"管理员",
                "group":"1",
                "remark":""
            },
            {
              "id":"2",
              "cname":"test1",
              "username":"test1",
              "group":"2",
              "remark":""
            },
            {
              "id":"3",
              "cname":"test2",
              "username":"test2",
              "group":"2",
              "remark":""
            }
        ]
    }
  );
});
//累计收益率查询
router.get('/total_profit', function(req, res, next) {
  res.json(
    {
        "result":"0",
        "data":[
            {
                "cpu_num":36,
                "cpu_used":0.396,
                "cpu_used_pct":1.1,
                "timestamp":1469427480246
            },{
                "cpu_num":36,
                "cpu_used":2.312,
                "cpu_used_pct":6.42,
                "timestamp":1469427485243
            },{
                "cpu_num":36,
                "cpu_used":0.924,
                "cpu_used_pct":2.57,
                "timestamp":1469427490264
            },{
                "cpu_num":36,
                "cpu_used":0.676,
                "cpu_used_pct":1.88,
                "timestamp":1469427495247
            },{
                "cpu_num":36,
                "cpu_used":0.488,
                "cpu_used_pct":1.36,
                "timestamp":1469427500248
            },{
                "cpu_num":36,
                "cpu_used":0.452,
                "cpu_used_pct":1.26,
                "timestamp":1469427505242
            }
        ]
    }
  );
});
//客户历史资产查询
router.get('/assetshis', function(req, res, next) {
  res.json(
    {
    "result"           : "0",
    "pageInfo"         : {
        "pageNum"          : 1,
        "pageSize"         : 10,
        "size"             : 10,
        "orderBy"          : null,
        "startRow"         : 1,
        "endRow"           : 10,
        "total"            : 25,
        "pages"            : 3,
        "list"             : [
            {
                "POSITION_STAT"    : "0",
                "PAYSTATDESC"      : null,
                "TOTALINFLOWS"     : null,
                "REBAL_FLAG"       : "0",
                "CTSERIALNO"       : 31725,
                "PAYFAILS"         : null,
                "contractid"       : "207150000374060",
                "TARGET_RISK"      : null,
                "RISK_LIMIT"       : null,
                "PAYSTAT"          : null,
                "currguarantbala"  : null,
                "TARGET_NORISK"    : null,
                "POSITIONSTATDESC" : "无主动调仓或者完毕",
                "REBALFLAGDESC"    : "正常动平衡",
                "upddate"          : 1448467200000,
                "FREEZE_CAUSE"     : null,
                "solutionid"       : "H0001",
                "IMPLI_MULTIPLIER" : 2,
                "FREEZE_DATE"      : null,
                "TRANSFLAGDESC"    : "不调整",
                "PROFITPER"        : null,
                "MATURITYDAY"      : 1825,
                "solutionname"     : "安逸理财组合",
                "MEM"              : null,
                "HW_ASSETVALUE"    : null,
                "TRANSFLAG"        : "0",
                "TRANSBALA"        : null,
                "MULTIDELTA"       : null,
                "CURRRFLOOR"       : null,
                "FREEZECAUSEDESC"  : null,
                "TOTALPAYFAILS"    : null,
                "MULTIACC_INFLOW"  : null,
                "REDEEM_STAT"      : "0",
                "MULTIACC_OUTFLOW" : null,
                "REDEEMSTATDESC"   : "无赎回或者完毕",
                "TOTALOUTFLOWS"    : null,
                "ROW_ID"           : 1,
                "NORISKVALUE"      : 1001.89,
                "REDEEM_BALA"      : null,
                "MULTIACC_HISHOLD" : null,
                "RISKVALUE"        : 0,
                "DIS_RATE"         : 0.0354
            },
            {
                "POSITION_STAT"    : "0",
                "PAYSTATDESC"      : null,
                "TOTALINFLOWS"     : null,
                "REBAL_FLAG"       : "0",
                "CTSERIALNO"       : 31725,
                "PAYFAILS"         : null,
                "contractid"       : "207150000374060",
                "TARGET_RISK"      : null,
                "RISK_LIMIT"       : null,
                "PAYSTAT"          : null,
                "currguarantbala"  : null,
                "TARGET_NORISK"    : null,
                "POSITIONSTATDESC" : "无主动调仓或者完毕",
                "REBALFLAGDESC"    : "正常动平衡",
                "upddate"          : 1448380800000,
                "FREEZE_CAUSE"     : null,
                "solutionid"       : "H0001",
                "IMPLI_MULTIPLIER" : 2,
                "FREEZE_DATE"      : null,
                "TRANSFLAGDESC"    : "不调整",
                "PROFITPER"        : null,
                "MATURITYDAY"      : 1825,
                "solutionname"     : "安逸理财组合",
                "MEM"              : null,
                "HW_ASSETVALUE"    : null,
                "TRANSFLAG"        : "0",
                "TRANSBALA"        : null,
                "MULTIDELTA"       : null,
                "CURRRFLOOR"       : null,
                "FREEZECAUSEDESC"  : null,
                "TOTALPAYFAILS"    : null,
                "MULTIACC_INFLOW"  : null,
                "REDEEM_STAT"      : "0",
                "MULTIACC_OUTFLOW" : null,
                "REDEEMSTATDESC"   : "无赎回或者完毕",
                "TOTALOUTFLOWS"    : null,
                "ROW_ID"           : 2,
                "NORISKVALUE"      : 1001.89,
                "REDEEM_BALA"      : null,
                "MULTIACC_HISHOLD" : null,
                "RISKVALUE"        : 0,
                "DIS_RATE"         : 0.0354
            }
        ],
        "firstPage"        : 1,
        "prePage"          : 0,
        "nextPage"         : 2,
        "lastPage"         : 3,
        "isFirstPage"      : true,
        "isLastPage"       : false,
        "hasPreviousPage"  : false,
        "hasNextPage"      : true,
        "navigatePages"    : 8,
        "navigatepageNums" : [
            1,
            2,
            3
        ]
    }
}
  );
});
//
router.get('/totalnav', function(req, res, next) {
  // var now = new Date();
  // console.log("---------------------");
  // console.log(now.getSeconds());
  // res.json(
  //   {
  //       "result":"0",
  //       "data":[
  //           {
  //             "dates":"201-07-01",
  //             "percent":5
  //           },{
  //             "dates":"2016-07-04",
  //             "percent":10
  //           },{
  //             "dates":"2016-07-05",
  //             "percent":20
  //           },{
  //             "dates":"2016-07-06",
  //             "percent":40
  //           },{
  //             "dates":"2016-07-07",
  //             "percent":30
  //           },{
  //             "dates":"2016-07-08",
  //             "percent":70
  //           },{
  //             "dates":"2016-07-09",
  //             "percent":60
  //           }
  //       ]
  //   }
  // );

  var arr = ["1","2","3","4","5","6","7"];
  var index = Math.floor((Math.random()*arr.length));
  // console.log(arr[index]);
  switch (arr[index]) {
    case "1":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-07-01",
                "percent":5
              },{
                "dates":"2016-07-04",
                "percent":10
              },{
                "dates":"2016-07-05",
                "percent":20
              },{
                "dates":"2016-07-06",
                "percent":40
              },{
                "dates":"2016-07-07",
                "percent":30
              },{
                "dates":"2016-07-08",
                "percent":70
              },{
                "dates":"2016-07-09",
                "percent":60
              }
          ]
      }
    );
      break;
    case "2":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-07-12",
                "percent":3
              },{
                "dates":"2016-07-13",
                "percent":14
              },{
                "dates":"2016-07-14",
                "percent":35
              },{
                "dates":"2016-07-15",
                "percent":9
              },{
                "dates":"2016-07-18",
                "percent":60
              },{
                "dates":"2016-07-19",
                "percent":32
              },{
                "dates":"2016-07-20",
                "percent":40
              }
          ]
      }
  );
      break;
    case "3":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-07-21",
                "percent":70
              },{
                "dates":"2016-07-22",
                "percent":50
              },{
                "dates":"2016-07-25",
                "percent":30
              },{
                "dates":"2016-07-26",
                "percent":60
              },{
                "dates":"2016-07-27",
                "percent":20
              },{
                "dates":"2016-07-28",
                "percent":15
              },{
                "dates":"2016-07-29",
                "percent":45
              }
          ]
      }
    );
      break;
    case "4":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-06-01",
                "percent":5
              },{
                "dates":"2016-06-02",
                "percent":15
              },{
                "dates":"2016-06-03",
                "percent":18
              },{
                "dates":"2016-06-06",
                "percent":7
              },{
                "dates":"2016-06-07",
                "percent":12
              },{
                "dates":"2016-06-08",
                "percent":28
              },{
                "dates":"2016-06-09",
                "percent":35
              }
          ]
      }
    );
      break;
    case "5":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-06-01",
                "percent":5
              },{
                "dates":"2016-06-02",
                "percent":15
              },{
                "dates":"2016-06-03",
                "percent":18
              },{
                "dates":"2016-06-06",
                "percent":7
              },{
                "dates":"2016-06-07",
                "percent":12
              },{
                "dates":"2016-06-08",
                "percent":28
              },{
                "dates":"2016-06-09",
                "percent":35
              }
          ]
      }
    );
      break;
    case "6":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-06-10",
                "percent":36
              },{
                "dates":"2016-06-13",
                "percent":45
              },{
                "dates":"2016-06-14",
                "percent":22
              },{
                "dates":"2016-06-15",
                "percent":10
              },{
                "dates":"2016-06-16",
                "percent":5
              },{
                "dates":"2016-06-17",
                "percent":20
              },{
                "dates":"2016-06-20",
                "percent":25
              }
          ]
      }
    );
      break;
    case "7":
    res.json(
      {
          "result":"0",
          "data":[
              {
                "dates":"201-06-21",
                "percent":15
              },{
                "dates":"2016-06-22",
                "percent":18
              },{
                "dates":"2016-06-23",
                "percent":33
              },{
                "dates":"2016-06-24",
                "percent":17
              },{
                "dates":"2016-06-25",
                "percent":8
              },{
                "dates":"2016-06-26",
                "percent":40
              },{
                "dates":"2016-06-27",
                "percent":30
              }
          ]
      }
    );
      break;
    default:

  }

});
module.exports = router;
