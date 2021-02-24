import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-component-loading',
  templateUrl: './component-loading.component.html',
  styleUrls: ['./component-loading.component.scss']
})
export class ComponentLoadingComponent implements OnInit {

  @Input() type: 'horizental' | 'circular';
  @Input() bodyTemplate: TemplateRef<any>;
  @Input() isLoading: boolean;
  constructor() {
  }

  ngOnInit(): void {
  }

}
