// SOURCE: https://github.com/nlf/lab-babel/blob/549c36a4d4e90d4145f7aadc352a56efe9d6bf46/lib/index.js
// wish to use Object.assign

var Babel = require('babel-core');

var internals = {};
internals.transform = function (content, filename) {

    if (/^node_modules/.test(filename)) {
        return content;
    }

    var transformed = Babel.transform(content, {
        sourceMap: 'inline',
        sourceFileName: filename,
        auxiliaryCommentBefore: '$lab:coverage:off$',
        auxiliaryCommentAfter: '$lab:coverage:on$',
        optional: ['runtime']
    });

    return transformed.code;
};

internals.extensions = ['js', 'jsx', 'es', 'es6'];
internals.methods = [];
for (var i = 0, il = internals.extensions.length; i < il; ++i) {
    internals.methods.push({ ext: internals.extensions[i], transform: internals.transform });
}

module.exports = internals.methods;
