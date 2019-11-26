## Trello-app-clone
It's a Trello-app clone. user can authenticate and create a their specific board and add list of project phases . user can add task card on specific list.


![trello1](https://user-images.githubusercontent.com/26818479/69648774-f2ead500-1091-11ea-936a-7ebaab84a1e1.png)
![trello2](https://user-images.githubusercontent.com/26818479/69648844-1746b180-1092-11ea-91e6-8ee53f926015.png)


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


The application should now run on <code>localhost:5000</code>

## Tech Stack

* Node/Express
* MySQL
* Matertail-UI

# Rest-Full-API using nodejs and express framwork  
  [nodejs]: https://docs.npmjs.com/getting-started/installing-node
  
**Quick start guide list:**

  * Install NodeJs
  * Create mysql database.
  * Install jsonwebtoken and bcrypt module 
     * npm install jsonwebtoken
     * npm install bcrypt
     
 
**API check list**
  
  * http://localhost:3000//boards/list
     
     * This API is return all board's  if the following conditions are matched 
       * Method : GET 
       * If user is loggedIn then pass JWT token into header then verify JWT token
       * If user is not loggedIn then this will return on home page.
          
           * http://localhost:5000//lists/list 
     
     * This API is return all boards list if the following conditions are matched 
       * Method : GET 
       * If user is loggedIn then pass JWT token into header then verify JWT token and user can create lists
       * If user is not loggedIn then this will return on home page.
          
           * http://localhost:5000//cards/card 
     
     * This API is return all card's list if the following conditions are matched 
           * Method : GET 
       * If user is loggedIn then pass JWT token into header then verify JWT token user can add cards
       * If user is not loggedIn then this will return on home page
        
   * http://localhost:5000//signup
      * This API is used for register customer using following condition's
        * Method : PUT (reason for put methods here because we want to insert new resource )
        * In this API just pass header Content-Type: application/json or whatever you want in to response 
        * The purpose to use this API is to register user with the specific role like : user
        
          
   * http://localhost:5000/authentication
      * This API is used for login of the user using the following condition 
        * Pass email/password of the user header Content-Type: application/json or whatever you want in to response.
        * If the user is registered user then this will return JWT token with message : "user is logged"
        * If the user is not found then simply return message": "User not found."
        
    
  * http://localhost:5000/boards
       * Method : POST
       * user can create/add Boards 
        Links: https://drive.google.com/file/d/1CInwrTVvdcPLCXvmuaFO1V_SMUDwVxNq/view?usp=drivesdk
        
  * http://localhost:5000/lists 
       * Method : POST
       * This API is use to create  all lists which related with boards
       * The role of the user can add list
       * This just return { message: 'List has been Created' } if user otherwise 
         { message: "Query Failed!" }
         
    * http://localhost:5000/cards 
       * Method : POST
       * This API is use to create  all cards which related with lists
       * The role of the user can add cards
       * This just return { message: 'Cards has been Created' } if user otherwise 
         { message: "Query Failed!" }
         
 Code Explanation : 
 
 * Middleware 
    * The purpose to add middleware here is to check if the user is passing JWT token or not 
      Before calling API 
    * If user passing JWT token then we assign the user is defined 
   
 
