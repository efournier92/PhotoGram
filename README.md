# PhotoGram

## Contents
- [Overview](#overview)
- [Development Philosophy](#development-philosophy)
- [Stack](#stack)
- [Build](#build)
- [Test](#test)
- [Firebase Integration](#firebase-integration)
- [Contribute](#contribute)
- [License](#license)

## Overview
A small demo application that displays a feed of photos. Photo content is fed from static data in this repo, but can be fed dynamically 
via [Firebase](https://firebase.google.com/) with the steps outlined in [Firebase Integration](#firebase-integration). This app was built to accompany a presentation on [Firebase](https://firebase.google.com/), to demonstrate how simple integrations with this platform can be.

## Stack
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/)
- [Firebase Hosting](https://firebase.google.com/products/hosting/)
- [Firebase Storage](https://firebase.google.com/products/storage)
- [Firebase Authentication](https://firebase.google.com/products/auth/)
- [SCSS](https://sass-lang.com)
- [Bootstrap](https://getbootstrap.com/)
- [RxJS](http://reactivex.io/)

## Build

### Install Packages
```bash
npm install
```

### Local

```bash
ng serve
```

### Production

```bash
ng build --prod
```

## Test

```bash
ng test
```

## Firebase Integration

### Use the following steps to add Firebase functionality

#### 1. In `configs.ts`, replace `API_KEY` and `PROJECT_ID` with values from your Firebase dashboard
```typescript
export const FireConfig = {
  apiKey: "API_KEY",
  databaseURL: "https://PROJECT_ID.firebaseio.com/",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
};
```

#### 2. In `configs.ts`, update `FireAuthConfig` with your preferred provider configuration
```typescript
export const FireAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};
```

#### 3. In `app.component.ts`, add the following subscribe statement to `ngOnInit()`
```typescript
this.authService.currentUserObeservable.subscribe(
  (user: User) => this.user = user
)
```

#### 4. In `photos.service.ts`, add the following properties
```typescript
private allPhotosSubject = new BehaviorSubject({});
public readonly allPhotosObservable = this.allPhotosSubject.asObservable();

updateAllPhoto(photos: Photo[]) {
  this.allPhotosSubject.next(photos);
}
```

#### 5. In `photos.service.ts`, uncomment all commented lines

#### 6. In `photos.component.ts`, add the following subscribe statement to `ngOnInit()`
```typescript
this.photoService.allPhotosObservable.subscribe(
  (photos: Photo[]) => this.allPhotos = photos,
)
```

#### 7. In `sidenav.component.ts`, add the following subscribe statement to `ngOnInit()`
```typescript
this.photoService.allPhotosObservable.subscribe(
  (photos: Photo[]) => this.allPhotos = photos,
)
```

#### 8. Deploy the application
```bash
firebase init
```
```bash
ng build --prod
```
```bash
firebase deploy
```

## Contribute
If you have feature suggestions, please contact me here or at efournier92@gmail.com. If you'd like to submit a pull request, please feel free to, and I'll review merge it at my earliest convenience!

## License
This project is provided under the [`MIT`](https://opensource.org/licenses/MIT) licence and I hereby grant rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software without limitation, provided the resulting software also carries the same open-source licensing statement.
