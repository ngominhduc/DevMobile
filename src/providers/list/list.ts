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

  constructor(public http: HttpClient, public angularFire: AngularFirestore) {
   this.todoCollectionRef = this.angularFire.collection<TodoList>('lists');
   this.todo = this.todoCollectionRef.valueChanges();
  }

  getList() {
    return this.todo;
  }

  insertList(list: TodoList){
      this.todoCollectionRef.add(list);
  }

  updateList(uuid: string, name: string) {}
  deleteList(uuid: string) {}
}
