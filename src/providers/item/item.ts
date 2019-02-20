import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {TodoItem} from "../../model/TodoItem";
import { TodoList } from '../../model/TodoList';
import { map } from 'rxjs/operators';
import { ListProvider } from '../list/list';
/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  todoCollectionRef: AngularFirestoreCollection<TodoItem>;
  todoItem: Observable<TodoItem[]>;
  id: string;
  constructor(public http: HttpClient, public angularFire: AngularFirestore, public listprovider : ListProvider) {
  }

  getItemsList(listUUID: string) {
    this.todoCollectionRef = this.angularFire.collection<TodoItem>('lists/'+listUUID+'/items');
    this.todoItem = this.todoCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as TodoItem;
       const id = a.payload.doc.id;
       return { id, ...data };
      }))
    )
    return this.todoItem;
  };
  
  insertItem(listUUID:string,item:TodoItem) {
    this.todoCollectionRef.add(item).then(function(docRef) {
      console.log("item written with ID: ", docRef.id);
  });;
  }

  updateItem(uuid : string, item : TodoItem){
    console.log('change id' + uuid); 
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
