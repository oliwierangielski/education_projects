import { Component } from '@angular/core';
import * as xml2js from 'xml2js';
import { DataLoaderService} from '../data-loader.service'


interface magazine  {
  image: string,
  name: string
}

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrls: ['./magazines.component.css']
})

export class MagazinesComponent {
  magazines: Array<magazine> = []
  constructor(private dataService: DataLoaderService){
    this.dataService = dataService
  }
  async ngOnInit() {
    let magazyny = await this.dataService.loadMagazinesData() as any
    Object.keys(magazyny.czasopisma.zmienne).forEach((e) => {
      let magazyn = magazyny.czasopisma.zmienne[e]
      this.magazines.push({image: magazyn.src, name: magazyn.klik})
    })
  }
  getImage(param: any){
    return "http://atarionline.pl/biblioteka/czasopisma/img/" + param.image
  }
}
