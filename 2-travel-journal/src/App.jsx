import Entry from "./components/Entry";
import Header from "./components/Header";
import data from "./data";

function App() {
  const entries = data.map((entry) => {
    return (
      <Entry
        img={entry.img}
        title={entry.country}
        country={entry.title}
        googleMapsLink={entry.googleMapsLink}
        dates={entry.dates}
        text={entry.text}
      />
    );
  });

  return (
    <>
      <Header />
      <main className="container">{entries}</main>
    </>
  );
}

export default App;
