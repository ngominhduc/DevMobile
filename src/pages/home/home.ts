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

  listSelected(id: any){
    console.log('select'+id);
    this.navCtrl.push(ShowListPage,{id:id})
    console.log('select done');
  }

  addNewList(){
    this.addList();
  }
  
  deleteList(id: any) {
    console.log('delete');
    this.deleteConfirm(id);
  }

  updateList(id:any){
    console.log('update' + id);
    this.update(id);
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

  deleteConfirm(id:any): any {
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
            this.listProvider.deleteList(id);
          }
        }
      ]
    });
    alert.present();
  }
  
  update(id:any) {
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
            this.listProvider.updateList(id, data.name);
            console.log('list with id : ' + id + "  " +  'change data to: ' + data.name);
          }
        }
      ]
    });
    prompt.present();
  }
}
