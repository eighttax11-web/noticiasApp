import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/pages/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;

  constructor(public actionSheetController: ActionSheetController,
              private storage: LocalStorageService) { }

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Noticia',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Borrar de favoritos',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.storage.borrarNoticia(this.noticia);
        }
      },
      {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Favoritos',
        icon: 'heart',
        handler: () => {
          
          this.storage.guardarNoticias(this.noticia);

        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
