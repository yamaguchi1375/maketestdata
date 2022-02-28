import exp from "constants";
import { Entity } from "../entity/entites";
import { readJson } from "./filesIO";

function typestr(value: any) : string {
    if (isNaN(value)) {
        return 'string';
    } else {
        return 'number';
    }
}

function snakeCaseToClassName(userInput: string) {
    let userOutPut = '';
    const userInputSplit = userInput.split('_');
    let x = 0;
    for (const prm of userInputSplit) {
      userOutPut += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
      x++;
    } 
    return userOutPut;
}

export class JsonToSource {
    static makeInterfaceSource(tableName: string, json: object) {
        console.log(`export interface ` + snakeCaseToClassName(tableName) + ` {`);
        for (const [key, value] of Object.entries(json)) {
            console.log(`  `   + key + `: ` +  typestr(value) + `;`);
        }
        console.log(`};`);
    };
};

export class JsonPathToSource {
    async makeInterfaceSource(tablseName: string, path: string) {
        let jsons: Array<any> = await readJson<any>(path);
        JsonToSource.makeInterfaceSource(tablseName, jsons[0]);
    };
};

export class JsonToBasicSouce {
    static async makeJsonToBasicSource(tablseName: string, path: string) {
        let jsons: Array<Entity> = await readJson<Entity>(path);
        for (let i=0; i<jsons.length; i++) {
            JsonToBasicSouce.makeSource(tablseName, i+1, jsons[i]);
        }
    }
    static makeSource(tableNam: string, index: number, json: any) {
        console.log('export let basic' + snakeCaseToClassName(tableNam) + index
        + 'Entity: ' + snakeCaseToClassName(tableNam)  + ' = {');
        Object.keys(json)
        .forEach(key => {
            let value = json[key];
            if (isNaN(value)) {
                value = "'" + value + "'";
            } else if (value == null) {
                value = "'NULL'";
            }
            console.log('    ' + key + ': ' + value + ',');
        });
        console.log('};')
    }
}