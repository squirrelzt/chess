const express = require('express');
const router = express.Router();
//var ModelProxy = require('../modelproxy/modelproxy');
const Fetch = require('../Fetch');

/* GET users listing. */
router.post('/auth/login', function(req, res, next) {
	var user = req.body['user'];
	var password = req.body['password'];

  Fetch.fetch('User.login',
    {user_name:user, user_pwd:password},
    function(result){
      console.log(result);
      // res.json({data:[{token:'serwerewr233'}]});
			res.json({data:[result]});
  });
  //
  // var userModel = new ModelProxy( {
  //   login: 'User.login'
  // });
  //
  //
  // userModel.login({user:user, password:password})
  //     .done( function( data ) {
  //     //res.send({data:[{token:'serwerewr233'}]});
  //     res.json({data:[{token:'serwerewr233'}]});
  //     console.log("login................." );
  //     console.log( data );
  //   })
  //   .error( function( err ) {
  //     console.log( err );
  //   });
});

module.exports = router;
