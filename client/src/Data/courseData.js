import apiUrl from "../config";
import axios from "axios";

export default class CourseData {
  courseApi(
    path,
    method = "GET",
    data = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = apiUrl + path;

    const options = {
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (requiresAuth) {
      options.auth = {
        username: credentials.emailAddress,
        password: credentials.password,
      };
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
    return await this.userApi(url, "GET", null).then(
      (response) => {
        if (response.status === 200) {
          return response.data;
        } else if (response.status === 401) {
          return null;
        }
      },
        (err) => {
          console.log(err);
          throw new Error();
        }
    );
  }

  async updateCourse(url, courseData, emailAddress, password) {
    const response = await this.courseApi(url, "PUT", courseData, true, {
      emailAddress,
      password,
    });

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
