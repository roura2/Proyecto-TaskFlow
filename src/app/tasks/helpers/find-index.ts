import { User } from "src/app/tasks/interfaces/User.interface";


export const findIndexById = (tournaments: User[], id: string): number => {
    let index = -1;

    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}
