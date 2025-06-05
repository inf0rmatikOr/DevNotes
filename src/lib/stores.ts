import { writable } from "svelte/store";
import type { Note } from "./types";

export const route = writable("Notes")
export const notes = writable<Note[]>([
    {
        id: "1",
        title: "First Note",
        content: "This is the content of the first note.",
        createdAt: new Date("2023-01-01 09:00"),
        updatedAt: new Date("2023-01-01 10:00")
    },
    {
        id: "2",
        title: "Second Note",
        content: "This is the content of the second note.",
        createdAt: new Date("2023-01-01 09:30"),
        updatedAt: new Date("2023-01-01 10:00")
    }
]);