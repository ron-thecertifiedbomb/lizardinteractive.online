export type TimeFormat = "locale" | "iso" | "timestamp" | "time";

/**
 * Returns both local server time and UTC server time.
 * @param format - The format for the returned time values.
 */
export function getServerTimes(format: TimeFormat = "locale") {
  const now = new Date();

  const localTime =
    format === "iso"
      ? now.toISOString()
      : format === "timestamp"
      ? now.getTime()
      : format === "time"
      ? now.toLocaleTimeString() // HH:MM:SS AM/PM
      : now.toLocaleString();

  const utcTime =
    format === "locale"
      ? now.toUTCString()
      : format === "timestamp"
      ? now.getTime()
      : format === "time"
      ? now.toUTCString().split(" ")[4] // HH:MM:SS in UTC
      : now.toISOString();

  return { localTime, utcTime };
}
