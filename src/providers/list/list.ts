import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../../model/TodoList';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

/*
  Generated class for the ListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {
  todoCollectionRef: AngularFirestoreCollection<TodoList>;
  todo: Observable<TodoList[]>;
  list: Observable<TodoList[]>;

  constructor(public http: HttpClient, public angularFire: AngularFirestore) {
   this.todoCollectionRef = this.angularFire.collection<TodoList>('lists');
   this.todo = this.todoCollectionRef.valueChanges();
  
  }

  getList() {
    this.todo.forEach(todo => {
    });
    return this.todo;
  }

  insertList(list: TodoList){
      this.todoCollectionRef.doc(list.uuid).set(list);
  }

  updateList(uuid: string, name: string) {
    console.log(uuid, name);
    this.todoCollectionRef.doc(uuid).update({
      "name" : name,
    });
  }

  deleteList(list: TodoList) {
    console.log(list.uuid);
    this.todoCollectionRef.doc(list.uuid).delete();
    console.log('delete sucess');
  }
}
