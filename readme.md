
# Car data storage

## employee.json

The productNumber is unique

```json
[
    {
        "productNumber": 4,
        "model": "Moustin",
        "maxspeed": 130,
        "rating": "*",
        "year": 2005
    },
    {
        "productNumber": 2,
        "model": "Ovlov",
        "maxspeed": 350,
        "rating": "*",
        "year": 1920
    },
]
```

### Public API (methods of Datastorage)

#### dataStorageLayer.js

- getAll()
    - return an array of all cars / []


- getOne(productNumber)
    - return a car object / NOT FOUND


- insert(car)
    - return INSERT_OK / NOT_INSERTED / ALREADY_IN_USE


- update(car)
    - returns UPDATE_OK / NOT_UPDATE


- remove(productNumber)
    - return REMOVE_OK / NOT_FOUND / NOT_REMOVED


### Private API

#### readerWriter.js
- readerStorage(storageFile)
    - return an array of cars / []


- writeStorage(storageFile, data)
    - return true / false

#### storageLayer.js

- getAllFromStorage()
    - return an arrays of cars / []

- getOneFromStorage(productNumber)
    - return a car object / null

- addToStorage(newCar)
    - return true / false

- updateStorage(updatedCar)
    - return true / false

- removeFromStorage(productNumber)
    - return true / false


### status code and messages

```js
const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK:2,
    ....
}
```

The format of a status message is:

(status types are `error` or `info`)


### Dependencies:
```shell
npm install express ejs
```

Start with:
```shell
node index.js
```


### Screenshots:
Menu:
![screenshot](Screenshot_menu.png?raw=true "car storage menu")
![screenshot](Screenshot_getAll.png?raw=true "get all cars")
![screenshot](Screenshot_remove.png?raw=true "get all cars")
![screenshot](Screenshot_update.png?raw=true "get all cars")

### Credits:

- Ilkka's lessons and model server at Business College Helsinki

- Background photo by <a href="https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Bishop</a> on <a href="https://unsplash.com/s/photos/road?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  