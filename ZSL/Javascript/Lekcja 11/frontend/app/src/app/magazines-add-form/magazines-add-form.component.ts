import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-magazines-add-form',
  templateUrl: './magazines-add-form.component.html',
  styleUrls: ['./magazines-add-form.component.css']
})
export class MagazinesAddFormComponent {
  options = ["1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","nr specjalne"]
  pismo: string = "";
  miniaturka: string = "";
  wybraneOpcje: string[] = [];

  constructor(private http: HttpClient) { }

  postForm() {
    const acc = 'add'; // Określ akcję (np. 'add', 'del', 'exc')
    const url = 'http://localhost/magazines/index.php';
    console.log(this.pismo)
    const body = new FormData();
    body.append('acc', acc);
    body.append('pismo', this.pismo);
    body.append('miniaturka', this.miniaturka);
    for (let i = 0; i < this.wybraneOpcje.length; i++) {
      body.append('wybraneOpcje[]', this.wybraneOpcje[i]);
    }

    this.http.post(url, body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

 

}
