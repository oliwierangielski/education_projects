import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showEnd = false;

  handleShowEnd(value: boolean) {
    this.showEnd = value;
  }
}
