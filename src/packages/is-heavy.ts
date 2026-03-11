export function isPackageHeavy(mass: number): boolean {
    const HEAVY_MASS_THRESHOLD = 20;
    return mass >= HEAVY_MASS_THRESHOLD;
}
