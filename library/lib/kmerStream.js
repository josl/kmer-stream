/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_transform", "_lastLineData", "_flush"] }] */
import Console from 'console';
import request from 'request';
import from2 from 'from2';

import {
    jsonToStrMap,
    mapToJSON
} from './kmers.js';



function fromString(string) {
    return from2(function (size, next) {
        // if there's no more content
        // left in the string, close the stream.
        if (string.length <= 0) {
            return next(null, null);
        }
        // Pull in a new chunk of text,
        // removing it from the string.
        var chunk = string.slice(0, size);
        string = string.slice(size);
        // Emit "chunk" from the stream.
        next(null, chunk);
    });
}



export class KmerStream{

    constructor() {
    }

    sendKmers(kmerQuery, URL) {
        let promise =  new Promise(function (resolve, reject) {
            fromString(JSON.stringify(mapToJSON(kmerQuery)))
                .pipe(
                    request
                        .post(URL)
                        .on('response', function (response) {
                             if (response.statusCode === 201 || response.statusCode === 200 || response.statusCode === 202) {
                                 console.log('resolving!');
                            }else if (response.statusCode === 204){
                                console.log('we get an empty dataset!');
                                reject('No hits were found!');
                            }else{
                                reject('error');
                            }
                        })
                        .on('error', function (err) {
                            console.log('we get an error!', err);
                            reject(err);
                        })
                );
        });
        return promise;
    }
}
