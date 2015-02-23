var test = require('tape')
var fmt = require('../').transform

var collapse = [
  {
    program:
    'var x = 1\n' +
    '\n' +
    '\n' +
    'var z = 2\n',

    expected:
    'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'two empty lines should collapse to one'
  },
  {
    program:
    'var x = 1\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    'var z = 2\n',

    expected:
    'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'ten empty lines should collapse to one'
  }
]

test('multiline collapse', function (t) {
  t.plan(collapse.length)
  collapse.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})

var noops = [
  {
    program: 'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'single empty line should be unmodified'
  },
  {
    program:
    'var cool =\n' +
    'a +\n' +
    'b +\n' +
    'c\n',

    msg: 'allow newlines after assignment operator'
  }
]

test('multiline noop', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.program, obj.msg)
  })
})
