import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  uname = "";
  // @Output() showEnd: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router){}
  validateNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const filteredValue = value.replace(/[^0-9.]|(?<=\..*)\./g, '');
  
    if (filteredValue !== value) {
      inputElement.value = filteredValue;
      this.uname = filteredValue;
    }

    if (this.uname === "666.666") {
      // this.showEnd.emit(true);
      this.router.navigate(['/magazine']);
    }
  }
}
