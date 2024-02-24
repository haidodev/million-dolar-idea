const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId, updateInstanceInDatabase } = require('./db');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
    const foundIdea = getFromDatabaseById('ideas', id);
    if (foundIdea) {
        req.idea = foundIdea;
        next();
    } else {
        res.status(404).send('Idea not foundIdea!');
    }
})
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea){
        res.status(201).send(newIdea);
    } else {
        res.status(400).send()
    }
});
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})
ideasRouter.put('/:ideaId', checkMillionDollarIdea,(req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea){
        res.send(updatedIdea);
    } else {
        res.status(400).send();
    }
});
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (deleted){
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});
module.exports = ideasRouter;
