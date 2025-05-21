import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLoaderService} from '../data-loader.service'
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-years-form',
  templateUrl: './years-form.component.html',
  styleUrls: ['./years-form.component.css'],
})
export class YearsFormComponent {
  paramName: string;
  years: Array<string> = []
  year: string
  myFormControl = new FormControl();
  chosenMagazines?: MatTableDataSource<Array<any>>
  dataSource: MatTableDataSource<any> = new MatTableDataSource([{}]);
  displayedColumns: string[] = ['rok', 'nazwa', 'miniaturka', 'numer', 'plik' , 'format', 'skan', 'stron', 'wydawca', 'podeslal' , 'przetworzenie'];


  constructor(private route: ActivatedRoute, private dataService: DataLoaderService, private router: Router) {
    this.paramName = this.route.snapshot.paramMap.get("id") ?? ""; // dotyczy też queryParamMap
    this.year = this.route.snapshot.paramMap.get("year") ?? "";
    this.myFormControl.setValue(this.year)
    this.dataService = dataService
   }

   async ngOnInit() {

    let magazyny = await this.dataService.loadMagazinesData() as any
    if(magazyny.czasopisma.zmienne?.[this.paramName] == undefined){
      this.router.navigate(['magazine']);
    } else {
      this.years = magazyny.czasopisma.lata[this.paramName].split(",")
      if(this.years == undefined || (this.year != "" && !this.years.includes(this.year)))
        this.router.navigate(['magazine']);
    }


    this.myFormControl.valueChanges.subscribe((value) => {
      this.router.navigate(['magazine', this.paramName, value]);
    });

    this.route.paramMap.subscribe(params => {
      this.year = params.get('year')!;
      let array = []
    for(let i in magazyny.czasopisma[this.paramName]){
        if(magazyny.czasopisma[this.paramName][i].$.rok === this.year){
           array.push(magazyny.czasopisma[this.paramName][i])
        }
    }
    console.log(array)
    this.dataSource = new MatTableDataSource(array);
    });

  }

  
}
