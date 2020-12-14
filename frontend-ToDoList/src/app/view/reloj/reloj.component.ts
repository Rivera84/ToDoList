import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css']
})
export class RelojComponent implements OnInit {

  @ViewChild('hrHand', {static: false}) hrHand: ElementRef;
  @ViewChild('minHand', {static: false}) minHand: ElementRef;
  @ViewChild('secHand', {static:false}) secHand: ElementRef;

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      const date = new Date();
      this.updateClock(date);
    },1000);
    this.getHours();
  }

  updateClock(date){
    this.secHand.nativeElement.style.transform = 'rotate(' +
            date.getSeconds()*6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
            date.getMinutes()*6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
          (date.getHours()*30 + date.getMinutes()*0.5)+ 'deg)'; 
  }

  getHours(){
    const date = new Date();
    const hora = date.getHours();
    return hora;
  }

}
