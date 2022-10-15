const noteModel = require('../models/NotesModel.js');

module.exports = function(app){

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {    
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // create json object to be saved in the database
    const data = new noteModel({
        noteTitle: req.body.content.noteTitle,
        noteDescription: req.body.content.noteDescription,
        priority: req.body.content.priority,
        dateAdded: req.body.content.dateAdded,
        dateUpdated: req.body.content.dateUpdated
    });

    //TODO - Write your code here to save the note
    data.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
    });

});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
    console.log(req.body);
    //TODO - Write your code here to returns all note
    noteModel.find()
        .then(notes => {
            res.send(notes);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        }
    );

});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.params.noteId) {
        return res.status(400).send({
            message: "Note ID can not be empty"
        });
    }

    //TODO - Write your code here to return only one note using noteid
    noteModel.findById(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });

});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.params.noteId) {
        return res.status(400).send({
            message: "Note ID can not be empty"
        });
    }

    //TODO - Write your code here to update the note using noteid
    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.content.noteTitle,
        noteDescription: req.body.content.noteDescription,
        priority: req.body.content.priority,
        dateAdded: req.body.content.dateAdded,
        dateUpdated: req.body.content.dateUpdated
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }
        ).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        }
    );

});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.params.noteId) {
        return res.status(400).send({
            message: "Note ID can not be empty"
        });
    }
    
    //TODO - Write your code here to delete the note using noteid
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({message: "Note successfully deleted!"});
        }
        ).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Couldn't delete note with id " + req.params.noteId
            });
        }
    );

});

}