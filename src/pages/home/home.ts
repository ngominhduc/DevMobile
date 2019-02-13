import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodoList } from '../../model/TodoList';
import { dataList } from '../../model/dataList';
import { ShowListPage } from '../show-list/show-list';
import { ListProvider } from '../../providers/list/list';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data:Observable<TodoList[]>;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public listProvider: ListProvider) {
    this.data = this.listProvider.getList();
    console.log(' data '+ JSON.stringify(this.data));
    console.log(this.data);
  }

  listSelected(uuid: string){
    console.log('id'+uuid);
    this.navCtrl.push(ShowListPage,{uuid:uuid})
    return null;
  }

  addNewList(){
    this.addList();
  }
  
  deleteList(list: TodoList) {
    console.log('delete');
    this.deleteConfirm(list);
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
        {
          name: 'uuid',
          placeholder: 'uuid'
        }
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
            //this.data.push({uuid: data.uuid, name: data.name, items: []})
            this.listProvider.insertList(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteConfirm(list: TodoList): any {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cette liste?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel delete');
          }
        },
        {
          text: 'Yes',
          handler: () => {
           /* const index = this.data.findIndex(list => list.uuid === uuid);
            this.data.splice(index, 1);*/
            this.listProvider.deleteList(list);
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
            /*const index = this.data.findIndex(list => list.uuid === uuid);
            console.log('index '+index);
            this.data[index].name = data.name;*/
            this.listProvider.updateList(uuid, data.name);
            console.log(uuid, data.name);
          }
        }
      ]
    });
    prompt.present();
  }
}
