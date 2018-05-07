/* global fetch */
import API_URL from './config';

export default class OmdbapiWrapper {
  constructor(options) {
    if (options.key === undefined) {
      throw new Error('The API Key Must be provided');
    }
    this.key = options.key;
    this.url = options.url || API_URL;
  }

  static request(url) {
    return fetch(url, {
      header: {
        'Access-Control-Allow-Origin': '*',
      },
    }).then(res => res.json()).catch(err => err);
  }

  prepareUrl(options = {}) {
    let url = `${this.url}${this.key}`;
    if (options.id) {
      url = `${url}&i=${options.id}`;
    }
    if (options.title) {
      url = `${url}&t=${options.title}`;
    }
    if (options.year) {
      url = `${url}&y=${options.year}`;
    }
    return url;
  }

  searchByTitle(title, year = null) {
    return OmdbapiWrapper.request(this.prepareUrl({
      title,
      year,
    }));
  }

  searchById(id) {
    return OmdbapiWrapper.request(this.prepareUrl({
      id,
    }));
  }
}
