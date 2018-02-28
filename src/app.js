import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid/v4";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let notes = [];

app.get('/', (req, res) => {
    res.json(notes);
})

app.post('/', (req, res) => {
    let note = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text,
        date_create: Date.now(),
        date_update: Date.now()
    };
    notes.push(note);
    res.json(note);
})

app.delete('/', (req, res) => {
    let note = notes.find(note => note.id === req.body.id);
    if (note == null) {
        res.status(400).json({ message: "Ошибка! Неверный UUID." })
    } else {
        const filterByID = note => {
            return note.id !== req.body.id;
        }
        notes = notes.filter(filterByID);
        res.status(200).json({ message: "Заметка успешно удалена." });
    }
})

app.put('/', (req, res) => {
    let note = notes.find(note => note.id === req.body.id);
    if (note == null) {
        res.status(400).json({ message: "Ошибка! Неверный UUID." })
    } else {
        note.title = req.body.title;
        note.text = req.body.text;
        note.date_update = Date.now();
        res.status(200).json(note);
    }
})

app.listen(8080, () => {
    console.log('Сервер запущен на порте 8080');
})
