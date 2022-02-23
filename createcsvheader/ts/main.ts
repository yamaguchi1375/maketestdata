
import * as fs from 'fs';
import * as readline from 'readline'
import { JyusyoMaster } from './master/jyusyomst';
import { PersonMaster } from './master/psersonmst';
import { UserIdMaker, ChildIdMaker, InterviewNoMaker, MailAdressMaker } from './make/idmanagement';
import { FamilyPattern} from './make/familymaker'
import { FamillesMaker, FamillesMakerParam, FamilyMakerType } from './make/familiesmaker';
import { Children, Family, Interviews, Users } from './dto/dtos';
import { JsonToSource } from './util/jsonToSource';

// マスタ読み込みパス
const JYUSYO_PATH = `/Users/yamaguchitakeshi/slk/demo作業/master/yubin_hama.csv`;
const OTONA_PATH = `/Users/yamaguchitakeshi/slk/demo作業/master/otona.csv`;
const KODOMO_PATH = `/Users/yamaguchitakeshi/slk/demo作業/master/kodomo.csv`;

// PARAM
const PARAM_MAIL_PREFIX = `slk.ty.yamaguchi`;
const PARAM_MAIL_SUFFIX = `gmail.com`;
const PARAM_MAIL_STARTINDEX = 101;
const PARAM_CHILDREN_ID_PREFIX = `shibata`;
const PARAM_CHILDREN_ID_START_INDEX = 1;
const PARAM_INTERVIEW_NO_START_INDEX = 1;

// facilityId
const PARAM_FACILITY_ID = 'a0005';

// staging facilityId
const STAGING_FACILITY_ID = 'a10033';
const STAGING_FACILITY_USER_ID = 'afb530ae-a1e7-477c-aab5-9a779603e2d6';

main();

async function main() {
  try {
    // const table = await makeTable();
    // consoleCsvOut(table);
    // consoleTypeSrcOut(table);

    // const familyMaker = new FamilyMaker(
    //     FamilyPattern.Children1,
    //     userIdMaker.createNewId(),
    //     PARAM_FACILITY_ID,
    //     childrenIdMaker,
    //     interviewNoMaker,
    //     jyusyoMaster,
    //     personMaster
    // );
    // const family = familyMaker.make();

    /* ここから作成ロジック */
    // const jyusyoMaster = new JyusyoMaster();
    // await jyusyoMaster.setup(JYUSYO_PATH);
    // const personMaster = new PersonMaster();
    // await personMaster.setup(OTONA_PATH, KODOMO_PATH);
    // const userIdMaker = new UserIdMaker();
    // const mailAdressMaker = new MailAdressMaker(PARAM_MAIL_PREFIX
    //   , PARAM_MAIL_SUFFIX
    //   , PARAM_MAIL_STARTINDEX);
    // const childrenIdMaker = new ChildIdMaker(
    //   PARAM_CHILDREN_ID_PREFIX,
    //   PARAM_CHILDREN_ID_START_INDEX
    // );

    // const interviewNoMaker = new InterviewNoMaker(PARAM_INTERVIEW_NO_START_INDEX);

    // const params = new FamillesMakerParam(PARAM_FACILITY_ID);
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Children1, 10));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Children2, 6));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Children3, 4));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Futago2, 2));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Futago3, 1));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Mitsugo3, 1));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Mitsugo4, 1));

    // const famillesMaker = new FamillesMaker(
    //   jyusyoMaster,
    //   personMaster,
    //   userIdMaker,
    //   childrenIdMaker,
    //   interviewNoMaker,
    //   mailAdressMaker
    // );

    // const familles = famillesMaker.make(params);

    // const users = convertUsers(familles);
    // const children = convertChildren(familles);
    // const interviews = convertInterviews(familles);

    // const ObjectsToCsv = require('objects-to-csv');

    // (async () => {
    //   const csv = new ObjectsToCsv(users);    
    //   // Save to file:
    //   await csv.toDisk('/Users/yamaguchitakeshi/slk/demo作業/exportcsv/users.csv');
    //   // Return the CSV file as string:
    //   console.log(await csv.toString());
    // })();
    
    // (async () => {
    //   const csv = new ObjectsToCsv(children);    
    //   // Save to file:
    //   await csv.toDisk('/Users/yamaguchitakeshi/slk/demo作業/exportcsv/children.csv');
    //   // Return the CSV file as string:
    //   console.log(await csv.toString());
    // })();

    // (async () => {
    //   const csv = new ObjectsToCsv(interviews);    
    //   // Save to file:
    //   await csv.toDisk('/Users/yamaguchitakeshi/slk/demo作業/exportcsv/interviews.csv');
    //   // Return the CSV file as string:
    //   console.log(await csv.toString());
    // })();

  // const { v4: uuidv4 } = require('uuid');
  // console.log(uuidv4());

  let csvToJson = require('convert-csv-to-json');

  let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv("/Users/yamaguchitakeshi/slk/demo作業/example/users.csv");
  for(let i=0; i<json.length;i++){
    // console.log(json[i]);
    JsonToSource.makeInterfaceSourc('users', json[i]);
  }

  } catch (err) {
    console.log(err);
  }

  /* ここまで作成ロジック */

}

