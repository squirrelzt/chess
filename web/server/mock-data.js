const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 查询表单
router.get('/bigshow/form/query', urlencodedParser, function(req, res, next) {
    console.log("------------------------------");
    res.json(
        [
            {
                "weekBillNo":[
                    "billOwnerCount",
                    "billType",
                    "billCount",
                    "billSumQuantity"
                ]
            }
        ]
        
    );
});
// 用户列表
router.get('/v1/users/c', urlencodedParser, function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "id": "20190526A01",
                "userName": "13112344321",
                "userIdUpper": "13112344321",
                "channelFromId": "XXXX渠道",
                "channelToId": "YYY渠道",
                "status": "正常",
                "phone": "13111111111",
                "balance": "200.00"
            },{
                "id": "20190526A02",
                "userName": "13112344321",
                "userIdUpper": "13112344321",
                "channelFromId": "XXXX渠道",
                "channelToId": "YYY渠道",
                "status": "正常",
                "phone": "13111111111",
                "balance": "200.00"
            },{
                "id": "20190526A03",
                "userName": "13112344321",
                "userIdUpper": "13112344321",
                "channelFromId": "XXXX渠道",
                "channelToId": "YYY渠道",
                "status": "正常",
                "phone": "13111111111",
                "balance": "200.00"
            },{
                "id": "20190526A04",
                "userName": "13112344321",
                "userIdUpper": "13112344321",
                "channelFromId": "XXXX渠道",
                "channelToId": "YYY渠道",
                "status": "正常",
                "phone": "13111111111",
                "balance": "200.00"
            },{
                "id": "20190526A05",
                "userName": "13112344321",
                "userIdUpper": "13112344321",
                "channelFromId": "XXXX渠道",
                "channelToId": "YYY渠道",
                "status": "异常",
                "phone": "13111111111",
                "balance": "200.00"
            }
        ]
    );
});

// 用户详情
router.post('/user/userinfo', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        {
            "userId": "20190526A01",
            "userName": "13112344321",
            "registerTime": "2019-05-19 19:24:59",
            "channel": "XXXX渠道",
            "url": "https:www.xxxx.com/xxx/xxx",
            "remark": "XXXXXXXXXXXX"
        }
    );
});

// 提现记录
router.post('/user/listDrawRecords', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "drawId": "0001",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0002",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0003",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0004",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});

// 收入记录
router.post('/user/listIncomeRecords', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "id": "0001",
                "incomeAmount": "200.00",
                "incomeType": "任务佣金",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0002",
                "incomeAmount": "100.00",
                "incomeType": "一级队员任务分佣",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0003",
                "incomeAmount": "98.00",
                "incomeType": "级队员任务分佣",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0004",
                "incomeAmount": "72.00",
                "incomeType": "任务佣金",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});

// 一级团队
router.post('/user/listTeam1', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "teamId": "0001",
                "userId": "2019053A01",
                "username": "13112345678"
            },{
                "teamId": "0002",
                "userId": "2019053A02",
                "username": "13112345678"
            },{
                "teamId": "0003",
                "userId": "2019053A03",
                "username": "13112345678"
            },{
                "teamId": "0004",
                "userId": "2019053A04",
                "username": "13112345678"
            }
        ]
        
    );
});

// 二级团队
router.post('/user/listTeam2', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "teamId": "0001",
                "userId": "2019053A01",
                "username": "13112345678"
            },{
                "teamId": "0002",
                "userId": "2019053A02",
                "username": "13112345678"
            },{
                "teamId": "0003",
                "userId": "2019053A03",
                "username": "13112345678"
            },{
                "teamId": "0004",
                "userId": "2019053A04",
                "username": "13112345678"
            }
        ]
        
    );
});

// 任务信息
router.post('/user/listJobs', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "jobListId": "0001",
                "jobId": "0001",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0002",
                "jobId": "0002",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0003",
                "jobId": "0003",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0004",
                "jobId": "0004",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});

// 渠道管理
router.get('/v1/user/123/channelfroms', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "id": "0001",
                "name": "亦跑新增注册人员",
                "balance": "100",
                "status": "已通过",
                "platformScale": "100",
                "remark": "2016-09-05 15:00",
                "isDeleted": "1",
                "createTime": "2019-06-17 10:00:00"
            }, {
                "id": "0002",
                "name": "亦跑新增注册人员",
                "balance": "亦跑新增注册人员",
                "status": "已通过",
                "platformScale": "100",
                "remark": "2016-09-05 15:00",
                "isDeleted": "1",
                "createTime": "2019-06-17 10:00:00"
            }, {
                "id": "0003",
                "name": "亦跑新增注册人员",
                "balance": "亦跑新增注册人员",
                "status": "已通过",
                "platformScale": "200",
                "remark": "222",
                "isDeleted": "1",
                "createTime": "2019-06-17 10:00:00"
            }
        ]
        
    );
});

// 渠道查询
router.post('/jobsource/listJobSourceChannels', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "jobSourceChannelId": "20190526A01",
                "jobSourceChannelName": "QQ空间",
                "state": "启用",
                "platformFee": "20%",
                "remark": "已通过"
            }, {
                "jobSourceChannelId": "20190526A09",
                "jobSourceChannelName": "微信朋友圈",
                "state": "启用",
                "platformFee": "20%",
                "remark": "已通过"
            }, {
                "jobSourceChannelId": "20190526A10",
                "jobSourceChannelName": "百度新闻",
                "state": "启用",
                "platformFee": "20%",
                "remark": "已通过"
            }, {
                "jobSourceChannelId": "20190526A11",
                "jobSourceChannelName": "今日头条",
                "state": "禁用",
                "platformFee": "20%",
                "remark": "已通过"
            }, {
                "jobSourceChannelId": "20190526A12",
                "jobSourceChannelName": "新浪微博",
                "state": "禁用",
                "platformFee": "20%",
                "remark": "已通过"
            }
        ]
        
    );
});
module.exports = router;