import * as fs from 'fs';
const csv = require('csv-parser');

export type Converter<T> = (
    record: {[name: string]: string},
    index: number
 ) => T;

export const readCsv =async<T> (
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

