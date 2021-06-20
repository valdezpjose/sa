export interface RegEditorial {
    'name': string;
    'email': string;
    'password': string;
    'address': string;
    'type': string;
  }

export interface ActEditorial {
  'email': string;
  'data' : {
    'name': string;
    'email': string;
    'password'?: string;
    'address': string;
  }
}
  