type TblData = {
  tblName: string;
  caption: string;
}

type ColumnData = {
  columnName: string;
  caption: string;
  type: string;
  length: number;
}

export class Table {
  tblData: TblData;
  columns: ColumnData[];
  constructor(tblData: TblData, columns: ColumnData[]) {
    this.tblData = tblData;
    this.columns = columns;
  }
}

async function makeTable(): Promise<Table> {
  return new Promise((resolve, reject) => {
    // 読み込みストリーム
    let stream = fs.createReadStream(`/Users/yamaguchitakeshi/slk/demo作業/tablelayout/users.txt`);
    var reader = readline.createInterface({ input: stream });
    var tblData: TblData = {tblName:``, caption:``};
    var columnlist: ColumnData[] = [];

    reader.on("line", (line:string) => {
        const columns = line.split(` `);
        if (columns.length === 2) {
          tblData = {tblName: columns[1].replace(`(`,``).replace(`)`,``), caption: columns[0]};
          console.log(tblData.tblName + `  ` + tblData.caption);
        } else {
          const typestr = columns[2].split(`(`)[0];
          const length = columns[2].split(`(`).length > 1 ? parseInt(columns[2].split(`(`)[1].replace(`)`,``)) : 0;
          var columnData: ColumnData = {columnName: columns[1].replace(`(`,``).replace(`)`,``)
          , caption: columns[0]
          , type: typestr
          , length: length
          };
          console.log(columnData.columnName + `  ` + columnData.caption + `  ` + columnData.type+ `  ` + columnData.length);
          columnlist.push(columnData);
        }
    }).on('close', () => {
      resolve(new Table(tblData, columnlist));
    }).on('error', err => {
      reject(err);
    })
  });
};

function consoleCsvOut(table: Table) {
  console.log(table.tblData.tblName + `,` + table.tblData.caption);
  // export column
  var colnms = ``;
  table.columns.forEach(function(column) {
    colnms += column.columnName;
    colnms += `,`;
  });
  console.log(colnms.slice(0, -1));
  // export caption
  var captions = ``;
  table.columns.forEach(function(column) {
    captions += column.caption;
    captions += `,`;
  });
  console.log(captions.slice(0, -1));
  // export types
  var types = ``;
  table.columns.forEach(function(column) {
    types += column.type;
    types += `,`;
  });
  console.log(types.slice(0, -1));
  // export length
  var lengths = ``;
  table.columns.forEach(function(column) {
    lengths += new String(column.length);
    lengths += `,`;
  });
  console.log(lengths.slice(0, -1));
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

function convertTypeStr(typeName: string) {
  if (`VARCHAR` === typeName) {
    return `string`;
  } else if (`DATE` === typeName) {
    return `string`;
  } else {
    return `number`;
  }
}

function consoleTypeSrcOut(table: Table) {
  console.log(`export interface ` + snakeCaseToClassName(table.tblData.tblName) + ` {`);
  table.columns.forEach(function(column) {
    console.log(`  `   + snakeCaseToCamelCase(column.columnName) + `: ` + convertTypeStr(column.type) + `;`);
  });
  console.log(`};`);
}

function convertUsers(familles: Array<Family>): Array<Users> {
  const result = new Array<Users>();
  familles
  .map(family => family.user)
  .forEach(user => result.push(user));
  return result;
}

function convertChildren(familles: Array<Family>): Array<Children> {
  const result = new Array<Children>();
  familles
  .map(family => family.childrens)
  .forEach(childrens => result.splice(result.length, 0, ...childrens));
  return result;
}

function convertInterviews(familles: Array<Family>): Array<Interviews> {
  const result = new Array<Interviews>();
  familles
  .map(family => family.interviews)
  .forEach(interviews => result.splice(result.length, 0, ...interviews));
  return result;
}


