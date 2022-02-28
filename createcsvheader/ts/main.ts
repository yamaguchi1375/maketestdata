
import * as fs from 'fs';
import * as readline from 'readline'
import { JyusyoMaster } from './master/jyusyomst';
import { PersonMaster } from './master/psersonmst';
import { UserIdMaker, InterviewNoMaker, MailAdressMaker } from './make/idmanagement';
import { FamilyPattern} from './make/familymaker'
import { FamillesMaker, FamillesMakerParam, FamilyMakerType } from './make/familiesmaker';
import { Children, Family, Interviews } from './dto/dtos';
import { JsonToSource } from './util/jsonToSource';
import { ChildrenDetailEntity, ChildrenEntity, Entity, EntityConverter, InterviewsEntity, UsersEntity } from './dto/entity';
import { UserIdMaster } from './master/useridmst';
import { exportCSV } from './util/fileIO';

// マスタ読み込みパス
const JYUSYO_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/yubin_hama.csv`;
const OTONA_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/otona.csv`;
const KODOMO_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/kodomo.csv`;
const USERID_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/userid_mst_a10035.json`;

const EXPORT_SQL_PATH = '/Users/yamaguchitakeshi/slk/gitwork/maketestdata/exportsql/';
const EXPORT_CSV_PATH = '/Users/yamaguchitakeshi/slk/gitwork/maketestdata/exportcsv/';

// PARAM
const PARAM_MAIL_PREFIX = `slk.ty.yamaguchi`;
const PARAM_MAIL_SUFFIX = `gmail.com`;
const PARAM_MAIL_STARTINDEX = 101;
const PARAM_CHILDREN_ID_PREFIX = `shibata`;
const PARAM_CHILDREN_ID_START_INDEX = 1;

const PARAM_INTERVIEW_NO_START_INDEX = 1;

// facilityId
// const PARAM_FACILITY_ID = 'a0005';
const PARAM_FACILITY_ID = 'a00021';

// staging facilityId
const STAGING_FACILITY_ID = 'a10035';

main();

