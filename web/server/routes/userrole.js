var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth/userrole/rolelist', function(req, res, next) {
  console.log("rolelist--------");
  res.json({
    "data": [{
      "key": "1",
      "roleID":"001",
      "rolename":"超级管理员"
    },{
      "key": "2",
      "roleID": "002",
      "rolename": "一级管理员"
    },{
      "key": "3",
      "roleID": "003",
      "rolename": "二级管理员"
    }],
  })
});

router.post('/auth/userrole/queryRolePageInfo', function(req, res, next) {
  console.log("rolelist--------");
  res.json({
    "data": [{
      "key": "1",
      "roleID":"001",
      "rolename":"超级管理员"
    },{
      "key": "2",
      "roleID": "002",
      "rolename": "一级管理员"
    },{
      "key": "3",
      "roleID": "003",
      "rolename": "二级管理员"
    },{
      "key": "4",
      "roleID": "004",
      "rolename": "三级管理员"
    }],
  })
});

router.post('/auth/userrole/queryUserPageInfo', function(req, res, next) {
  console.log("userlist--------");
  res.json({
    "user_data": [{
      "key": "1",
      "roleID":"001",
      "rolename":"用户一"
    },{
      "key": "2",
      "roleID": "002",
      "rolename": "用户二"
    },{
      "key": "3",
      "roleID": "003",
      "rolename": "用户三"
    },{
      "key": "4",
      "roleID": "004",
      "rolename": "用户四"
    },{
      "key": "5",
      "roleID": "005",
      "rolename": "用户五"
    },{
      "key": "6",
      "roleID": "006",
      "rolename": "用户六"
    }],
  })
});


module.exports = router;
