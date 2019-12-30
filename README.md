# AssignmentAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Build App
Go to the main folder and run npm install first to install all the packages. It will genrate all the pacakges inside node_modules folder.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Details
Application has two main routes

http://localhost:4200/login and http://localhost:4200/user-info.. If user is not  log in then it will go to the login route. However if user is already login in, it will rediret to user-info route.

There is a token intercepor which takes care of token expration.. so if user hits user-info route and token is already expired, it will regenerate the token by hitting expire token api and hit the api again.. So all the thing happened behind the scene and user never needs to login again.
