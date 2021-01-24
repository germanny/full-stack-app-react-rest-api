import apiUrl from "../config";
import axios from "axios";

export default class CourseData {
  courseApi(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = apiUrl + path;

    const options = {
      method,
      url,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.data = JSON.stringify(body);
    }

    return axios(options);
  }

  async createCourse(courseData) {
    const response = await this.courseApi("/courses", "POST", courseData);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourse(url) {
    const response = await this.courseApi(url, "GET", null, true);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async updateCourse(courseData) {
    const response = await this.courseApi("/courses", "POST", courseData);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
