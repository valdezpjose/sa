import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookImg, UpdateBook } from '../models/book'; 
import { RegBook } from '../models/book';
import { GetBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  URL = 'http://35.225.185.236/book/'

  constructor(private httpClient: HttpClient) { }

  getGenres()
  {
    return this.httpClient.get<any>(this.URL + 'genre')
  }

  saveImgBook(data: BookImg)
  {
    return this.httpClient.post<any>('https://1nxihu4yr3.execute-api.us-east-2.amazonaws.com/sa/uploadToS3',data);
  }

  saveBook(data:RegBook)
  {
    return this.httpClient.post<any>(this.URL + 'new',data);
  }

  filterBooks(data : any)
  {
    return this.httpClient.post<any>(this.URL + 'filter',data);
  }

  getAllBooks()
  {
    return this.httpClient.get<any>(this.URL + 'all');
  }


  getBook(data : GetBook)
  {
    return this.httpClient.post<any>(this.URL + 'get',data);
  }


  updateBook(data : UpdateBook)
  {
    return this.httpClient.post<any>(this.URL + 'update',data);
  }

  deleteBook(data : GetBook)
  {
    return this.httpClient.post<any>(this.URL + 'delete', data);
  }

}
