import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { dataList } from '../../model/dataList';
import { ItemProvider } from '../../providers/item/item';
import { Observable } from 'rxjs';

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
  items:Observable<TodoItem[]>;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public itemProvider: ItemProvider) {
    this.uuid = navParams.get('uuid');
    this.getListItems(this.uuid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowListPage');
  }

  getListItems(listUUID: string) {
    this.items = this.itemProvider.getItemsList(listUUID);
  }

  addItem(){
    this.addModal();
    console.log('add modal');
  }

  addModal() {
    const modal = this.modalCtrl.create('ItemModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      //this.items.unshift(data);
      this.itemProvider.insertItem(this.uuid,data);
      console.log('add'+ data);
    });
  }

  updateModal(item) {
    const modal = this.modalCtrl.create('ItemModalPage',{item: item});
    modal.present();
    modal.onDidDismiss(data => {
      //const index = this.items.findIndex(it => it.uuid === item.uuid);
      //this.items[index] = data;
      console.log('update'+ item.uuid);
      this.itemProvider.updateItem(item.uuid, data);
    });
  }

  delete(uuid){
   /* const index = this.items.findIndex(it => it.uuid === item.uuid);
    this.items.splice(index, 1);*/
    console.log('delete = ' +uuid);
    this.itemProvider.deleteItem(uuid);
  }
}
