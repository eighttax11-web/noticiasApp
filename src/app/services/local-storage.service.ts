import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;

  noticias: Article[] = [];

  constructor(private storage: Storage) { 
    this.init();
    this.cargarFavoritos();
  }

  guardarNoticias(noticia: Article) {

    if (this.noticias) {
      
      const exists = this.noticias.find(n => n.title == noticia.title);
  
      if (!exists) {
        this.noticias.unshift(noticia);
        this.set('Favoritos', this.noticias);
      }
    
    } else {
      this.noticias = [];
      this.noticias.unshift(noticia);
      this.set('Favoritos', this.noticias);
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( n => n.title !== noticia.title );
    this.storage.set('Favoritos', this.noticias );
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('Favoritos');

    this.noticias = favoritos;
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
}
