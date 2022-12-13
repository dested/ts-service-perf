import * as fs from 'fs';
import * as ts from 'typescript';
let cwd = process.cwd() + '/test';

function runTest(rootFileNames: string[], options: ts.CompilerOptions) {
  const tests = [
    {name: 'test1.ts', position: 14, result: 'toExponential'},
    {name: 'test2.ts', position: 277, result: 'latitude'},
    {name: 'test3.ts', position: 2027, result: 'latitude'},
    {name: 'test4.ts', position: 2080 + 93 - 3, result: 'latitude'},
    {name: 'test5.ts', position: 2081 + 93 - 3, result: 'latitude'},
    {name: 'test6.ts', position: 2153 + 93 - 3, result: 'latitude'},
    {name: 'test7.ts', position: 808 + 27, result: '_id'},
  ];

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: (fileName) => '1',
    getScriptSnapshot: (fileName) => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => cwd,
    getCompilationSettings: () => options,
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  // Create the language service files
  console.time('create language service');
  const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());

  console.timeEnd('create language service');
  services.getCompletionsAtPosition('test1.ts', 0, undefined);

  for (const test of tests) {
    for (let i = 0; i < 5; i++) {
      console.time('get completions ' + test.name);
      const result = services.getCompletionsAtPosition(test.name, test.position, undefined);
      console.timeEnd('get completions ' + test.name);
      if (result?.entries[0].name !== test.result) {
        console.log(result?.entries[0].name);
        throw 'bed test';
      }
    }
  }
}

// Initialize files constituting the program as all .ts files in the current directory
const currentDirectoryFiles = fs
  .readdirSync(cwd)
  .filter((fileName) => fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts');
// Start the watcher

runTest(
  currentDirectoryFiles.map((e) => cwd + '/' + e),
  {module: ts.ModuleKind.CommonJS}
);
