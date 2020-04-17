var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth/role/list', function(req, res, next) {
  console.log("rolelist--------");
  res.json({
    "data": [{
      "key": "1",
      "roleID":"001",
      "rolename":"超级管理员",
      "describe":"拥有所有权限",
      "seq": "000001",
      "inserter":"tomcat",
      "inserterTime": "2016-02-20",
      "updater": "apache",
      "updaterTime": "2016-02-24"
    }],
    "totalCount": 1,
    "pageSize": 10,
    "currentPage": 1
  })
});

router.post('/auth/role/queryRolePageInfo', function(req, res, next) {
  console.log("rolelist--------");
  res.json({
    "data": [{
      "key": "1",
      "roleID":"001",
      "rolename":"超级管理员",
      "describe":"拥有所有权限",
      "seq": "000001",
      "inserter":"tomcat",
      "inserterTime": "2016-02-20",
      "updater": "apache",
      "updaterTime": "2016-02-24"
    },{
      "key": "2",
      "roleID":"002",
      "rolename":"总行管理员",
      "describe":"拥有所有权限",
      "seq": "000002",
      "inserter":"张三",
      "inserterTime": "2016-02-20",
      "updater": "张三",
      "updaterTime": "2016-02-21"
    },{
      "key": "3",
      "roleID":"003",
      "rolename":"分行管理员",
      "describe":"拥有所有权限",
      "seq": "000003",
      "inserter":"李四",
      "inserterTime": "2016-02-20",
      "updater": "李四",
      "updaterTime": "2016-02-21"
    }],
    "totalCount": 1,
    "pageSize": 10,
    "currentPage": 1
  })
});
//添加用户信息
router.post('/auth/role/add', function(req, res, next) {
  console.log("roleadd--------");
  console.log("req.param.roleID: "+req.param('roleID'));
  //req.param('name')
  res.json({"result":"0","msg":'角色添加成功'});
});
//添加用户信息
router.post('/auth/role/update', function(req, res, next) {
  console.log("roleupdate--------");
  console.log("req.param.rolename: "+req.param('rolename'));
  //req.param('name')
  res.json({"result":"0","msg":'角色修改成功'});
});
//删除数据
router.post('/auth/role/delete', function(req, res, next) {
  console.log("delete--------");
  console.log("req.param.roleID: "+req.param('roleID'));
  //req.param('name')
  res.json({"result":"0","msg":'角色数据删除成功'});
});

module.exports = router;
