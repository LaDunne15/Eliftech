import { Routes, Route,  BrowserRouter as Router, Link } from "react-router-dom";
import EventList from "../components/EventsList";
import EventRegistration from "../components/EventRegistration";
import EventGuests from "../components/EventGuests";

function App() {
  return (
    <div className="App">
      <Router>
          <header>
            <Link to="/">Event.IO</Link>
          </header>
          <Routes>
              <Route path="/" element={ <EventList/> } />
              <Route path="/register/:id" element={ <EventRegistration/> } />
              <Route path="/eventGuests/:id" element={ <EventGuests/> } />
          </Routes>
          <footer>
            <span>&copy; 2024</span>
            <a href="https://github.com/LaDunne15">@osh</a>
            <span>
              Test task for <a href="https://eliftech.com/">Eliftech</a>
            </span>
          </footer>
      </Router>
    </div>
  );
}

export default App;
