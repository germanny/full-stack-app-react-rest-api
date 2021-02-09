import { useState, useEffect, useContext } from "react";
import { authContext } from "../Context";
import apiUrl from "../config";
import axios from "axios";

export default function useFetch({
  path,
  method = "GET",
  data = null,
  requiresAuth = false,
  requiresBasicAuth = false,
}) {
  const { authUser } = useContext(authContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = apiUrl + path;
    const options = {
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (requiresAuth) {
      options.auth = {
        username: authUser.emailAddress,
        password: atob(authUser.cred),
      };
    }

    if (requiresBasicAuth) {
      // encode the user credentials and set the HTTP Authorization request header to the Basic Authentication type, followed by the encoded user credentials.
      const encodedCredentials = btoa(
        `${authUser.emailAddress}:${atob(authUser.cred)}`
      );

      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    const fetchData = async () => {
      try {
        await axios(options)
          .then((res) => {
            console.log("res: ", res);
            setResponse(res);
          })
          .catch((err) => {
            console.log("err: ", err);
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.log("err: ", err);
        setError(err);
      }
    };

    fetchData();
  }, [path, method, data, requiresAuth, requiresBasicAuth]);

  return { response, error, isLoading };
}
