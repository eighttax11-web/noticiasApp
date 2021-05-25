import { Component } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public articles: Article[] = [];

  constructor(private noticias: NoticiasService) {
    this.cargarNoticias();
  }

  cargarNoticias(event?) {
    this.noticias.getTopHeadlines().subscribe(response => {

      if (response.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      }

      this.articles.push(...response.articles);

      if (event) {
        event.target.complete();
      }
    })
  }

  loadData(event) {
    this.cargarNoticias(event);
    // console.log(event);
  }
}
