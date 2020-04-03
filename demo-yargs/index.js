#!/usr/bin/env node
var argv = require('yargs')
  .option('n', {
    alias : 'name',
    demand: true,
    default: 'tom',
    describe: 'your name',
    type: 'string'
  })
  .usage('Usage: hello [options]')
  .example('hello -n tom', 'say hello to Tom')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2020')
  .command("nice", "nice to meet you", function (yargs) {
    var argv = yargs.reset()
      .option("m", {
        alias: "message",
        description: "provide any sentence"
      })
      .argv;

    console.log('nice ',argv.m);
  })
  .argv;

console.log("hello ", argv.name);
