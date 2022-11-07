const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

// create a mongoose Schema having the fields as mentioned above
const NoteSchema = mongoose.Schema({
    noteTitle: String,
    noteDescription: String,
    priority: String,
    dateAdded: Date,
    dateUpdated: Date
}, {
    timestamps: true
});

module.exports = mongoose.model("notes", NoteSchema);