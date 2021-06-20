export interface RegCliente {
    'name': string;
    'lastName': string;
    'email': string;
    'password': string;
    'telephone': string;
    'type': string;
  }
  
export interface ActCliente {
  'email' : string;
  'data' : {
    'name': string;
    'lastName': string;
    'email': string;
    'password'?: string;
    'telephone': string;
  }
}