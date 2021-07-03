import { Directive, OnInit, OnDestroy, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLifeCycle]'
})
export class LifeCycleDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  constructor() {
    this.logLifeCycle('Constructor');
  }

  ngOnInit(): void {
    this.logLifeCycle('OnInit');
  }

  ngAfterViewInit(){
    this.logLifeCycle('AfterViewInit');
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.logLifeCycle(`OnChanges: ${changes}`);
  }

  ngOnDestroy(): void {
    this.logLifeCycle('OnDestroy'); 
  }

  private logLifeCycle(hook: string) {
    console.log(`Spy LifeCycle: ${hook}`);
  }
  

}
