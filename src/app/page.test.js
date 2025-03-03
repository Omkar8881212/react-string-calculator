
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from './page';
import { add, getCustomDelimiter, getDelimiter, getNum, getValues } from './common';


it('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByRole("heading")).toHaveTextContent("String Calculator");
});

test('invalid numbers should be converted to 0', () => {
    expect(getNum('fe'))
        .toBe(0);
    expect(getNum('!.'))
        .toBe(0);
    expect(getNum('xfs3'))
        .toBe(0);
    expect(getNum(3))
        .toBe(3);
    expect(getNum(54))
        .toBe(54);
    expect(getNum(266))
        .toBe(266);
    expect(getNum(5453))
        .toBe(5453);
});

test('add the sum of an unlimited number of numbers', () => {
    expect(add([5, 6, 5, 4, 5, 777, 6, 6, 553, 434]))
        .toBe('1801');
    expect(add([2, 30]))
        .toBe('32');
    expect(add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
        .toBe('78');
    expect(add([3, 3, 0]))
        .toBe('6');
    expect(add([45]))
        .toBe('45');
    expect(add([54, 64, 36, 26, 4, 467, 54, 2]))
        .toBe('707');
});

test('add with new line delimiter', () => {
    expect(add(getValues('3\n3', ['\n'])))
        .toBe('6');
    expect(add(getValues('rfrl\n45', ['\n'])))
        .toBe('45');
    expect(add(getValues('1,2,3,4,5,6,\n7,8,9,10\n11,12', ['\n'])))
        .toBe('78');
});


test('get single character custom delimiter', () => {
    expect(getCustomDelimiter('//d'))
        .toBe('d');
    expect(getCustomDelimiter('//^'))
        .toBe('^');
    expect(getCustomDelimiter('//y8y'))
        .toBe(',');
    expect(getCustomDelimiter('/34'))
        .toBe(',');
    expect(getCustomDelimiter('4,5,63'))
        .toBe(',');
}); 

test('custom delimeter addition', () => {
    expect(add([5, 6, 5, 4, 5, 777, 6, 6, 553, 434]))
        .toBe('1801');
    expect(add([2, 30]))
        .toBe('32');
    expect(add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
        .toBe('78');
    expect(add([3, 3, 0]))
        .toBe('6');
    expect(add([45]))
        .toBe('45');
    expect(add([54, 64, 36, 26, 4, 467, 54, 2]))
        .toBe('707');
});

test('throw error for negative numbers ', () => {
    expect(() => add([3, -3]))
        .toThrowError('Negative numbers detected: -3. No negative numbers are allowed!');
    expect(() => add([-45, 23]))
        .toThrowError('Negative numbers detected: -45. No negative numbers are allowed!');
    expect(() => add([-4, 3, 2, 5, 33, 444, -8]))
        .toThrowError('Negative numbers detected: -4, -8. No negative numbers are allowed!');
    expect(() => add([-3, -5, 0, 0]))
        .toThrowError('Negative numbers detected: -3, -5. No negative numbers are allowed!');

});