import DefaultCarousel from "./components/DefaultCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GenericCard from "./components/GenericCard";

const App = () => {
  return (
    <div id="root">
      <h1>Jaxon Shimazu</h1>
      <br />
      <div id="biography">
        <h5 id="description">
          My name is Jaxon Shimazu and I am a Sophomore at Waiakea High. I first
          started programming when I was 8 and have never stopped since. This
          website is a little about me, what I do, and my goals for my future...
          let's <span>JUMP RIGHT IN</span>
        </h5>
        <img id="jaxon-pic" src="./Jaxon.png" alt="" />
      </div>

      <center>
        <DefaultCarousel
          imgs={["HCA1.jpg", "HCA2.jpg", "HCA3.jpg"]}
          title="Hawaii Coding Academy"
          root="HCA"
        />
        <DefaultCarousel
          imgs={["Astroday.png", "InterRobotics.png", "Robotics.jpg", "RoboticsBoard.png", "IQVolunteer.png"]}
          title="Robotics"
          root="Robotics"
        />

        <div id="clubs">
          <GenericCard 
            title="NexTech" 
            caption="Been volunteering and entering NexTech competitions" 
            src="HCA1.jpg" 
            root="HCA"
          />
          <GenericCard 
            title="NexTech" 
            caption="Been volunteering and entering NexTech competitions" 
            src="HCA2.jpg" 
            root="HCA"
          />
          <GenericCard 
            title="NexTech" 
            caption="Been volunteering and entering NexTech competitions" 
            src="HCA3.jpg" 
            root="HCA"
          />
        </div>
        
      </center>
      
    </div>
  );
};

export default App;
