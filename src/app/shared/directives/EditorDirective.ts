import {OnInit, OnDestroy, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core'
import { PopupService } from '../services/popup.service';
import { EditorComponent } from '../components/editor/editor.component';
@Directive({
    selector: '[editor]'
})
export class EditorDirective implements OnInit{
    @Input() editor: string;    
    constructor(public elf: ElementRef,private popup: PopupService, 
                private renderer: Renderer2){
    }
    self: any; 
    @HostListener('dblclick') onClickElement(){
        setTimeout(() => {
            this.popup.open(EditorComponent, {language:this.editor, element: this.self.elf}, ()=>{},["fullmanhinh"]);
           // console.lo
        }, 20);
    }
    ngOnInit(){
        console.log(this.editor);
        setTimeout(()=>{
            this.self = this; 
            if(this.elf.nativeElement.value!= ""){
                this.renderer.setStyle(this.elf.nativeElement, 'border-bottom', '1px solid blue');
                this.renderer.setStyle(this.elf.nativeElement, 'color','white')
                this.renderer.addClass(this.elf.nativeElement,'unselectable');
            }
            else{
                this.renderer.setStyle(this.elf.nativeElement, 'border-bottom','2px solid red');
                this.renderer.setProperty(this.elf.nativeElement, 'placeholder','chưa có code');
                this.renderer.setStyle(this.elf.nativeElement, 'color','white')
            }
        },2)
    }
    @HostListener('click') onClickEle(){
        console.log(this.elf.nativeElement.value);
    }
    
}