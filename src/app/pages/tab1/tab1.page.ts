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
    this.noticias.getTopHeadlines().subscribe(resp => {
      console.log(resp.articles);

      this.articles.push(...resp.articles);
    })
  }

}
