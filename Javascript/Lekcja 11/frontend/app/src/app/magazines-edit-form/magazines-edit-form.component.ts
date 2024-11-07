import { Component } from '@angular/core';
import { DataLoaderService} from '../data-loader.service'
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-magazines-edit-form',
  templateUrl: './magazines-edit-form.component.html',
  styleUrls: ['./magazines-edit-form.component.css']
})

export class MagazinesEditFormComponent {
  options = ["1982", "1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "nr specjalne"]
  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  displayedColumns: string[] = ['pismo', 'miniatura', 'lata', 'zatwierdz', 'usun'];
  constructor(private dataService: DataLoaderService, private http: HttpClient){
    this.dataService = dataService
  }

  async ngOnInit() {
    let magazyny = await this.dataService.loadMagazinesData() as any
    let magazines: Array<any> = []
    for(let i in magazyny.czasopisma.zmienne){
      magazines.push({pismo: i, miniatura: magazyny.czasopisma.zmienne[i].src, klik: magazyny.czasopisma.zmienne[i].klik, lata: magazyny.czasopisma.lata[i].split(",") })
    }
    console.log(magazines)
    this.dataSource = new MatTableDataSource(magazines);
  }

  delete(magazine: any){
    const acc = 'del'; // Określ akcję (np. 'add', 'del', 'exc')
    const url = 'http://localhost/magazines/index.php';

    
    const body = new FormData();
    body.append('acc', acc);
    body.append('pismo', magazine.pismo);
    body.append('miniaturka', "");
    body.append('wybraneOpcje[]', "");
    // for (let i = 0; i < this.wybraneOpcje.length; i++) {
    //   body.append('wybraneOpcje[]', this.wybraneOpcje[i]);
    // }

    this.http.post(url, body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateForm(e: any, type: string, source: string){
    const acc = 'exc'; // Określ akcję (np. 'add', 'del', 'exc')
    const url = 'http://localhost/magazines/index.php';
    const body = new FormData();
    body.append('acc', acc);
    
    switch(type){
      case "pismo":
        body.append('pismo', e?.target?.value);
        break;
      case "miniaturka":
        body.append('miniaturka', e?.target?.value);
        break;
      case "lata":
        console.log(e?.value)
        body.append('wybraneOpcje[]', e.value);
        break;
    }

    body.append('source', source)
    

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
