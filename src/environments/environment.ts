// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseWebUrl: "http://localhost:4200",
  firebase: {
    apiKey: "AIzaSyBUKtstduEJu1iM2efDuUV0lBpv6QMrtCQ",
    authDomain: "chatitgood.firebaseapp.com",
    projectId: "chatitgood",
    storageBucket: "chatitgood.appspot.com",
    messagingSenderId: "516541012128",
    appId: "1:516541012128:web:cc7f78304b2381558711c5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
