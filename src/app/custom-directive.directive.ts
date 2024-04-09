import { Directive, ElementRef, HostBinding, HostListener, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { consumerDestroy } from '@angular/core/primitives/signals';

@Directive({
  selector: '[appCustomDirective]',
  standalone: true
})
export class CustomDirectiveDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'border-color',
      (this.el.nativeElement.value != '') ? 'blue' : 'red'
    );
  }
  
  ngOnInit(): void {
    console.log(this);
  }
}


@Directive({
  selector: '[auto-capital]',
  standalone: true,
})
export class AutoCaptialDirective {
  @HostBinding('style.color') color!: string;
  @HostBinding('style.border-color') br_color!: string;
  constructor(private el: ElementRef) { }
  @HostListener('input', ['$event.target.value']) output(value: string): void {
    this.el.nativeElement.value = value.toLocaleUpperCase();
    this.color = 'Green';
    this.br_color = 'Yellow';
  }
}