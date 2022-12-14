import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfece';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string   = 'IXk8ytNuXLbi4D8MC4Q1OP4qm4UE6ojl';
  private _historial: string[] = [];
  //TODO cambiar ant con su tipo crreop
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if( localStorage.getItem('historial') ){
    // this._historial = JSON.parse(localStorage.getItem('historial')!)
  
      //}

  }

  buscarGifs ( query: string = ''){
    
    query = query.trim().toLocaleLowerCase(); 
console.log(query);

    if( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.slice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));


    }
    
    // fetch(`api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&q=pokemon`)
    //oBSERVABLES
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=IXk8ytNuXLbi4D8MC4Q1OP4qm4UE6ojl&q=${query}&limit=20`)
    .subscribe( (resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));

      
      
    } )  


    

  }

}
