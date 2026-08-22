import DefaultCarousel from "./components/DefaultCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <body>
      <div id="root">
        <h1>Jaxon Shimazu</h1>
        <br />
        <center>
          <DefaultCarousel
            imgs={["HCA1.jpg", "HCA2.jpg", "HCA3.jpg"]}
            title="Hawaii Coding Academy"
          />
          <DefaultCarousel
            imgs={["HCA1.jpg", "HCA2.jpg", "HCA3.jpg"]}
            title="Clubs"
          />
        </center>
      </div>
    </body>
  );
};

export default App;
