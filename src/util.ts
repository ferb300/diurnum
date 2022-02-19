import people from "./data/people.json";
import { Person } from "./types/person";

export function megabyteToByte(mb: number): number {
    return mb * 1024 * 1024
}

export function hoursToSeconds(hours: number): number {
    return hours * 60 * 60
}

export function getPerson(code: string): Person | null {
    console.log(people.length)
    for (let i = 0; i < people.length; i++) {
        if (people[i].code == code) {
            return people[i]
        }
    }
    return null
}