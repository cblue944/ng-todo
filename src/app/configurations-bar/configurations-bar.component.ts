import {Component, Input, OnInit} from '@angular/core';
import {Configuration} from '../interfaces/configuration';

@Component({
  selector: 'app-configurations-bar',
  templateUrl: './configurations-bar.component.html',
  styleUrls: ['./configurations-bar.component.scss']
})
export class ConfigurationsBarComponent implements OnInit {

  @Input() configuration: Configuration;
  showConfiguration = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
