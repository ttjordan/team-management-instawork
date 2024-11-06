import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamMemberList from './components/TeamMemberList';
import TeamMemberAdd from './components/TeamMemberAdd';
import TeamMemberEdit from './components/TeamMemberEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TeamMemberList />} />
          <Route path="/add" element={<TeamMemberAdd />} />
          <Route path="/edit/:memberId" element={<TeamMemberEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
