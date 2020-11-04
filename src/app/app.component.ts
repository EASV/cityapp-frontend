import { Component } from '@angular/core';

@Component({
  selector: 'app-inno-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cityapp-frontend';
  showButton1 = true;
  buttons = ["A1", "A2", "A3", "Ost"];
  changeTitle() {
    this.title = 'snurf';
  }

  showFirstButton() {
    this.showButton1 = !this.showButton1;
  }
}
