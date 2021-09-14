import { Get, Post } from "../utils/request";

interface ILoginParams {
  userName: String;
  password: String
}

export const loginApi = (params: ILoginParams) => {
  return Post('/login', params)
}

export const addCatalog = () => {
  
}
