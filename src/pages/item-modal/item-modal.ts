import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Item } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';

/**
 * Generated class for the ItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-modal',
  templateUrl: 'item-modal.html',
})
export class ItemModalPage {
  todo: TodoItem = {uuid: "test", name: "test", desc: "", complete:false};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //this.todo = this.navParams.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemModalPage');
    
  }

  dismiss(todo: TodoItem) {
    this.viewCtrl.dismiss(todo);
  }

  submit(todo: TodoItem){
    this.dismiss(this.todo);
  }
}
