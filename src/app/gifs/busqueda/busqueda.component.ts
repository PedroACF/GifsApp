import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../services/gifs.service";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsServices: GifsService) {
  }

  search(): void{
    const value = this.txtSearch.nativeElement.value;
    if(value.trim().length === 0){
      return;
    }
    this.gifsServices.buscarGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
