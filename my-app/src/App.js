import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Layout from './components/Layout';

export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" exact element={<Layout page={'basket'} />} />
        <Route path="/pantry" element={<Layout page={'pantry'} />} />
        <Route path="/manage" element={<Layout page={'manage'} />} />
      </Routes>
    </Router>
  );
}


