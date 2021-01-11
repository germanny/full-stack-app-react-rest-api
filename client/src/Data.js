import apiUrl from './config';
import axios from 'axios';

export default class Data {
  searchCourseApi = (path, method = 'GET') => {
    const url = apiUrl + path;

    const options = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    return axios(options);
  }
}
