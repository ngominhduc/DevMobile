import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { dataList } from '../../model/dataList';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.uuid = navParams.get('uuid');
    this.name = dataList.find(list => list.uuid === this.uuid).name;
    this.items = dataList.find(list => list.uuid === this.uuid).items;
   console.log(' items list '+JSON.stringify(this.items));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowListPage');
  }

  addItem(){
    this.addModal();
    console.log('add modal');
  }

  addModal() {
    const modal = this.modalCtrl.create('ItemModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      this.items.unshift(data);
      console.log('add'+ data);
    });
  }

  updateModal(item) {
    const modal = this.modalCtrl.create('ItemModalPage',{item: item});
    modal.present();
    modal.onDidDismiss(data => {
      const index = this.items.findIndex(it => it.uuid === item.uuid);
      this.items[index] = data;
      console.log('update'+ data);
    });
  }

  delete(item){
    const index = this.items.findIndex(it => it.uuid === item.uuid);
    this.items.splice(index, 1);
    console.log('delete');
  }
}
