import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appJobCard]'
})
export class JobCardDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = '#f0f0f0'; 
  }
}