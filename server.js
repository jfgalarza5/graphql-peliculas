const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const sequelize = require('./database/database');

const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);

Pelicula.belongsToMany(Actor, {
    through: Elenco,
    foreignKey: 'peliculaId',
    otherKey: 'actorId'
});

Actor.belongsToMany(Pelicula, {
    through: Elenco,
    foreignKey: 'actorId',
    otherKey: 'peliculaId'
});

sequelize.sync({ force: true })
.then(() => {

    console.log('Base de datos creada');

})
.catch((error) => {

    console.log(error);

});

const app = express();

app.use('/graphql',

    graphqlHTTP({

        schema,
        graphiql: true

    })

);

app.listen(3000, () => {

    console.log('Servidor ejecutándose');

});
