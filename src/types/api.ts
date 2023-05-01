export type User = {
  id?: number;
  authorized: boolean;
  cpf: string;
  description: string;
  email: string;
  address: Address;
  age: number;
  name: string;
  password: string;
  sex: 'M' | 'F';
  phones: string[];
};

export type Address = {
  // id?: number;
  cep: string;
  city: City;
  complement?: string;
  place: string;
};

export type City = {
  id: number;
  name: string;
  state: State;
};

export type State = {
  id: number;
  name: string;
  acronym: string;
};

export type Page<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  numberOfElements: number;
  // pageable: {
  //   offset: number;
  //   pageNumber: number;
  //   pageSize: number;
  //   paged: boolean;
  //   unpaged: boolean;
  // };
  // sort: {
  //   empty: boolean;
  //   sorted: boolean;
  //   unsorted: boolean;
  // };
};
