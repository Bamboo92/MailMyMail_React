export function generateDetailedTimestampId() {
    const now = new Date();
    return now.getFullYear().toString() +
        ('0' + (now.getMonth() + 1)).slice(-2) +
        ('0' + now.getDate()).slice(-2) + '_' +
        ('0' + now.getHours()).slice(-2) +
        ('0' + now.getMinutes()).slice(-2) +
        ('0' + now.getSeconds()).slice(-2) +
        ('00' + now.getMilliseconds()).slice(-3);
}