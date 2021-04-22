// Returns the string to display as the value of a stat
export function getStatDisplayValue(value, isPercentage) {
    if (value != null) {
        if (isPercentage) {
            return (value * 100).toFixed(1) + "%";
        } else {
            return Math.round(value);
        }
    } else {
        return "-";
    }
};

// Returns a Number representing the inputed value of a stat
// Returns null if the input is not a valid stat value
export function convertStatValue(value, isPercentage) {
    if (isPercentage) {
        return value / 100;
    } else {
        return value;
    }
};
