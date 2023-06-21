import { env } from './EnvironmentConfig';

export const API_BASE_URI = env.API_BASE_URI  //use for get student with pagination and search value also for base URI
export const ADD_STUDENT = env.ADD_STUDENT_URI  //For adding new student
export const ALL_STUDENTS = env.GET_ALL_STUDENT_URI //Get all sudent data
export const UPDATE_STUDENT = env.UPDATE_STUDENT_URI //Edit existing student and update 
export const DELETE_STUDENT = env.DELETE_STUDENT_URI // Delete Student
export const GET_IMAGE = env.GET_IMAGE_URI // Get Image 