import express from 'express';
import { saveNote, getAllNotes,deleteNote } from '../controllers/notes.js';

const notesRouter = express.Router();

notesRouter.post('/', saveNote);
notesRouter.get('/', getAllNotes);
notesRouter.delete('/:id', deleteNote);

export default notesRouter;
