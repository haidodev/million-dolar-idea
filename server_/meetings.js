const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting){
        res.status(201).send(newMeeting);
    } else {
        res.status(400).send()
    }
});
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send()
});
module.exports = meetingsRouter;
