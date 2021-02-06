import { useState, useEffect } from "react";
import apiUrl from "../config";
import axios from "axios";

export default function useFetch({
  path,
  method = "GET",
  data = null,
  requiresAuth = false,
  credentials = null,
}) {
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
        username: credentials.emailAddress,
        password: credentials.password,
      };
    }

    const fetchData = async () => {
      try {
        await axios(options)
          .then((res) => {
            console.log(res);
            setResponse(res);
          })
          .catch((err) => {
            console.log(err);
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    fetchData();
  }, [path, method, data, requiresAuth, credentials]);

  return { response, error, isLoading };
}
