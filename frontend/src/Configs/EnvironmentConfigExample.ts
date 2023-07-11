let baseURI = "YOUR_BASE_URI";
let apiURI = "YOUR_API_URI";
interface Config {
  API_BASE_URI: string;
  ADD_STUDENT_URI: string;
  GET_ALL_STUDENT_URI: string;
  UPDATE_STUDENT_URI: string;
  DELETE_STUDENT_URI: string;
  GET_IMAGE_URI: string;
}

const local: Config = {
  API_BASE_URI: `${baseURI}`, //use for get student with pagination and search value also for base URI
  ADD_STUDENT_URI: `${baseURI}/add`,
  GET_ALL_STUDENT_URI: `${baseURI}/getstudents`,
  UPDATE_STUDENT_URI: `${baseURI}/update/`,
  DELETE_STUDENT_URI: `${baseURI}/delete/`,
  GET_IMAGE_URI: `${apiURI}/uploads/`,
};

const getEnv = (): Config => {
  const origin = window.location.origin;
  if (origin === "YOUR_CLIENTSIDE_PORT_API" || "http://localhost:3000") {
    return local;
  } else {
    return local;
  }
};

export const env = getEnv();
