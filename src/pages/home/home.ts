import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoList } from '../../model/TodoList';
import { TodoServiceProvider } from '../../model/dataListProvider';
import { dataList } from '../../model/dataList';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data:TodoList[] = dataList;

  //data = new TodoServiceProvider();

  constructor(public navCtrl: NavController) {

  }

  listSelected(uuid:string){
    console.log('id'+uuid);
    this.navCtrl.push('ShowListPage',{uuid:uuid});
    return null;
  }
}
