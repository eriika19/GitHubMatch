import Router from "next/router";

const axios = require("axios");

const SEARCH_BASE_URI = "https://api.github.com/search";
const USERS_BASE_URI = "https://api.github.com/users";
const REPOS_BASE_URI = "https://api.github.com/repositories";

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
  byUser: async searchValue => {
    const response = await axiosWithErrorHandling(
      `${SEARCH_BASE_URI}/users?q=${searchValue}`
    );
    return response;
  },

  getUser: async searchValue => {
    const response = await axiosWithErrorHandling(
      `${USERS_BASE_URI}/${searchValue}`
    );
    return response.data;
  },

  byRepo: async searchValue => {
    const response = await axiosWithErrorHandling(
      `${SEARCH_BASE_URI}/repositories?q=${searchValue}`
    );
    return response;
  },
  getRepo: async searchValue => {
    const response = await axiosWithErrorHandling(
      `${REPOS_BASE_URI}/${searchValue}`
    );
    return response;
  }
};

export default GitHubMatch;

/*   byUser: (searchValue) => {
  return axios.get("https://api.github.com/users/" + );
},
byRepo: (searchValue) => {
  return axios.get("https://api.github.com/users/" + username + "/repos");
} */