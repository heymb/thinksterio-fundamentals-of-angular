import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Movie } from './Movie';
import { MovieService } from './movie.service';
import { RentalListService } from './rental-list.service';

import { ThirdPartyService } from './third-party.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  flops$;
  rentalList:any = [];

  constructor(private movieService: MovieService, 
    private rentalListService: RentalListService, private thirdParty: ThirdPartyService) {
  }

  ngOnInit() {
    this.flops$ = this.movieService.getMovies();
    this.getRentalList()
    this.thirdParty.login(environment.username, environment.password);
  }

  getRentalList() {
    this.rentalListService.getRentalList()
    .subscribe(data => {
      this.rentalList = data;
    })
  }

  addToRentalList(flop) {
    this.rentalListService.addToRentalList(flop)
    .subscribe(() => {
      this.getRentalList();
    })
  }

  onDeleteItemFromList(flopId) {
    this.rentalListService.deleteItem(flopId)
    .subscribe(() => {
      this.getRentalList();
    })
  }

}
