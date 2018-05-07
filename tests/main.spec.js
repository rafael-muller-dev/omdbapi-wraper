import API_URL from '../src/config';
import OmdbapiWrapper from '../src/main';

/* global.fetch = require('jest-fetch-mock');
 / * Zglobal fetch */

describe('OmdbapiWrapper', () => {
  describe('Smoke tests', () => {
    let omdb;
    const mykey = 'my-api-key';

    beforeAll(() => {
      omdb = new OmdbapiWrapper({ key: mykey });
    });

    test('It should create an instance of OmdbapiWrapper', () => {
      expect(omdb).toBeInstanceOf(OmdbapiWrapper);
    });

    test('It shoul trhow an error if no key was provided', () => {
      expect(() => new OmdbapiWrapper({})).toThrow('The API Key Must be provided');
    });

    test('It should has api key set', () => {
      expect(omdb.key).toBe(mykey);
    });

    test('It uses default url if not provided', () => {
      expect(omdb.url).toBe(API_URL);
    });

    test('It should accept custom url', () => {
      const myurl = 'http://fake.com';
      const omdbtemp = new OmdbapiWrapper({
        key: mykey,
        url: myurl,
      });
      expect(omdbtemp.url).toBe(myurl);
    });
  });

  describe('Prepare URL method', () => {
    let omdb;
    const mykey = 'my-api-key';
    const url = 'http://www.omdbapi.com/?apikey=my-api-key';

    beforeAll(() => {
      omdb = new OmdbapiWrapper({ key: mykey });
    });

    test('It should have the prepare url method', () => {
      expect(omdb.prepareUrl).toBeDefined();
    });

    test('It should includes de title when present', () => {
      const result = `${url}&t=aaa`;
      expect(omdb.prepareUrl({ title: 'aaa' })).toBe(result);
    });

    test('It should includes de id when present', () => {
      const result = `${url}&i=123`;
      expect(omdb.prepareUrl({ id: 123 })).toBe(result);
    });

    test('It should includes de year when present', () => {
      const result = `${url}&t=aaa&y=2018`;
      expect(omdb.prepareUrl({ title: 'aaa', year: 2018 })).toBe(result);
    });
  });

  describe('Request method', () => {
    test('It should have the request method', () => {
      expect(OmdbapiWrapper.request).toBeDefined();
    });

    let result;
    let options;
    let response;

    beforeEach(() => {
      result = JSON.stringify({ object: 'ok' });

      options = {
        header: {
          'Access-Control-Allow-Origin': '*',
        },
      };

      global.fetch = jest.fn(() => Promise.resolve(result));

      response = OmdbapiWrapper.request(API_URL);
    });

    afterEach(() => {
      global.fetch.mock.calls.length = 0;
    });

    test('It should request the correct url and options', () => {
      expect(global.fetch).toBeCalledWith(API_URL, options);
    });

    test('It should call fetch once', () => {
      expect(global.fetch.mock.calls.length).toBe(1);
    });

    test('It should return a promise', () => {
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('Search methods', () => {
    let result;
    let omdb;

    beforeEach(() => {
      result = { object: 'ok' };
      omdb = new OmdbapiWrapper({ key: 'my-key' });

      global.fetch = jest.fn(() => Promise.resolve(result));
    });

    afterEach(() => {
      global.fetch.mock.calls.length = 0;
    });

    describe('Search by title', () => {
      test('It should has a search by title method', () => {
        expect(omdb.searchByTitle).toBeDefined();
      });

      test('It should call request once', () => {
        omdb.searchByTitle('movie title');
        expect(global.fetch.mock.calls.length).toBe(1);
      });

      test('It should return a promise', () => {
        expect(omdb.searchByTitle('movie title')).toBeInstanceOf(Promise);
      });
    });

    describe('Search by Id', () => {
      test('It should has a search by id method', () => {
        expect(omdb.searchById).toBeDefined();
      });

      test('It should call request once', () => {
        omdb.searchById(123);
        expect(global.fetch.mock.calls.length).toBe(1);
      });

      test('It should return a promise', () => {
        expect(omdb.searchById(123)).toBeInstanceOf(Promise);
      });
    });
  });
});
