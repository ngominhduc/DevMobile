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

  id:string;
  items:Observable<TodoItem[]>;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public itemProvider: ItemProvider) {
    this.id = navParams.get('id');
    console.log("item seltected "+this.id);
    this.getListItems(this.id);
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
      this.itemProvider.insertItem(this.id,data);
      console.log('add'+ data);
    });
  }

  updateModal(id : any, item) {
    console.log("update item id" + id);
    const modal = this.modalCtrl.create('ItemModalPage',{item: item});
    modal.present();
    modal.onDidDismiss(data => {
      //const index = this.items.findIndex(it => it.uuid === item.uuid);
      //this.items[index] = data;
      console.log('update'+ id);
      this.itemProvider.updateItem(id, data);
    });
  }

  delete(uuid){
   /* const index = this.items.findIndex(it => it.uuid === item.uuid);
    this.items.splice(index, 1);*/
    console.log('delete = ' +uuid);
    this.itemProvider.deleteItem(uuid);
  }
}
