# Convert number to Uzbek-latin and Uzbek-cyril

## Install

Use the package manager [npm] to install:

```
npm install number-to-words-uz
```

## Usage

```javascript
const numberToWordsUz = require("number-to-words-uz");
```

#### or

```javascript
import numberToWordsUz from "number-to-words-uz"; // ES6
```

## Using

```javascript
numberToWordsUz.convert(132, { lang: "uzLatin" });
```

#### or

```javascript
numberToWordsUz.convert(132); // default lang: uzCyril
numberToWordsUz.convert(-132);
```

## API

#### `convert(number[, options])`

Currently supported languages are:
| Language | lang |
| ------ | -------|
| Uzbek latin | `uzLatin` |
| Uzbek cyril | `uzCyril` |

> By default `uzCyril`

## Licence

[MIT](https://choosealicense.com/licenses/mit/)
