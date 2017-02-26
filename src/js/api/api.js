let _api = {
  baseUrl: "http://114.215.86.188:4000/api/",  // 阿里云
  // baseUrl: "http://192.168.9.13:8000/api/",    // 本地
  /*api是APICloud的库，封装了ajax方法
    key表示请求类型，
    params(Object类型)指传递的参数，
  */
  resolve: function (key, api, params) {
    return new Promise((resolve, reject) => {
      let ajaxJson = {};
      ajaxJson.url = this.baseUrl + key;
      ajaxJson.method = 'get';
      switch (key) {
        case 'activities':
          break;
        case 'players':
          break;
        case 'player':
          ajaxJson.url += ('/' + params.id)
      }
      api.ajax(ajaxJson, (ret, err) => {
        if(err) reject(err);
        else resolve(ret.data);
      })
    })
  }
};

window._api = _api;