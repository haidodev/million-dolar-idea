const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId, updateInstanceInDatabase } = require('./db');
const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
    const foundMinion = getFromDatabaseById('minions', id);
    if (foundMinion) {
        req.minion = foundMinion;
        next();
    } else {
        res.status(404).send('Minion not found!');
    }
})
minionsRouter.param('workId', (req, res, next, id) => {
    const foundWork = getFromDatabaseById('work', id);
    if (foundWork) {
        req.workId = id;
        next();
    } else {
        res.status(404).send('Work not found!');
    }
})
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion){
        res.status(201).send(newMinion);
    } else {
        res.status(400).send()
    }
});
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', {...req.body, minionId: req.minion.id});
    if (newWork){
        res.status(201).send(newWork);
    } else {
        res.status(400).send()
    }
})
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const workList = getAllFromDatabase('work').filter(item => item.minionId == req.minion.id);
    res.send(workList);
})
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion){
        res.send(updatedMinion);
    } else {
        res.status(400).send();
    }
});
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', {...req.body, minionId: req.minion.id});
    if (updatedWork){
        res.send(updatedWork);
    } else {
        res.status(400).send();
    }
})
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minion.id);
    if (deleted){
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.workId);
    if (deleted){
        res.status(204).send();
    } else {
        res.status(400).send();
    }
})
module.exports = minionsRouter;
