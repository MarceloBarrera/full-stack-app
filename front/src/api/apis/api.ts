// api to communicate with the backend using axios
import axios, { AxiosError } from "axios";
import { httpClient } from "../httpClientApi";

// Types based on the people.json structure
export interface Person {
  id?: string;
  forename: string;
  surname: string;
  dob: string;
  ssn: string;
  issuedDateAndTime: string;
  friends: string[];
  image: string;
  primaryLocation: {
    type: string;
    coordinates: [number, number];
  };
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// API Methods
export const getPeople = async (): Promise<ApiResponse<Person[]>> => {
  try {
    const response = await httpClient.get("/people");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getPersonById = async (
  id: string
): Promise<ApiResponse<Person>> => {
  try {
    const response = await httpClient.get(`/people/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const searchPersonByName = async (
  name: string
): Promise<ApiResponse<Person[]>> => {
  try {
    const response = await httpClient.get(`/people/search/${name}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const createPerson = async (
  person: Omit<Person, "id">
): Promise<ApiResponse<Person>> => {
  try {
    const response = await httpClient.post("/people", person);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updatePerson = async (
  id: string,
  person: Partial<Person>
): Promise<ApiResponse<Person>> => {
  try {
    const response = await httpClient.put(`/people/${id}`, person);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deletePerson = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await httpClient.delete(`/people/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteFriend = async (
  id: string,
  friendId: string
): Promise<ApiResponse<Person>> => {
  try {
    const response = await httpClient.delete(
      `/people/${id}/friends/${friendId}`
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const addFriend = async (id: string, friendId: string) => {
  try {
    const response = await httpClient.post(`/people/${id}/friends/`, {
      friendId,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

// Error handling helper
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw {
      status: axiosError.response?.status || 500,
      message: axiosError.response?.data?.message || "An error occurred",
      data: null,
    };
  }
  throw {
    status: 500,
    message: "An unexpected error occurred",
    data: null,
  };
};
