import { Component, OnInit, Input, Inject } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {
  @Input() icon = 'inbox';
  @Input() message = 'COMMON.HERE_IS_NOTHING';
  @Input() transMessage = true;
  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) { }

  ngOnInit(): void {
  }

}
