export interface IUser {
  userName?: string;
  telPhone?: number | string;
  password?: string;
  isLogin?: boolean
}

export interface IAppContext {
  userInfo?: IUser;
}