export interface IUser {
  id: number;
  apellidos: string;
  nombres: string;
  ciudad?: string;
  celular?: string;
  email: string;
  data_joined?: Date;
  validated?: boolean;
  password?: string;
}
