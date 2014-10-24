'use strict';

var isPng = require('is-png');
var optipng = require('../');
var path = require('path');
var read = require('vinyl-file').read;
var test = require('ava');

test('optimize a PNG', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.png'), function (err, file) {
		t.assert(!err, err);

		var stream = optipng()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isPng(data.contents));
		});

		stream.end(file);
	});
});
