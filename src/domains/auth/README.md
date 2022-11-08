# Auth

Domain consists of:

- `AuthPage`
- `AuthInfo` module
- `withAuthRedirect` wrapper

#### External deps

- `userInfo/$userInfo` { isAuth }
- `ui/$isAppInitialized`

#### Vocabulary

- `isAuth` – person is authorized.
- `!isAuth` – person is no authorized.
- `isAppInitialized` – all necessary data is loaded

### `AuthInfo` module

Module is shown for all pages (TODO SVG-20 should hide it on AuthPage).

- `!isAuth`: login button is shown, it navigates user to `AuthPage`.
- `isAuth`: username and logout is shown.

### `AuthPage`

url `/login` (TODO SVG-21 move url to domain).

- `!isAuth`: login form is shown. After login `UserInfo` is updated (+ TODO SVG-20 there is redirect to previous page).
- `isAuth`: user is redirected to main page.

### `withAuthRedirect`

- `!isAuth`: if any page is wrapped by wrapper, user is redirected to `AuthPage` (if `isAppInitialized` true).
  Otherwise – user can visit any page not wrapped by `withAuthRedirect`.
- `isAuth`: nothing happens.

## Scenarios

1. Unauthorised user comes to protected page (f.e. team)
2. System redirects user to login page
3. User logins successfully
4. (TBD) User is redirected to previous page (f.e. team)

[More on Miro](https://miro.com/app/board/o9J_ksGbQ74=/?moveToWidget=3458764519487810631&cot=14)
