export interface ITrips {
  name: string;
  country: string;
  state: string;
  travelers: IUsersDTO[];
  created_at: Date;
  updated_at: Date;
}

export default interface IUsersDTO {
  _id: string;
  name: string;
  email: string;
  password: string;
  trips?: ITrips[];
  pix_key?: string;
  user_photo?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUsersDTO {
  _id: string;
  name: string;
  email: string;
  password: string;
  trips?: ITrips[];
  pix_key?: string;
  user_photo?: string;
  created_at: Date;
  updated_at: Date;
}

export type IUpdateUsersDTO = Partial<ICreateUsersDTO> & { _id: string };

export type IUserTripDTO = Partial<ICreateUsersDTO> & {
  _id: string;
  name: string;
};

export interface IListUsersFilters {
  per: number;
  page: number;
}

export interface IUserPhoto {
  _id: string;
  file?: Express.Multer.File;
}
