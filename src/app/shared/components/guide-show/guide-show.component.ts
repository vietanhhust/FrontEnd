import { Component, OnInit, ViewChild, ElementRef, Input, Output, AfterViewInit, Renderer2 } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { GuideModel } from 'src/app/core/models/system/guide.model';

@Component({
  selector: 'app-guide-show',
  templateUrl: './guide-show.component.html',
  styleUrls: ['./guide-show.component.scss']
})
export class GuideShowComponent implements OnInit, IModalComponent, AfterViewInit {

  active: number = 0;
  @Input() data: { model: GuideModel[] };
  @Output() close;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    //this.container.nativeElement.insertAdjacentHTML('afterend', this.data.model.description);
    if (this.data.model && this.data.model.length > 0) {
      this.renderGuide(0);
    }
  }

  renderGuide(index: number) {

    this.active = index;
    
    try{
    const childElements = this.container.nativeElement.children;
      for (let child of childElements) {
        this.renderer.removeChild(this.container.nativeElement, child);
      }
      this.container.nativeElement.insertAdjacentHTML('beforeend', this.data.model[index].description);
    }catch{}
    

  }
}
