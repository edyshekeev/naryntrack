import Map from "./components/Map";
import "./styles/page.css";

export default function Home() {
  return (
    <div>
      <h1 className="page-title">My Location</h1>
      <Map />
    </div>
  );
}