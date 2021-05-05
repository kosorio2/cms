import { templateJitUrl } from '@angular/compiler';
import { Component } from '@angular/core';

@Component ({
  selector: 'cms-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
