import { v4 as uuid} from 'uuid'

export class Task {
    /**
     * 
     * @param {String} title 
     */
    constructor(title) {
        this.id = uuid();
        this.title = title;
        this.done = true;
        this.date = new Date();
    }
}

