import { writable } from "svelte/store";
import type { Message, Note, Settings } from "./types";

export const route = writable("Notes")
export const notes = writable<Note[]>([]);
export const messages = writable<Message[]>([]);
export const settings = writable<Settings>({
    apiKey: "",
    textColor: "#ffffff",
    backgroundColor: "#000000",
    showNumbers: true,
    rounded: true
})