import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TodoList} from "../../model/TodoList";
/*
  Generated class for the ListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ListProvider Provider');
  }

  insertList(name: string){}
  updateList(uuid: string, name: string) {}
  deleteList(uuid: string) {}
}
