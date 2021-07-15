// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CONFIG_LOCATION: 'http://localhost:8080/hardware/api/v1/config?used_for=app',
  LOG_LOADER_URL: '../assets/data/config/log-loader.json',
  LOG_LEVEL: 0,
  TABLE_PAGE_SIZE: [5, 10, 25],
  SECRET_KEY: 'mySecretKey',
  MENU_LOCATION: '../assets/data/config/sidenav.menu.json',
  LOGIN_PERSISTENCE_NAME: 'userToken',
  USER_DATA_KEY: 'user_data',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
