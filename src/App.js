
import WeatherApp from "./WeatherComp";

function App() {
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url('/img3.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "sans-serif",
        height: "100vh", // Adjust the height as needed
        width: "100vw",
        position: "relative",
      }}


    >
      <WeatherApp />
    </div>
  );
}

export default App;
