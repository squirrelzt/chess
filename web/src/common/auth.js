import reqwest from 'reqwest';
import { message } from 'antd';

export const auth = {
  fetch(url, method, params, callback) {  
    let api = this.getPath();
    // this.setToken();
    let headers = this.getHeaders();
    reqwest({
      url: api + url,
      method: method,
      headers:headers,
      // data: JSON.stringify(params),
      data: params,
      type: 'json',
      // contentType: contentType,
      success: (result) => {
        callback(result);
      },
      error: (err) => {
        console.log(err);
        callback("error");
        
      }
    });
  },
 
  getTimestamp(dateString) {
    return new Date(dateString).getTime()/1000;
  },
  getHeaders() {
    let headers = {
      "Accept": "*/*",
      "token": localStorage.getItem("token")
    };
    return headers;
  },
  getPath(){
    return '';
    // return 'http://localhost:8090'
  }

}
