Lobby – room to gather all teammates, tune and start game

https://miro.com/app/board/o9J_ksGbQ74=/?moveToWidget=3458764538264907589&cot=14

### Test plan (TODO SVG-7 add autotests):

#### #TC1 Open page with nav (/lobby)

Result:

- teamname is default, can be edited
- tsid is setted to URL
- sharing session link contains same tsid
- me – user data is shown
- teammates – 1 current user with creator flag

#### #TC2 Reload page when user isCreator with tsid in URL

Result:

- same tsid in URL and link
- teammates – current user in list with creator flag
- teammates – if there are another users, they are displayed too

#### #TC3 Open page by following sharing session link (first time)

Result:

- same tsid in URL and link
- teamname is not editable
- teammates – in lits minimum 2 users: current user + creator

#### #TC4 Editing team name by Creator

Result:

1. Creator click team name → input is shown with focus and selected value
2. Аfter editing Creator clicks submit

- input hides
- updated team name is visible
- all other teammates see updated team name on their pages too
