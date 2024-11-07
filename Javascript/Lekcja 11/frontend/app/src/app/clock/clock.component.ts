import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent {
    time: number = Date.now()
    constructor(){
      setInterval(()=> {
        this.time = Date.now()
      }, 1000)
    }
}
