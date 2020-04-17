const ModelProxy = require('./modelproxy/modelproxy');
module.exports = {
  fetch(modelid, params, callback) {
    var modelProxy = new ModelProxy( {
      proxy: modelid
    });
    modelProxy.proxy(params)
      .done( function( data ) {
        callback(data);
      })
      .error( function( err ) {
        console.log( err );
      });
  }
}
