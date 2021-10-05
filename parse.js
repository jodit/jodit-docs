const fs = require('fs');
const p = require("path");
const root = p.resolve(__dirname, '../jodit/src').replace(/\\/g, '/');

const read = (path, callback, ext = []) => {
    return new Promise((resolve) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                throw err;
            }
            const promises = files.map((file) => {
                const filePath = p.join(path, file);

                return new Promise((resolveStat) => {
                    fs.stat(filePath, (_err, stats) => {
                        if (err) {
                            throw err;
                        }
                        if (stats.isDirectory()) {
                            read(filePath, callback, ext)
                                .then(resolveStat);
                        } else {
                            if (ext.indexOf(p.extname(filePath).toLowerCase()) === -1) {
                                resolveStat()
                            } else {
                                callback(filePath)
                                    .then(resolveStat);
                            }
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(resolve);
        });
    });
};

const getFireExpression = (line, pos) => {
    let bracketsCount = 0, started = false;
    for (let i = pos; i < line.length; i += 1) {
        if (line[i] === '(') {
            bracketsCount += 1;
            started = true;
        }
        if (line[i] === ')') {
            bracketsCount -= 1;
        }

        if (started && bracketsCount === 0) {
            const expr = line.substring(pos, i + 1);
            const eventMatch = /\.fire\(([^'"\)]+)?('|")([^'"]+)\2/.exec(expr);

            if (!eventMatch) {
                return;
            }

            return {
                column: pos,
                line: line.substring(0, pos).split('\n').length,
                event: eventMatch[3],
                expr,
            }
        }
    }
};

const events = {};

read(root, (path) => {
    return new Promise((resolve) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            const typescript = data.toString(),
                fireRegExp = /.fire\(/ig;

            let match;

            do  {
                match = fireRegExp.exec(typescript);
                if (match) {
                    const data = getFireExpression(typescript, match.index);
                    if (data) {
                        data.file = path.replace(/\\/g, '/').replace(root, '');
                        data.event.split(/\s/).forEach((eventName) => {
                            if (events[eventName] === undefined) {
                                events[eventName] = {
                                    fires: [],
                                    listen: []
                                };
                            }
                            events[eventName].fires.push(data);
                        });
                        delete data.event;

                    }
                }
            } while(match);

            resolve();
        });
    });
}, ['.ts'])
    .then(() => {
        fs.writeFileSync(__dirname + '/public/fires-event-data.json', JSON.stringify(events))
    })
    .catch((e) => {
        console.log(e);
    });
