import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() name!: string;
  @Output() search = new EventEmitter();

  handleSearchClick() {
    this.search.emit();
  }
}

