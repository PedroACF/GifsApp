import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interfaces/gif.interface";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private serviceUrl = "https://api.giphy.com/v1/gifs";
  private apiKey: string = 'YwVlytVERYlawqi71uSbX1yPpgqofxMU';
  private _historial: string[] = [];
  public resultados: Gif[] = [];
  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // tslint:disable-next-line:no-non-null-assertion
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // tslint:disable-next-line:no-non-null-assertion
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string): void{

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "10")
      .set("q", query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }

}
