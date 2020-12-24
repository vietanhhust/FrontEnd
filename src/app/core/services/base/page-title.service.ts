import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(private meta: Meta, private title: Title) { }
  GenerateTitle(config: any) {
    config = {
      title: 'VERP - Home',
     // des: '',
     // img: '',
     // slug: '',
      ...config
    };
   // this.meta.updateTag({name: 'description', content: config.des});
    this.meta.updateTag({name: 'Title', content: config.title});
    this.meta.updateTag({name: 'Description', content: config.title});
    this.title.setTitle(config.title);
  }
}