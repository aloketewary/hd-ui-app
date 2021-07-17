import { Component, Inject, OnInit } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
  selector: 'app-no-network',
  templateUrl: './no-network.component.html',
  styleUrls: ['./no-network.component.scss']
})
export class NoNetworkComponent implements OnInit {

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) { }

  ngOnInit(): void {
  }

}
