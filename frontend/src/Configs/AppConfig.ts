import { env } from './EnvironmentConfig';

export const API_BASE_URL = env.API_BASE_URL  //use for get student with pagination and search value also for base url
export const ADD_STUDENT = env.ADD_STUDENT_URL  //For adding new student
export const ALL_STUDENTS = env.GET_ALL_STUDENT_URL //Get all sudent data
export const UPDATE_STUDENT = env.UPDATE_STUDENT_URL //Edit existing student and update 
export const DELETE_STUDENT = env.DELETE_STUDENT_URL // Delete Student