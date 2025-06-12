// LetterAvatar.jsx
import React from "react";

const LetterAvatar = ({ name, size = "sm" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);
  const colors = ["#774dd3", "#e91e63", "#00bcd4", "#4caf50", "#ff9800"];
  const colorIndex = name.length % colors.length;

  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-circle text-white fw-bold ${
        size === "sm" ? "me-2" : ""
      }`}
      style={{
        backgroundColor: colors[colorIndex],
        width: size === "sm" ? "32px" : "40px",
        height: size === "sm" ? "32px" : "40px",
        fontSize: size === "sm" ? "12px" : "14px",
      }}
    >
      {initials}
    </div>
  );
};

export default LetterAvatar;
