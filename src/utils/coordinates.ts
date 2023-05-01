export default {
  convertLatitudeToNumber,
  convertLongitudeToNumber,
};

function convertLatitudeToNumber(latitude: string): number {
    const direction = latitude[0];
    const degrees = parseInt(latitude.substring(1, 4));
    const minutes = parseInt(latitude.substring(5, 7));
    const seconds = parseInt(latitude.substring(8, 10));
    const milliseconds = parseInt(latitude.substring(11));

    // console.log(latitude);
    // console.log(degrees);
    // console.log(minutes);
    // console.log(seconds);
    // console.log(milliseconds);

    const latNum = degrees + minutes / 60 + (seconds + milliseconds / 1000) / 3600;

    return direction === "S" ? -latNum : latNum;
}

function convertLongitudeToNumber(longitude: string): number {
    const direction = longitude[0];
    const degrees = parseInt(longitude.substring(1, 4));
    const minutes = parseInt(longitude.substring(5, 7));
    const seconds = parseInt(longitude.substring(8, 10));
    const milliseconds = parseInt(longitude.substring(11));

    // console.log(longitude);
    // console.log(degrees);
    // console.log(minutes);
    // console.log(seconds);
    // console.log(milliseconds);

    const longNum = degrees + minutes / 60 + (seconds + milliseconds / 1000) / 3600;

    return direction === "W" ? -longNum : longNum;
}
