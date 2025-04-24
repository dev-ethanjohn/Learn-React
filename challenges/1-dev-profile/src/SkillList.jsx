import Skill from "./Skill";
import skills from "./skills";

function SkillList() {
  return (
    <>
      <div className="skill-list">
        {skills.map((skill) => {
          return (
            <Skill
              skill={skill.skill}
              color={skill.color}
              level={skill.level}
            />
          );
        })}
      </div>
    </>
  );
}

export default SkillList;
