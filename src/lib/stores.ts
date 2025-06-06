import { writable } from "svelte/store";
import type { Message, Note } from "./types";

export const route = writable("Notes")
export const notes = writable<Note[]>([]);
export const messages = writable<Message[]>([]);