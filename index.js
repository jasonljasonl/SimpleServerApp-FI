const express   = require('express'); //appel et charge le package express
const Datastore = require('nedb'); //appel et charge du package nedb pour la base de donnée

const app       = express(); //créer l'application server
const database  = new Datastore('database.db');//créer la base de donnée et définir son nom pour la sauvegarde
database.loadDatabase(); //charge la base de donnée existante. Si celle-ci n'existe pas, cela créer le fichier

//l'application écoute ce qu'il se passe sur le port 3333
app.listen(3333, function(){
    console.log('listening at port 3333');
})

//on autorise l'application a donner l'accès au dossier static public depuis l'exterieur
app.use(express.static('public'));
//on défini que l'application recevra des données au format JSON d'une taille max de 1mb
app.use(express.json({limit: '1mb'}));

//on créer une fonction post permettant au client d'envoyer des requetes
app.post('/api/send', function(request, response){
    const data          = request.body; //on récupère les données

    const timestamp     = Date.now(); //on récupère la date au format unix
    data.timestamp      = timestamp; //on l'ajoute à la data

    database.insert(data); //on ajoute la data à la BDD

    // console.log(database);
    //on renvoie une réponse au client afin de spécifié que le serveur à bien reçu l'information
    response.json({
        status: 'data have been received',
        dataset : data
    });
});

//on créer une fonction get permettant de récupérer les donnée stocké sur le serveur
app.get('/api/get', function(request, response){
    database.find({}, function(err, data){
        if(err){
            //on gère le server en cas d'erreur
            response.end();
            return;
        }
        response.json(data);//on renvoie la réponse
    })
})