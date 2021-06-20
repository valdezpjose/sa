export interface RegBook {
    'name': string;
    'author': string;
    'synopsis': string;
    'genre': string[];
    'editorial': string;
    'image': string;
    'stock' : number;
    'price' : number
  }


export interface BookImg {
  'editorial' : string;
  'bookName' : string;
  'image64' : string;
}


export interface GetBook {
  'name' : string;
  'editorial' : string;
}

export interface UpdateBook {
  'name' : string;
  'editorial' : string;
  'data' : {
    'author'? : string;
    'synopsis'? : string;
    'genre'? : string[];
    'image'? : string;
    'stock'? : number;
    'price'? : number;
  };
}
  