const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

//let app use module
app.use(express.json());
 app.use(express.urlencoded({
   extended: true
 }));
/**
 * ===================================
 * Routes
 * ===================================
 */

const pokemonStuff = () => {

    let execute = "<html>";
    execute += "<body>";
    execute += '<form method="POST" action="/pokemon">';
    execute += "Pokemon name:";
    execute += '<p>ID:<input type="text" name="id"><p>';
    execute += '<p>Num:<input type="text" name="num"><p>';
    execute += '<p>Name:<input type="text" name="name"><p>';
    execute += '<p>Img:<input type="text" name="img"><p>';
    execute += '<p>Height:<input type="text" name="height"><p>';
    execute += '<p>Weight:<input type="text" name="weight"><p>';
    execute += '<p>Input:<input type="submit" value="Submit"><p>';
    execute += "</form>";
    execute += "</body>";
    execute += "</html>";
      return execute;
};

  app.get('/pokemon/new', (request, response) => {
    response.send(pokemonStuff());
});

//pre-load with s/edits
app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    let pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId){
        pokemon = currentPokemon;
      }
    }
    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("wass wass up");
});

app.post('/pokemon', (request,response) => {
    console.log(request.body)

    var orderRequest = request.body
    let file = 'pokedex.json';

  let objectRide = {
    id: parseInt(orderRequest['id'],
    num: orderRequest['num'],
    name: orderRequest['name'],
    img: orderRequest['img'],
    height: orderRequest['height'],
    weight: orderRequest['weight']
  }

   // jsonfile.readFile(file, (err, obj) => {
      obj.pokemon.push(objectRide);

      jsonfile.writeFile(file, obj, function (err) =>  {
      if (err) {
        console.log("ERROR:",err)
      }
        respond.send('wass wass up?!?!?');
      });
    });
  // });



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
