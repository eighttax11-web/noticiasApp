import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias : string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor(private service: NoticiasService) {
  }
  
  ngOnInit(): void {
    this.cargarNoticias(this.categorias[0]);
  }

  ngAfterViewInit() {
    
    this.segment.value = this.categorias[0];
    
  }

  changeCategory(event) {

    this.noticias = [];
    
    this.cargarNoticias(event.detail.value);
    
  }

  cargarNoticias(category: string) {
    this.service.getTopHeadlinesCategory(category)
    .subscribe(resp => {      
      this.noticias.push(...resp.articles)      
    })
  }
}
