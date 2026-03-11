export function isPackageBulky(width: number, height: number, length: number): boolean {
    const BULKY_VOLUME_THRESHOLD = 1000000;
    const BULKY_DIMENSION_THRESHOLD = 150;

    const volume = width * height * length;

    if (volume >= BULKY_VOLUME_THRESHOLD) {
        return true;
    }

    if ([width, height, length].some(dimension => dimension >= BULKY_DIMENSION_THRESHOLD)) {
        return true;
    }

    return false;
}
