"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUsername = void 0;
const usernames = [
    'applepie',
    'browncake',
    'brownsugar',
    'chocodonut',
    'blackforest',
    'fairy',
    'bigblackclock',
    'unicorn',
    'stormie',
    'darkness',
    'nothing',
    'scores',
    'yummy',
    'justice',
    'ryze',
];
const genUsername = (baseText) => {
    return (baseText?.split(' ')?.join('')?.toLowerCase() +
        usernames[Math.floor(Math.random() * usernames.length)] +
        Math.floor(Math.random() * 10000) +
        1);
};
exports.genUsername = genUsername;
