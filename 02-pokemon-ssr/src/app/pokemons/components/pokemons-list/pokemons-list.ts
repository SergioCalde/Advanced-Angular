import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemons-list',
  imports: [PokemonCard],
  templateUrl: './pokemons-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsList { 

  public pokemons = input.required<SimplePokemon[]>();

}
