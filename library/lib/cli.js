#!/usr/bin/env node

let cli = require('cli');
import {
    KmerJS
} from './kmers';
import Console from 'console';

cli.parse({
    fastq: ['f', 'FASTQ file to parse', 'file', 'test_data/test_long.fastq'],
    preffix: ['p', 'Kmer preffix', 'string', 'ATGAC'],
    length: ['l', 'Kmer lenght', 'number', 16],
    step: ['s', 'Kmer step', 'number', 1],
    coverage: ['c', 'Min coverage', 'number', 1],
    output: ['o', 'Print info', 'number', 1],
    program: ['P', 'Program to execute: [findKmers, findMatches]', 'string', 'findKmers'],
});

cli.main(function (args, options) {
    console.log(options.url);
    let kmerjs = new KmerJS(
        options.fastq, options.preffix, options.length,
        options.step, options.coverage, true, 'node');
    if (options.program === 'findKmers') {
        let kmers = kmerjs.readFile().promise;
        kmers.then(function (data) {
            Console.log('Kmers: ', data);
            process.exit();
        });
    }else{
        Console.log(options.program + ' is not a valid option! [findKmers]');
    }
});
