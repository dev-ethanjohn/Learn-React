function Skill({ skill, color, level }) {
  // let emoji;

  // if (level === "beginner") emoji = "👶";
  // else if (level === "intermediate") emoji = "👍";
  // else if (level === "advanced") emoji = "💪";
  const emojiMap = {
    beginner: "👶",
    intermediate: "👍",
    advanced: "💪",
  };

  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      {/* <span>{emoji}</span> */}
      <span>{emojiMap[level] || "❓"}</span>
    </div>
  );
}

export default Skill;
