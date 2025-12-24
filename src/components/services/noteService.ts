
import type { Note, NoteTag } from "../types/note";
import axios from "axios";
const API_URL = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface NotesResponse {
    notes: Note[];
    totalPages:number
} 

export interface NewNoteData {
    title: string;
    content?: string;
    tag:NoteTag
}

export default async function fetchNotes(page?: number, search?: string): Promise<NotesResponse>{
    const response = await axios.get<NotesResponse>(API_URL, {
        params: {
        page,
        search,
        },
        headers: {
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
 })
    return response.data
}

export async function createNote (newNote:NewNoteData):Promise<Note> {
    const response = await axios.post<Note>(API_URL, newNote, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        },
    });
    return response.data;
}

export async function deleteNote(noteID :string) {
    const deletedNote = await axios.delete<Note>(`${API_URL}/${noteID}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        },
    });
    return deletedNote.data;
}