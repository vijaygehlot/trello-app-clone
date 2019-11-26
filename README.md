## Trello-app-clone
It's a Trello-app clone. user can authenticate and create a their specific board and add list of project phases . user can add task card on specific list.


## Requirements

Node.js and MySQL installed

## Installation and Usage on Local Machine

1. Clone the repo:

```
$ git clone https://github.com/vijaygehlot/trello-app-clone.git

```

2. Add parameters in order to connect to MySQL on your machine:



Inside ```/index.js``` paste this block of code, change ```user``` and ```password``` and save the file:

```
// Mysql Configuration---
var connection = mysql.createConnection({
  host: "localhost",
  user: "<USER_NAME>",
  password: "<USER_PASSWORD>",
  database: "<DB_NAME>"
});
```

3. Install server-side dependencies:

```
$ npm install
```

5. Build the app:

```
$ npm run build
```

6. Run the server:

```.
$ node index.js
```


The application should now run on <code>localhost:3000</code>

## Tech Stack

* Node/Express
* MySQL
* Matertail-UI
