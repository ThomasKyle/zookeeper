const express = require('express');
const app = express();
const { animals } = require('./data/animals');

app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json('animals');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

//Filter function
function filterByQuery(query, animalsArray) {
    let personailtyTraitsArray = [];
    //We save the animalsArray  as filteredResults here:
    let filteredResults = animalsArray;
    if(query.personailtyTraits) {
        //Save personailtyTraits as a dedicated array
        //If personailtyTraits is a string, place it into a new array and save
        if(typeof query.personailtyTraits === 'string') {
            personailtyTraitsArray = [query.personailtyTraits];
        } else {
            personailtyTraitsArray = query.personailtyTraits;
        }
        //Loop through each trait in the personailtyTraits array:
        personailtyTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(

            animal => animal.personailtyTraits.indexOf(trait) !== -1
        );
        });
    }

    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}