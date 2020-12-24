import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-loading-elm',
  template: `
<div class="overlay-loading">
  <div class="center loadingio-spinner">
  <img src="assets/images/logoload.png">
    <div class="loadercss">
        <div>
        </div>
    </div>
 </div>
</div>
  `
})
export class OverlayLoadingElmComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
