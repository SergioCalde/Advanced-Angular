import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal  } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';

import { PokemonsList } from "../../pokemons/components/pokemons-list/pokemons-list";
import { PokemonListSkeleton } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton";
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {

  private pokemonsService = inject(Pokemons);

  public pokemons =  signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  
  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => ( isNaN(+page) ? 1 : +page ) ),
      map(page => Math.max(1, page) )
    )
  );


  
  // public isLoading = signal(true);
  
  // private appRef = inject(ApplicationRef);
  
  // private $appState = this.appRef.isStable.subscribe((isStable) => { 
    //   console.log('Application is stable:', isStable);
    // });
    
    
  ngOnInit(): void {



    // setTimeout(() => {
      //   this.isLoading.set(false);
      // }, 5000);
    this.loadPokemons();
  }

  public loadPokemons( page = 0 ) {

    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } }) ),
        tap( () => this.title.setTitle(`Pokemons SSR - Page ${ pageToLoad }`) )
      )
      .subscribe( this.pokemons.set );

  }

    
  // ngOnDestroy(): void {
  //   // this.$appState.unsubscribe(); 
  // } 

}
