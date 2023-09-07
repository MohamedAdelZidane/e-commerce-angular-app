import { asNativeElements, Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[LightBox]'
})

export class LightBoxDirective implements OnChanges {

  @Input('LightBox') highLightColor: string = "yellow";
  @Input() defaultColor: string = "darkblue";
  constructor(private elementRef: ElementRef) {
    // nativeElement zay document.getElementsById
  }
  ngOnChanges(): void {
    this.elementRef.nativeElement.style.border = `2px solid ${this.defaultColor}`
  }

  @HostListener('mouseover') onMouseOover() {
    this.elementRef.nativeElement.style.border = `2px solid ${this.highLightColor}`
  }

  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style.border = `2px solid ${this.defaultColor}`
  }

}
