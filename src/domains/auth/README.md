# Auth

Domain consists of:

- `AuthPage`
- `AuthInfo` module
- `withAuthRedirect` hoc

#### External deps
- `userInfo` { isAuth }

#### Vocabulary
- `isAuth` – person is authorized.
- `!isAuth` – person is no authorized.

### `AuthInfo` module

Module is shown for all pages (TODO SVG-20 should hide it on AuthPage).
- `!isAuth`: login button is shown, it navigates user to `AuthPage`.
- `isAuth`: username and logout is shown.

### `AuthPage`
url `/login` (TODO SVG-21 move url to domain).
- `!isAuth`: login form is shown. After login `UserInfo` is updated (+ TODO SVG-20 there is redirect to previous page).
- `isAuth`: (TODO SVG-20 redirect to main page `/`)

### `withAuthRedirect`
- `!isAuth`: if any page is wrapped by hoc, user is redirected to `AuthPage`.
Otherwise – user can visit any page not wrapped by `withAuthRedirect`.
- `isAuth`: nothing happens.

## Scenarios

1) Unauthorised user comes to protected page (f.e. team)
2) System redirects user to login page
3) User logins successfully
4) (TBD) User is redirected to previous page (f.e. team)

[More on Miro](https://miro.com/app/board/o9J_ksGbQ74=/?moveToWidget=3458764519487810631&cot=14)
