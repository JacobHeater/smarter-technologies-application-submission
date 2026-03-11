import { isPackageBulky } from "./is-bulky";
import { isPackageHeavy } from "./is-heavy";
import { PackageStack } from "./package-stack";

export function sort(width: number, height: number, length: number, mass: number): string {
    if ([width, height, length, mass].some((value) => value <= 0)) {
        throw new Error('All dimensions and mass must be numbers greater than zero.');
    }

    if ([width, height, length, mass].some((value) => Number.isNaN(value) || !Number.isFinite(value))) {
        throw new Error('All dimensions and mass must be finite numbers greater than zero.');
    }

    const isHeavy = isPackageHeavy(mass);
    const isBulky = isPackageBulky(width, height, length);

    if (isHeavy && isBulky) {
        return PackageStack.REJECTED;
    }

    if (isHeavy || isBulky) {
        return PackageStack.SPECIAL;
    }

    return PackageStack.STANDARD;
}
