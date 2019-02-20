import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../../model/TodoList';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
   //this.todo = this.todoCollectionRef.valueChanges();
   this.list = this.todoCollectionRef.snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as TodoList;
      const id = a.payload.doc.id;
      return { id, ...data };
     }))
   )
  }

  getList() {
    return this.list;
  }

  insertList(list: TodoList){
      this.todoCollectionRef.add(list).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    });
  }

  updateList(id: any, name: string) {
    this.todoCollectionRef.doc(id).update({
      "name" : name,
    });
  }

  deleteList(id: any) {
    this.todoCollectionRef.doc(id).delete();
    console.log('delete sucess list with id ' + id);
  }
}
