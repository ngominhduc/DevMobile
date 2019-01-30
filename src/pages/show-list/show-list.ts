import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { dataList } from '../../model/dataList';
import { TodoList } from '../../model/TodoList';

/**
 * Generated class for the ShowListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-list',
  templateUrl: 'show-list.html',
})

export class ShowListPage {

  uuid:string;
  items: TodoItem[];
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uuid = navParams.get('uuid');
    this.name = dataList.find(list => list.uuid === this.uuid).name;
    this.items = dataList.find(list => list.uuid === this.uuid).items;
   console.log(' items list '+JSON.stringify(this.items));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowListPage');
  }

}
