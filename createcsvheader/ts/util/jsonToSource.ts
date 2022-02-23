export class JsonToSource {
    static makeInterfaceSourc(tableName: string, json: object) {
        console.log(`export interface ` + snakeCaseToClassName(tableName) + ` {`);
        for (const [key, value] of Object.entries(json)) {
            console.log(`  `   + snakeCaseToCamelCase(key) + `: ` +  typestr(value) + `;`);
        }
        console.log(`};`);
    }
}

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

function snakeCaseToCamelCase(userInput: string) {
    let userOutPut = '';
    const userInputSplit = userInput.split('_');
    let x = 0;
    for (const prm of userInputSplit) {
      if (x === 0) {
        userOutPut = prm.toLowerCase();
      } else {
        userOutPut += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
      }
      x++;
    } 
    return userOutPut;
}
  