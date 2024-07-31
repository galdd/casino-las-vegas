import React from 'react';
import { Layout } from 'antd';
import WinningGuide from './components/WinningGuide';
import GameSection from './components/GameSection';
import SessionManager from './components/SessionManager';
import './App.css';

const { Header } = Layout;

const App = () => {
  return (
    <div className="layout">
      <Header className="header">
        <h2>Casino Las Vegas</h2>
      </Header>
      <div className="container">
        <main className="main-content">
          <div className="content">
            <SessionManager>{GameSection}</SessionManager>
          </div>
        </main>
        <aside className="sidebar">
          <WinningGuide />
        </aside>
      </div>
    </div>
  );
};

export default App;
