# Chronos - Simple state management

Chronos is a simple state management library written in TypeScript, transpiled to JavaScript with Gulp. After initializing and enabling new Chronos object will start tracking history. Because object tracks its history you can take undo and redo actions on it.

## USAGE

You can see the example in demo folder of this repository!\

Code example:

```javascript

const Chronos = require('../src/dist');
const chrono = new Chronos();

chrono.enable();

chrono.test = 'TEST';
chrono.test = 'NEW TEST';

console.log(chrono.test); // should be NEW TEST
chrono.undo();
console.log(chrono.test); // should be TEST
chrono.redo();
console.log(chrono.test); // should be NEW TEST
chrono.undo();
console.log(chrono.test); // should be TEST

chrono.disable();

```

## DEVELOPMENT

Chronos uses nodemon, jest and gulp for fast developing.

Make a change in your file and instantanously see your updates!

make sure you run npm ci before running these commands

Open your favorite Terminal and run these commands.

First Tab:

```sh
nodemon demo
```

Second Tab:

```sh
jest --watchAll --verbose
```

Third Tab:

```sh
gulp
```

Chronos uses following dev dependencies:

| **DEV DEPENDENCY**  | WHAT IS IT?                                                                       | PACKAGE URL                    |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------ |
| **JEST**            | JavaScript testing solution                                                       | [jest][jest]                   |
| **NODEMON**         | automatically restart application when file changes in the directory are detected | [nodemon][nodemon]             |
| **DEL**             | Delete files and folders                                                          | [del][del]                     |
| **GULP**            | Automate and enhance your workflow                                                | [gulp][gulp]                   |
| **GULP PLUMBER**    | Prevent pipe breaking caused by errors from gulp plugins                          | [plumber][plumber]             |
| **GULP SOURCEMAPS** | Inline source maps                                                                | [sourcemaps][sourcemaps]       |
| **GULP TYPESCRIPT** | A gulp plugin for handling TypeScript compilation workflow                        | [gulp typescript][gtypescript] |
| **GULP UGLIFY**     | Minify JavaScript with UglifyJS3                                                  | [uglify][uglify]               |
| **TSLINT**          | TSLint is an extensible static analysis tool that checks TypeScript code          | [tslint][tslint]               |
| **TYPESCRIPT**      | TypeScript is a language for application-scale JavaScript                         | [typescript][typescript]       |

## LICENSE

MIT License [LICENSE][license]

## AUTHOR

Nikola Kovacevic

Created on January 2019

[//]: #
[license]: https://github.com/nikola-kovacevic/chronos/blob/master/LICENSE
[jest]: https://www.npmjs.com/package/jest
[nodemon]: https://www.npmjs.com/package/nodemon
[del]: https://www.npmjs.com/package/del
[gulp]: https://gulpjs.com/
[plumber]: https://www.npmjs.com/package/gulp-plumber
[sourcemaps]: https://www.npmjs.com/package/gulp-sourcemaps
[gtypescript]: https://www.npmjs.com/package/gulp-typescript
[uglify]: https://www.npmjs.com/package/gulp-uglify
[tslint]: https://www.npmjs.com/package/tslint
[typescript]: https://www.npmjs.com/package/typescript
