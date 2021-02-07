import { EventEmitter} from "events";

class Stores extends EventEmitter {
    constructor() {
        super()
        this.dataTest = [
            {
                text : "test 1"
            },
            {
                text : "test 2"
            }
        ]
    }

    getAll() {
         return this.dataTest;
    }
}

const Stores = new Stores;
export default Stores;