import apiUrl from "../config";
import axios from "axios";

export default class UserData {
  userApi(
    method = "GET",
    path,
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
        "content-type": "application/json; charset=utf-8",
      },
    };

    if (requiresAuth) {
      // encode the user credentials and set the HTTP Authorization request header to the Basic Authentication type, followed by the encoded user credentials.
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );

      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return axios(options);
  }

  async getUser(emailAddress, password) {
    return await this.userApi("GET", "/users", null, true, {
      emailAddress,
      password,
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log("getUser response: ", response);
          return response.data;
        } else if (response.status === 401) {
          return null;
        }
      },
        (error) => {
          console.log("getUser error: ", error);
          throw new Error();
        }
    );
  }

  async createUser(user) {
    this.userApi("POST", "/users", user)
      .then((res) => console.log('then res: ', res))
      .catch((err) => console.log("Login: ", err));
  }
}
