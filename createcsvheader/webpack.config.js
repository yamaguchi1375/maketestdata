const path = require('path');

module.exports = {
    // production : 最適化された状態のjsファイルを出力
    // development : ソースマップ有効のjsファイルを出力
    mode: 'development',
    // メインとなるTypeScriptファイルを指定
    entry: './ts/main.ts',
    target: 'node',
    // バンドル後のjsファイル出力先を指定
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    module: {
      rules: [
        {
          // 拡張子 .ts の場合
          test: /\.ts$/,
          // TypeScript をコンパイルする
          use: 'ts-loader',
        },
      ],
    },
    // import文で拡張子を省いて指定する為の設定
    resolve: {
      // 拡張子を配列で指定
      extensions: [
        '.ts', '.js',
      ],
    },
  };