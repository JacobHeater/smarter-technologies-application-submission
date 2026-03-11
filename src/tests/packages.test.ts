import { isPackageBulky } from '../packages/is-bulky';
import { isPackageHeavy } from '../packages/is-heavy';
import { PackageStack } from '../packages/package-stack';
import { sort } from '../packages/sort';

test('PackageStack exposes expected stack values', () => {
  expect(PackageStack.STANDARD).toBe('STANDARD');
  expect(PackageStack.SPECIAL).toBe('SPECIAL');
  expect(PackageStack.REJECTED).toBe('REJECTED');
});

test('isPackageHeavy returns false below threshold', () => {
  expect(isPackageHeavy(19.99)).toBe(false);
});

test('isPackageHeavy returns true at threshold', () => {
  expect(isPackageHeavy(20)).toBe(true);
});

test('isPackageHeavy returns true above threshold', () => {
  expect(isPackageHeavy(20.01)).toBe(true);
});

test('isPackageHeavy handles zero and negative values as not heavy', () => {
  expect(isPackageHeavy(0)).toBe(false);
  expect(isPackageHeavy(-10)).toBe(false);
});

test('isPackageBulky returns false below all thresholds', () => {
  expect(isPackageBulky(10, 10, 10)).toBe(false);
});

test('isPackageBulky returns true at exact volume threshold', () => {
  expect(isPackageBulky(100, 100, 100)).toBe(true);
});

test('isPackageBulky returns true above volume threshold', () => {
  expect(isPackageBulky(200, 100, 60)).toBe(true);
});

test('isPackageBulky returns true at exact dimension threshold', () => {
  expect(isPackageBulky(150, 1, 1)).toBe(true);
  expect(isPackageBulky(1, 150, 1)).toBe(true);
  expect(isPackageBulky(1, 1, 150)).toBe(true);
});

test('isPackageBulky returns false when largest dimension is just below threshold', () => {
  expect(isPackageBulky(149.99, 1, 1)).toBe(false);
});

test('isPackageBulky can classify negative dimensions as bulky by raw multiplication', () => {
  expect(isPackageBulky(-1000, -1000, 1)).toBe(true);
});

test('sort returns STANDARD for non-heavy and non-bulky package', () => {
  expect(sort(10, 10, 10, 1)).toBe(PackageStack.STANDARD);
});

test('sort returns SPECIAL for heavy-only package', () => {
  expect(sort(10, 10, 10, 20)).toBe(PackageStack.SPECIAL);
});

test('sort returns SPECIAL for bulky-only package by dimension', () => {
  expect(sort(150, 1, 1, 1)).toBe(PackageStack.SPECIAL);
});

test('sort returns SPECIAL for bulky-only package by volume', () => {
  expect(sort(100, 100, 100, 19.99)).toBe(PackageStack.SPECIAL);
});

test('sort returns REJECTED for package that is both heavy and bulky', () => {
  expect(sort(150, 100, 100, 20)).toBe(PackageStack.REJECTED);
});

test('sort throws for non-positive width', () => {
  expect(() => sort(0, 1, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(-1, 1, 1, 1)).toThrow(/greater than zero/);
});

test('sort throws for non-positive height', () => {
  expect(() => sort(1, 0, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, -1, 1, 1)).toThrow(/greater than zero/);
});

test('sort throws for non-positive length', () => {
  expect(() => sort(1, 1, 0, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, -1, 1)).toThrow(/greater than zero/);
});

test('sort throws for non-positive mass', () => {
  expect(() => sort(1, 1, 1, 0)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, 1, -1)).toThrow(/greater than zero/);
});

test('sort should throw for NaN inputs', () => {
  expect(() => sort(Number.NaN, 1, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, Number.NaN, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, Number.NaN, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, 1, Number.NaN)).toThrow(/greater than zero/);
});

test('sort should throw for infinite inputs', () => {
  expect(() => sort(Number.POSITIVE_INFINITY, 1, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, Number.POSITIVE_INFINITY, 1, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, Number.POSITIVE_INFINITY, 1)).toThrow(/greater than zero/);
  expect(() => sort(1, 1, 1, Number.POSITIVE_INFINITY)).toThrow(/greater than zero/);
});
