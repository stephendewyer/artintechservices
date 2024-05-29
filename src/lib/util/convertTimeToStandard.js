export const ConvertTimeToStandard = (/** @type {string | undefined} */ time) => {
    if (time) {
        const separatedHoursAndMinutes = time.split(":");
        let hours = parseInt(separatedHoursAndMinutes[0]);
        const minutes = parseInt(separatedHoursAndMinutes[1]);
        const AmOrPm = hours >= 12 ? "PM" : "AM";
        hours = (hours % 12) || 12;
        const timeInStandard = `${hours}:${minutes} ${AmOrPm}`;
        return timeInStandard;
    } else {
        return;
    };
}