import "./ClockWidget.css";
import { useEffect, useState } from "react";

function ClockWidget({ collapsed = false }) {
  const [time, setTime] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let intervalId;

    async function fetchTime() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL ?? ""}/api/current-time`,
        );
        const data = await res.json();
        if (!data.dateTime) throw new Error("No time returned");

        setTime(
          new Date(
            data.year,
            data.month - 1,
            data.day,
            data.hour,
            data.minute,
            data.seconds,
          ),
        );
        setTimeZone(data.timeZone.replace(/_/g, " "));

        intervalId = setInterval(() => {
          setTime((current) => new Date(current.getTime() + 1000));
        }, 1000);
      } catch {
        setHasError(true);
      }
    }

    fetchTime();
    return () => clearInterval(intervalId);
  }, []);

  if (hasError || !time) return null;

  return (
    <div
      id="clock-widget"
      className={collapsed ? "collapsed" : ""}
      title="Your local time"
    >
      <p className="clock-date">
        {time.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="clock-time">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <p className="clock-zone">{timeZone}</p>
    </div>
  );
}

export default ClockWidget;
