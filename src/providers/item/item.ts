import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {TodoItem} from "../../model/TodoItem";
import { TodoList } from '../../model/TodoList';
/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  todoCollectionRef: AngularFirestoreCollection<TodoItem>;
  todoItem: Observable<TodoItem[]>;

  constructor(public http: HttpClient, public angularFire: AngularFirestore) {
  }

  getItemsList(listUUID: string) {
    this.todoCollectionRef = this.angularFire.collection<TodoItem>('lists/'+listUUID+'/items');
    return this.todoCollectionRef.valueChanges();
  };
  insertItem(listUUID:string,item:TodoItem) {
    this.todoCollectionRef.doc(item.uuid).set(item);;
  }
  updateItem(uuid : string, item : TodoItem){
    console.log('change id' + item.uuid);
    console.log('change name' + item.name);
    this.todoCollectionRef.doc(uuid).update({
      "name" : item.name,
      "desc" : item.desc,
      "complete" : item.complete
    });
    console.log('item change complete' + item.uuid);
  }

  deleteItem(uuid: string){
    console.log(uuid);
    this.todoCollectionRef.doc(uuid).delete();
  }
}
