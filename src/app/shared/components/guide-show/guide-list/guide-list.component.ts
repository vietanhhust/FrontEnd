import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { GuideService } from 'src/app/core/services/system/guideConfig.service';
import { EnumModule } from 'src/app/common/constants/global/Enums';
import { GuideModel } from 'src/app/core/models/system/guide.model';
import { PopupService } from 'src/app/shared/services/popup.service';
import { GuideShowComponent } from '../guide-show.component';
import { PopupCountService } from 'src/app/shared/services/popupCount.service';

@Component({
  selector: 'guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.scss']
})
export class GuideListComponent implements OnInit {

  guidId: number = 0;
  listener: any;
  isOpen = false;

  // Truyền mã code thành "_blank" nếu muốn là gợi ý phím tắt
  @Input() guideCode: string;

  // Truyền type khi hướng dẫn là phím tắt
  @Input() type: boolean;
  showlist = false;
  constructor(private guideService: GuideService, private popup: PopupService,
    private renderer: Renderer2) {

  }

  ngOnInit(): void {
    let $this = this;
    this.listener = this.renderer.listen('body', 'keydown.F1', (e) => {
      if (!this.isOpen) {
        this.loadGuide();
      }
      e.preventDefault();
    })
    console.log(this.guideCode)
  }

  openGuide(data: GuideModel[]) {
    let $this = this;
    this.popup.open(GuideShowComponent, { model: data, type: this.type }, (res) => {
      $this.isOpen = false;
    }, ['modal-fullscreen']);
  }

  loadGuide() {
    this.guideService.getGuideByCode({ moduleId: EnumModule.Guide }, this.guideCode).subscribe(data => {
      this.openGuide(data);
      this.isOpen = true;
    })
  }

}
