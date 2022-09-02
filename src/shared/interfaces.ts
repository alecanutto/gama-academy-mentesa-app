export interface IUser {
  id?: number;
  email: string;
  name?: string;
  password?: string;
}

export interface IValidationErrors {
  [field: string]: string;
}
