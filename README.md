# Boot Camp API

[Boot Camp API](https://bootcamp-dev.azurewebsites.net)

## Getting Start

  ```
git clone https://github.com/boybundit/bootcamp-dev.git
cd bootcamp-dev
npm install
set DB_USERNAME={{USERNAME}}
set DB_PASSWORD={{PASSWORD}}
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
git commit -m "{{MEANINGFUL_COMMENT}}"

Update it back in GitHub when you go out to get coffee.
  ```
git push origin feature-name
  ```
When the feature is ready, create a pull request in GitHub
