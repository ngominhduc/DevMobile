import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TodoItem} from "../../model/TodoItem";
/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ItemProvider Provider');
  }

  insertItem(listUUID:string,item:TodoItem) {}
  updateItem(uuid: string, item:TodoItem){}
  deleteItem(uuid: string){}
}
