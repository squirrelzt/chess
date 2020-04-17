var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth/user/list', function(req, res, next) {
  console.log("userlist--------");
  res.json({
    "data": [{
      "key": "1",
      "userid":"001",
      "cname":"测试",
      "username":"hutx",
      "sex": "1",
      "passwd":"123789",
      "mobile": "1",
      "email": "1",
      "administrator": "1",
      "inserter": "1",
      "insertertime": "1",
      "updater": "1",
      "updatertime": "1"
    }],
    "totalCount": 1,
    "pageSize": 10,
    "currentPage": 1
  })
});

router.post('/auth/user/queryUserPageInfo', function(req, res, next) {
  console.log("userlist--------");
  res.json({
    "data": [{
      "key": "1",
      "userid":"001",
      "cname":"测试",
      "username":"hutx",
      "sex": "1",
      "passwd":"123789",
      "mobile": "15001087916",
      "email": "hutx@jsfund.cn",
      "administrator": "1",
      "inserter": "1",
      "insertertime": "1",
      "updater": "1",
      "updatertime": "1"
    }],
    "totalCount": 1,
    "pageSize": 10,
    "currentPage": 1
  })
});
//添加用户信息
router.post('/auth/user/add', function(req, res, next) {
  console.log("useradd--------");
  console.log("req.param.userid: "+req.param('username'));
  //req.param('name')
  res.json({"result":"0","msg":'添加成功'});
});
//添加用户信息
router.post('/auth/user/update', function(req, res, next) {
  console.log("userupdate--------");
  console.log("req.param.userid: "+req.param('username'));
  //req.param('name')
  res.json({"result":"0","msg":'修改成功'});
});
//删除数据
router.post('/auth/user/delete', function(req, res, next) {
  console.log("delete--------");
  console.log("req.param.userid: "+req.param('userid'));
  //req.param('name')
  res.json({"result":"0","msg":'数据删除成功'});
});

module.exports = router;
