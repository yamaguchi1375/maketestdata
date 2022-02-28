import * as fs from 'fs';
import { Entity } from '../entity/entites';
const csv = require('csv-parser');

export type Converter<T> = (
    record: {[name: string]: string},
    index: number
 ) => T;

export const readCsv = async<T> (
    filePath: string,
    converter: Converter<T>
    ): Promise<Array<T>> => {
    return new Promise((resolve, reject) => {
        const lines: Array<T> = [];
        let index = 0;
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: any) => lines.push(converter(data, index++)))
        .on('end', () => {
            resolve(lines);
        }).on('error', (err: any) => {
            reject(err);
        });
    });
};

export const readJson = async<T> (filePath: string): Promise<Array<T>> =>
    new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => 
            err ? reject(err) : resolve(JSON.parse(data))
        );
    });

export const exportCSV = async (path: string, tablename: string, records: Array<Entity>) => {
    const ObjToCSV = require('objects-to-csv');
    const csv = new ObjToCSV(records);
    const filePath = path + tablename + '.csv';
    if (fs.existsSync(filePath)) {
        let now = Date.now();
        let backupfilepath = path + 'backup/' + tablename + '.' + now + '.csv';
        fs.renameSync(filePath, backupfilepath);
      }
    // Save to file:
    await csv.toDisk(filePath);
}

export const exportSql = (path: string, tablename: string, records: Array<Entity>) => {
        // 同期で行う場合
        try {
            let filePath = path + tablename + '_ins.sql'; 
            if (fs.existsSync(filePath)) {
              let now = Date.now();
              let backupfilepath = path + 'backup/' + tablename + '_ins.' + now + '.sql';
              fs.renameSync(filePath, backupfilepath);
            }
            records.forEach(record => {
              let index = 0;
              let sqlcol = 'INSERT INTO `' + tablename + '` (';
              Object.keys(record)
              .forEach(key => {
                index += 1;
                sqlcol += '`' + key + '` ,'  
              });
              sqlcol = sqlcol.slice(0, -1);
              sqlcol += ' ) VALUES ';
              fs.appendFileSync(filePath, sqlcol);
              fs.appendFileSync(filePath, '\r\n');
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
            });
          }catch(e){
            console.log(e);
          }  
}

