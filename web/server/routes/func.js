var express = require('express');
var router = express.Router();

router.post('/queryfunc', function(req, res, next) {
  res.json({"result":"0","data":[{"text":"系统管理","iconCls":null,"expanded":false,"leaf":false,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[{"text":"首页","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"2"},{"text":"系统管理","iconCls":null,"expanded":false,"leaf":false,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[{"text":"用户管理","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"6"}],"id":"3"},{"text":"项目管理","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"4"},{"text":"修改密码","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"5"}],"id":"0"}],"status":200,"token":"1_jlkjsdfkljlks"})
});
/* GET funcs listing. */
router.post('/auth/func/tree', function(req, res, next) {
  console.log("funclist--------");
  res.json({"result":"0","data":[{"text":"系统管理","iconCls":null,"expanded":false,"leaf":false,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[{"text":"首页","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"2"},{"text":"系统管理","iconCls":null,"expanded":false,"leaf":false,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[{"text":"用户管理","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"6"}],"id":"3"},{"text":"项目管理","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"4"},{"text":"修改密码","iconCls":null,"expanded":false,"leaf":true,"checked":false,"url":"","isUsable":0,"desc":"","order":0,"children":[],"id":"5"}],"id":"0"}],"status":200,"token":"1_jlkjsdfkljlks"})
});

//添加用户信息
router.post('/auth/func/add', function(req, res, next) {
  console.log("funcadd--------");
  console.log("req.param.funcid: "+req.param('funcname'));
  //req.param('name')
  res.json({"result":"0","msg":'添加成功'});
});
//添加用户信息
router.post('/auth/func/update', function(req, res, next) {
  console.log("funcupdate--------");
  console.log("req.param.funcid: "+req.param('funcname'));
  //req.param('name')
  res.json({"result":"0","msg":'修改成功'});
});
//删除数据
router.post('/auth/func/delete', function(req, res, next) {
  console.log("delete--------");
  console.log("req.param.funcid: "+req.param('funcid'));
  //req.param('name')
  res.json({"result":"0","msg":'数据删除成功'});
});

module.exports = router;
