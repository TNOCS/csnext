export const convertToDMS = (dd: number, isLng: boolean) => {
    const dir = dd < 0
        ? isLng ? 'W' : 'S'
        : isLng ? 'E' : 'N';

    const absDd = Math.abs(dd);
    const deg = absDd | 0;
    const frac = absDd - deg;
    const min = (frac * 60) | 0;
    let sec = frac * 3600 - min * 60;
    // Round it to 2 decimal points.
    // sec = Math.round(sec * 100) / 100;
    return `${deg}°${min}'${sec.toFixed(1)}"${dir}`;
}