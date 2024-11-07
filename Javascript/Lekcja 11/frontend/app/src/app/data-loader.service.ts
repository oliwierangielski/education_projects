import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
import { parseString } from 'xml2js';
import { HttpClient, HttpParams } from '@angular/common/http';


interface keyable {
  [key: string]: any  
}


@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  
  constructor(private httpClient:HttpClient) { }

  async loadMagazinesData(): Promise<object> {
    try {
      const params = { zmienna: 'wartosc' };
      const url = './../assets/czasopisma.xml';

      const data = await this.httpClient.request('GET', url, { params, responseType: 'text' }).toPromise();

      if (data) {
        return new Promise<object>((resolve, reject) => {
          parseString(data, { explicitArray: false }, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      } else {
        throw new Error('No data received.');
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  
  
}
