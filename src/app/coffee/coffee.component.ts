import { Component, OnInit } from '@angular/core';
import { Coffee } from './coffee';
import { CoffeeService } from './coffee.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent implements OnInit {
  public coffees: Array<Coffee> = [];
  public blendNum: number = 0;
  public originNum: number = 0;

  constructor(private coffeeService: CoffeeService) {}

  updateCounts() {
    this.blendNum = 0;
    this.originNum = 0;
    this.coffees.forEach((coffee) => {
      coffee.tipo === 'Blend' ? this.blendNum++ : this.originNum++;
    });
  }

  getCoffees(): void {
    this.coffeeService.getCoffees().subscribe((coffees) => {
      this.coffees = coffees;
      this.updateCounts();
    });
  }

  ngOnInit() {
    this.getCoffees();
  }
}
