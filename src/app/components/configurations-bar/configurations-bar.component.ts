import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Configuration} from '../../interfaces/configuration';
import {TodosLocalStorageService} from '../../services/todos-localstorage.service';

@Component({
  selector: 'app-configurations-bar',
  templateUrl: './configurations-bar.component.html',
  styleUrls: ['./configurations-bar.component.scss']
})
export class ConfigurationsBarComponent implements OnInit {

  @Input() configuration: Configuration;
  @Output() configurationChange = new EventEmitter();

  showConfiguration = false;
  shareListId: string = undefined;

  constructor(private todosLocalStorageService: TodosLocalStorageService) {
  }

  onCloudStorageChange() {
    this.configuration.storeInCloud = !this.configuration.storeInCloud;
    this.todosLocalStorageService.setConfiguration(this.configuration);
    this.configurationChange.emit('storeInCloud');
  }

  onHideCompletedChange() {
    this.configuration.hideCompleted = !this.configuration.hideCompleted;
    this.todosLocalStorageService.setConfiguration(this.configuration);
    this.configurationChange.emit('hideCompleted');
  }

  onAllowDeleteChange() {
    this.configuration.allowDelete = !this.configuration.allowDelete;
    this.todosLocalStorageService.setConfiguration(this.configuration);
    this.configurationChange.emit('allowDelete');
  }

  ngOnInit(): void {
  }
}
