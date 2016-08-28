# Boot Camp API

[Boot Camp API](https://bootcamp-dev.azurewebsites.net)

## Getting Start

  ```
git clone https://github.com/boybundit/bootcamp-dev.git
cd bootcamp-dev
npm install
set DB_USERNAME=username
set DB_PASSWORD=password
node src/server.js
  ```

## Test

To run mocha test

```
npm test
  ```
  
## Documentation

To generate API documentation using apidoc

  ```
npm run apidoc
  ```

## Azure Debug Console

https://bootcamp-dev.scm.azurewebsites.net/DebugConsole

## Contribution

Check out (or create new one if not exists) feature branch, then push it back to GitHub.
  ```
git checkout -b feature-name master
git push origin feature-name
  ```
  
Update the code and commit in logical chunk. Repeat.
  ```
git add .
git commit -m "Meaningful comment"
  ```
  
Update it back in GitHub when you go out to get coffee.
  ```
git push origin feature-name
  ```

When the feature is ready, create a [pull request](https://github.com/boybundit/bootcamp-api/pulls) in GitHub.

To update local branch with origin/master.
 ```
git checkout master
git pull
git checkout feature-name
git merge master
git push origin feature-name
  ```
  