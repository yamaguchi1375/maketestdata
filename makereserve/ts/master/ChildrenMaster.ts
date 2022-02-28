import { Children } from "../entity/entites";
import { readJson } from "../utils/filesIO";

export class ChildrenMaster {
    children: Array<Children> = new Array<Children>();
    constructor() {
    }
    async setup(path: string) {
        const result = await readJson<Children>(path);
        this.children.splice(this.children.length, 0, ...result);
    }
    getChildren(): Array<Children> {
        return this.children;
    }
    getRandomChild(existsChild: Array<Children>): Children {
        let found = true;
        let fixIndex = -1;
        while (found) {
            fixIndex = Math.floor(Math.random() * (this.children.length - 1));
            let candidate = this.children[fixIndex];
            let filtered = existsChild.filter(c => {
                if (c.user_id == candidate.user_id && c.child_id == candidate.child_id) {
                    return true;
                } else {
                    return false;
                }
            });
            if (filtered.length == 0) {
                found = false;
            }
        }
        return this.children[fixIndex];
    }
}
