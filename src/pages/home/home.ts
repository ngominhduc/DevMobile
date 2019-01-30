import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodoList } from '../../model/TodoList';
import { dataList } from '../../model/dataList';
import { ShowListPage } from '../show-list/show-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data:TodoList[] = dataList;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
    
  }

  listSelected(uuid: string){
    console.log('id'+uuid);
    this.navCtrl.push(ShowListPage,{uuid:uuid})
    return null;
  }

  addNewList(){
    this.addList();
  }
  
  deleteList(uuid) {
    console.log('delete');
    this.deleteConfirm(uuid);
  }

  updateList(uuid){
    console.log('update');
    this.update(uuid);
}

  addList(): any {
    const prompt = this.alertCtrl.create({
      title: 'Ajouter une nouvelle liste',
      message: "Entrez le nom de la liste",
      inputs: [
        {
          name: 'name',
          placeholder: 'nom'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.data.push({uuid: "dedede", name: data.name, items: []})
          }
        }
      ]
    });
    prompt.present();
  }

  deleteConfirm(uuid: any): any {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cette liste?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            const index = this.data.findIndex(list => list.uuid === uuid);
            this.data.splice(index, 1);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            const index = this.data.findIndex(list => list.uuid === uuid);
            this.data.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
  }
  
  update(uuid) {
    const prompt = this.alertCtrl.create({
      title: 'Modifier une liste',
      message: "Entrez le nom de la liste",
      inputs: [
        {
          name: 'name',
          placeholder: 'nom'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            const index = this.data.findIndex(list => list.uuid === uuid);
            console.log('index '+index);
            this.data[index].name = data.name;
          }
        }
      ]
    });
    prompt.present();
  }
}
