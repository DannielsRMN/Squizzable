import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temas-modulo',
  standalone: false,
  templateUrl: './temas-modulo.component.html',
  styleUrl: './temas-modulo.component.css'
})
export class TemasModuloComponent {

  constructor(private route: ActivatedRoute) { }

  modulo: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.modulo = params['modulo'] || '';
    console.log(params);
  });
  }

}
