import React, { useState, useEffect } from "react";
import "./CustomTimePicker.css";

const CustomTimePicker = ({ visible, onCancel, onConfirm, initialTime }) => {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(30);
  const [isAM, setIsAM] = useState(true);
  const [stage, setStage] = useState("hour");

  useEffect(() => {
    if (initialTime) {
      try {
        const [time, modifier] = initialTime.split(" ");
        const [hh, mm] = time.split(":").map(Number);
        setHour(hh % 12 || 12);
        setMinute(mm);
        setIsAM(modifier?.toUpperCase() === "AM");
      } catch {
        setHour(3);
        setMinute(30);
        setIsAM(true);
      }
    }
  }, [initialTime]);

 

  const handleClockClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const normalizedAngle = ((angle + 450) % 360 + 360) % 360;

    if (stage === "hour") {
      const newHour = Math.round(normalizedAngle / 30) || 12;
      setHour(newHour);
      setStage("minute");
    } else {
      const newMinute = Math.round(normalizedAngle / 6) % 60;
      setMinute(newMinute);
    }
  };

  const handleConfirm = () => {
    const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )} ${isAM ? "AM" : "PM"}`;
    onConfirm(formatted);
  };

  return (
    <div className="timepicker-overly">
      <div className="timepicker-card animate-fade-in">
        <div className="timepicker-header">
          <h4>SELECT TIME</h4>
          <div className="time-display">
            <div className="time-values">
              <span
                className={`time-part ${stage === "hour" ? "active" : ""}`}
                onClick={() => setStage("hour")}
              >
                {String(hour).padStart(2, "0")}
              </span>
              <span>:</span>
              <span
                className={`time-part ${stage === "minute" ? "active" : ""}`}
                onClick={() => setStage("minute")}
              >
                {String(minute).padStart(2, "0")}
              </span>
            </div>
            <div className="am-pm-toggle">
              <button
                className={isAM ? "active" : ""}
                onClick={() => setIsAM(true)}
              >
                AM
              </button>
              <button
                className={!isAM ? "active" : ""}
                onClick={() => setIsAM(false)}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        <div className="clock" onClick={handleClockClick}>
          <div className="clock-face">
            {[...Array(stage === "hour" ? 12 : 12)].map((_, i) => {
              const val = stage === "hour" ? i + 1 : i * 5;
              const label =
                stage === "hour" ? val : String(val).padStart(2, "0");
              const angleDeg =
                stage === "hour" ? val * 30 - 90 : val * 6 - 90;
              const angle = (angleDeg * Math.PI) / 180;
              const radius = stage === "hour" ? 40 : 45;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isSelected =
                stage === "hour"
                  ? val === hour
                  : val === Math.round(minute / 5) * 5;

              return (
                <div
                  key={val}
                  className={`clock-number ${isSelected ? "selected" : ""}`}
                  style={{ top: `${y}%`, left: `${x}%` }}
                >
                  {label}
                </div>
              );
            })}
            <div
              className="clock-hand"
              style={{
                transform: `rotate(${
                  stage === "hour" ? hour * 30 - 90 : minute * 6 - 90
                }deg)`,
              }}
            >
              <div className="hand-dot"></div>
              <div className="hand-knob"></div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className=" btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className=" btn btn-primary" onClick={handleConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;
