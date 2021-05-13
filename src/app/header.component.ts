import { templateJitUrl } from '@angular/compiler';
import { Component, Output, EventEmitter} from '@angular/core';

@Component ({
  selector: 'cms-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() selectedFeatureAction = new EventEmitter<string>(); //This is passing the information back up to the html page
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedAction(selectedAction: string) {
    this.selectedFeatureAction.emit(selectedAction);
  }

}
