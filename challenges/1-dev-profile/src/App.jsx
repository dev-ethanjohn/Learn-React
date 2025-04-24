import Avatar from "./Avatar";
import Intro from "./Intro";
import SkillList from "./SkillList";
import jonas from "./assets/jonas.jpeg";

function App() {
  return (
    <div className="card">
      <Avatar profileImage={jonas} />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

export default App;
