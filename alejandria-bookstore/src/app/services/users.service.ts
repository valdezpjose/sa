import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login'
import { RegCliente } from '../models/cliente'
import { RegEditorial } from '../models/editorial'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL = 'http://35.225.185.236/user/'

  constructor(private httpClient: HttpClient) { }

  login(credentials: Login)
  {
    return this.httpClient.post<any>(this.URL + 'login',credentials);
  }

  decodeToken(token : String)
  {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', token.toString());
    return this.httpClient.get<any>(this.URL + 'me',{headers})
  }

  registerClient(info : RegCliente)
  {
    return this.httpClient.post<any>(this.URL + 'register',info);
  }


  registerPublisher(info : RegEditorial)
  {
    return this.httpClient.post<any>(this.URL + 'register',info);
  }

  getUnconfirmedEditorials()
  {
    return this.httpClient.get<any>(this.URL + 'inactive')
  }

  updateUser(data: any)
  {
    return this.httpClient.post<any>(this.URL + 'updateUser',data);
  }


  getAllPublishers()
  {
    return this.httpClient.get<any>(this.URL + 'allEditorials')
  }

  getAllClients()
  {
    return this.httpClient.get<any>(this.URL + 'allClients')
  }

  deleteUser(data : any)
  {
    return this.httpClient.post<any>(this.URL + 'deleteUser', data);
  }

}
