const { TestScheduler } = require('jest');

const dummy = require('../utils/list_helper').dummy;

test('dummy returns one', ()=> {
    const blog = [];
    expect(dummy(blog)).toBe(1);
})