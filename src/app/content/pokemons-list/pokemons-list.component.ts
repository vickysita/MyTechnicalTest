import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/services/auth.service';
import { PokemonService } from 'src/services/pokemon.service';
import { SweelAlertService } from 'src/services/sweetAlert';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';
import { SpinnerService } from 'src/app/shared/spinner.service';

export interface Pokemon {
  name: string;
}

export interface Moves {
  name: string;
}

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PokemonsListComponent implements OnInit {
  _sweel: SweelAlertService = new SweelAlertService();
  expandedElement: Pokemon | null = null;

  displayedColumns: string[] = ['index', 'name', 'ver'];
  dataSource = new MatTableDataSource<Pokemon>();
  displayedColumns2: string[] = ['name'];
  dataSource2 = new MatTableDataSource<any>();
  img: string = '';
  listPokemons: Pokemon[] = [];
  listMoves: Moves[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemon: PokemonService, private paginator2: MatPaginatorIntl, public dialog: MatDialog, public spinnerService: SpinnerService) {
    this.paginator2.itemsPerPageLabel = "Registros por página";
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.pokemons();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pokemons() {
    this.spinnerService.loading = true;
    this.listPokemons = [];

    this.pokemon.GetPokemos().subscribe(res => {
      if (res.results.length > 0) {
        let position = 1;
        res.results.forEach((element: { name: any; }) => {
          let objeto = {
            index: position,
            name: element.name
          }
          position = position + 1;
          this.listPokemons.push(objeto);
        });

        this.dataSource = new MatTableDataSource<any>(this.listPokemons);
        this.dataSource.paginator = this.paginator;
        this.spinnerService.loading = false;
      } else {
        this._sweel.alertWarning("Atención", "No hay pokémons para mostrar.");
      }
    })
  }


  toLowerCase(input: string): string {
    if (input.length === 0) {
      return input;
    }
    return input.charAt(0).toLowerCase() + input.slice(1);
  }

  detailPokemon(pokemon: string) {

    this.spinnerService.loading = true;
    this.listMoves = [];

    this.pokemon.GetDetailPokemon(pokemon).subscribe(res => {
      if (res.moves.length > 0) {
        this.dataSource2 = new MatTableDataSource<any>(res.moves);
        this.img = res.sprites.front_default;
        this.spinnerService.loading = false;
      } else {
        this._sweel.alertWarning("Atención", "No hay movimiento para mostrar.");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(pokemon: string): void {
    this.detailPokemon(pokemon);
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
      width: '200px',
      height: 'auto',
      data: { img: this.img, name: pokemon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
