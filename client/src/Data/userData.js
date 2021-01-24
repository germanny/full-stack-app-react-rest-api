import apiUrl from "../config";
import axios from "axios";

export default class UserData {
  userApi(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = apiUrl + path;

    const options = {
      url,
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.data = JSON.stringify(body);
    }

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
    const response = await this.userApi("/users", "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      console.log(response);
      return response;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    console.log(user);
    return await this.userApi("/users", "POST", user);
    // .then((response) => {
    //   console.log("response: ", response);
    //   return [];
    // })
    // .catch((err) => {
    //   if (err.response.status === 400) {
    //     console.error("error: ", err.response.data.errors);
    //     return err.response.data.errors;
    //   } else {
    //     throw new Error();
    //     // console.error("Error response:");
    //     // console.error(err.response.data.errors); // ***
    //     // console.error(err.response.status); // ***
    //     // console.error(err.response.headers); // ***
    //   }
    // });

    // console.log("response: ", response.status);
    // if (response.status === 201) {
    //   console.log("response 201: ", response.status);
    //   return [];
    // } else if (response.status === 400) {
    //   console.log("response from createUser: ", response);
    //   return response.then((data) => {
    //     console.log("data errors from createUser function: ", data.errors);
    //     return data.errors;
    //   });
    // } else {
    //   console.log("new error thrown instead");
    //   throw new Error();
    // }
  }
}
