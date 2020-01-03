import Router from "next/router";
import { SEARCH_BASE_URL, USERS_BASE_URL } from "../constants/ApiTypes"

const axios = require("axios");

const handleError = response => {
  if (response.statusText === "OK") return response;
  switch (response.status) {
    case 404:
      throw Object.create({
        error: "No se encontraron coincidencias para la búsqueda"
      });
    case 403:
      Router.push("/403");
      break;
    case 401:
      Router.push("/401");
      break;
    case 500:
      Router.push("/500");
      break;
  }
  return response;
};

const axiosWithErrorHandling = async url => {
  try {
    const response = await axios.get(url);
    const handleResponse = handleError(response);    
    return handleResponse;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

const GitHubMatch = {
  byUser: async (searchValue, page, per_page) => {
    const response = await axiosWithErrorHandling(
      `${SEARCH_BASE_URL}/users?q=${searchValue}&page=${page}&per_page=${per_page}`
    );    
    return response;
  },

  getUser: async searchValue => {
    const response = await axiosWithErrorHandling(
      `${USERS_BASE_URL}/${searchValue}`
    );
    return response.data;
  },

  byRepo: async (searchValue, page, per_page) => {
    const response = await axiosWithErrorHandling(
      `${SEARCH_BASE_URL}/repositories?q=${searchValue}&page=${page}&per_page=${per_page}`
    );
    return response;
  }
};

export default GitHubMatch;