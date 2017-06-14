let instance = null;

class HttpService {

  constructor() {
    // enforce singelton
    if(!instance){
      instance = this;
    }
    return instance;
  }

  get(url, queryObject) {
    let headers = new Headers();
    const q = queryObject ? this.buildQueryString(queryObject) : '';
    return fetch(url + q)
      .then( (response) => response.json() );
  }

  buildQueryString(queryObject) {
    return Object.keys(queryObject).reduce( (acc, key) => {
      return `${acc}&${key}=${queryObject[key]}`;
    }, '?')
  }

}

export default HttpService;