//-------------------------------------------------------------------
// やること
// 1. userid_mst_a10035.json みたいなデータをWebのツールで csv -> json して配置
// 2. STAGING_FACILITY_ID を設定
// 3. 

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

    // const params = new FamillesMakerParam(STAGING_FACILITY_ID);
    const params = new FamillesMakerParam(STAGING_FACILITY_ID);
    
    // main
    params.pushPettern(new FamilyMakerType(FamilyPattern.Children1, 10));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Children2, 6));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Children3, 4));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Futago2, 2));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Futago3, 1));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Mitsugo3, 1));
    params.pushPettern(new FamilyMakerType(FamilyPattern.Mitsugo4, 1));

    // test
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Children1, 1));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Children2, 1));
    // params.pushPettern(new FamilyMakerType(FamilyPattern.Futago3, 1));

    /* ここから作成ロジック */
    const jyusyoMaster = new JyusyoMaster();
    await jyusyoMaster.setup(JYUSYO_PATH);
    const personMaster = new PersonMaster();
    await personMaster.setup(OTONA_PATH, KODOMO_PATH);
    const userIdMaster = new UserIdMaster(44);
    await userIdMaster.setup(USERID_PATH);

    const interviewNoMaker = new InterviewNoMaker(PARAM_INTERVIEW_NO_START_INDEX);

    const famillesMaker = new FamillesMaker(
      jyusyoMaster,
      personMaster,
      userIdMaster,
      interviewNoMaker,
    );

    const familles = famillesMaker.make(params);

    const users = convertUsers(familles);
    const children = convertChildren(familles);
    const childrendetails = convertChildrenDetail(familles);
    const interviews = convertInterviews(familles);

    const ObjectsToCsv = require('objects-to-csv');

    await exportCSV(EXPORT_CSV_PATH, 'users', users);
    await exportCSV(EXPORT_CSV_PATH, 'children', children);
    await exportCSV(EXPORT_CSV_PATH, 'childrendetails', childrendetails);
    await exportCSV(EXPORT_CSV_PATH, 'interviews', interviews);

    exportSqlEntity(`users`, users);
    exportSqlEntity(`children`, children);
    exportSqlEntity(`children_detail`, childrendetails);
    exportSqlEntity(`interviews`, interviews);


  let csvToJson = require('convert-csv-to-json');
  let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv("/Users/yamaguchitakeshi/slk/gitwork/maketestdata/example/children_detail.csv");
  for(let i=0; i<json.length;i++){
    console.log(json[i]);
    jsonToBasicObj(json[i]);
    JsonToSource.makeInterfaceSourc('children_detail', json[i]);
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

function jsonToBasicObj(json: any) {
  const map:any = {};
  Object.keys(json)
  .map(key => {
    const columnName = snakeCaseToCamelCase(key);
    map[columnName] = json[key];
  });
  console.log(map);
}

function makeSrc(interviews: Interviews) {
  console.log(`static convertInterviewsEntity(interviews: Interviews): InterviewsEntity {`);
  console.log(`    return {`);
  Object.keys(interviews)
  .map(key => {
    console.log(`        ` + key + `: interviews.` + key + `,`)
  });
  console.log(`    };`);
  console.log(`};`);
}

async function makeTable(): Promise<Table> {
  return new Promise((resolve, reject) => {
    // 読み込みストリーム
    let stream = fs.createReadStream(`/Users/yamaguchitakeshi/slk/gitwork/maketestdata/tablelayout/users.txt`);
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

function convertUsers(familles: Array<Family>): Array<UsersEntity> {
  const result = new Array<UsersEntity>();
  familles
  .map(family => EntityConverter.convertUsersEntity(family.user))
  .forEach(user => result.push(user));
  return result;
}

function convertChildren(familles: Array<Family>): Array<ChildrenEntity> {
  const result = new Array<ChildrenEntity>();
  familles
  .map(family => EntityConverter.convertChildrenEntites(family.childrens))
  .forEach(childrens => result.splice(result.length, 0, ...childrens));
  return result;
}

function convertChildrenDetail(familles: Array<Family>): Array<ChildrenDetailEntity> {
  const result = new Array<ChildrenDetailEntity>();
  familles
  .map(family => family.childrendetails)
  .forEach(childrens => result.splice(result.length, 0, ...childrens));
  return result;
}
function convertInterviews(familles: Array<Family>): Array<InterviewsEntity> {
  const result = new Array<InterviewsEntity>();
  familles
  .map(family => EntityConverter.convertInterviewsEntites(family.interviews))
  .forEach(interviews => result.splice(result.length, 0, ...interviews));
  return result;
}

function camelToUnderscore(key: string) {
  var result = key.replace( /([A-Z])/g, " $1" );
  return result.split(' ').join('_').toLowerCase();
}

function exportSqlEntity(tablename: string, records: Array<Entity>) {
  // 同期で行う場合
  try {
    let filePath = EXPORT_SQL_PATH + tablename + '_ins.sql'; 
    if (fs.existsSync(filePath)) {
      let now = Date.now();
      let backupfilepath = EXPORT_SQL_PATH + '/backup/' + tablename + '_ins.' + now + '.js';
      fs.renameSync(filePath, backupfilepath);
    }
    records.forEach(record => {
      console.log(``);
      let index = 0;
      let sqlcol = 'INSERT INTO `' + tablename + '` (';
      Object.keys(record)
      .forEach(key => {
        index += 1;
        if (tablename == 'interviews' && index == 1) {
          return;
        }
        sqlcol += '`' + camelToUnderscore(key) + '` ,'  
      });
      sqlcol = sqlcol.slice(0, -1);
      sqlcol += ' ) VALUES ';
      fs.appendFileSync(filePath, sqlcol);
      fs.appendFileSync(filePath, '\r\n');
      console.log(sqlcol);
      let sqlValue = '(';
      index = 0;
      Object.values(record)
      .forEach(value => {
        index += 1;
        if (tablename == 'interviews' && index == 1) {
          return;
        }
        if (`NULL` == value) {
          sqlValue += value;
        } else {
          sqlValue += `'` + value + `'`
        }
        sqlValue += ' ,';
      });
      sqlValue = sqlValue.slice(0, -1);
      sqlValue += '); '
      fs.appendFileSync(filePath, sqlValue);
      fs.appendFileSync(filePath, '\r\n');
      console.log(sqlValue);
    });
  }catch(e){
    console.log(e);
  }

}