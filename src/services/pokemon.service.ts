import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PokemonService {

    constructor(private http: HttpClient) {
    }

    GetPokemos() {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;
        return this.http.get<any>(url);
    }

    GetDetailPokemon(pokemon: string) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        return this.http.get<any>(url);
    }

}
