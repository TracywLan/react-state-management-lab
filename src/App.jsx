// src/App.jsx
import { useState } from "react";
import './App.css';

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
    },
  ]);

  const handleAddFighter = (newFighter) => {
    if (newFighter.price > money) {
      console.log("Not enough money"); // Changed from return <p> to logic check
      return; 
    }
    const newMoney = money - newFighter.price;
    setMoney(newMoney);

    const newZombieFightersArray = zombieFighters.filter(f => f.id !== newFighter.id);
    setZombieFighters(newZombieFightersArray);

    const newTeam = [...team, newFighter];
    setTeam(newTeam);
  };

  const handleRemoveFighter = (removeFighter) => {
    setMoney(money + removeFighter.price);
    setZombieFighters([...zombieFighters, removeFighter]);
    setTeam(team.filter(f => f.id !== removeFighter.id));
  };

  const totalAgility = team.reduce((acc, member) => acc + member.agility, 0);
  const totalStrength = team.reduce((acc, member) => acc + member.strength, 0);

  return (
    <div className="game-container">
      {/* HUD HEADER */}
      <header className="game-hud">
        <div className="logo-section">
          <h1>ZOMBIE APOCALYPSE</h1>
          <span className="subtitle">Team Builder</span>
        </div>
        <div className="stats-board">
          <div className="stat-item money">
            <span className="label">BANK</span>
            <span className="value">${money}</span>
          </div>
          <div className="stat-item strength">
            <span className="label">STR</span>
            <span className="value">{totalStrength}</span>
          </div>
          <div className="stat-item agility">
            <span className="label">AGI</span>
            <span className="value">{totalAgility}</span>
          </div>
        </div>
      </header>

      <main className="game-arena">
        {/* MY TEAM SECTION */}
        <section className="area team-area">
          <div className="area-header">
            <h2>Active Squad ({team.length})</h2>
          </div>
          
          {team.length === 0 ? (
            <div className="empty-message">No fighters recruited yet.</div>
          ) : (
            <div className="card-grid">
              {team.map((member) => (
                <div key={member.id} className="fighter-card team-card">
                  <div className="card-image">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="card-details">
                    <h3>{member.name}</h3>
                    <div className="stats-row">
                      <span>STR: {member.strength}</span>
                      <span>AGI: {member.agility}</span>
                    </div>
                    <button 
                      className="btn btn-remove" 
                      onClick={() => handleRemoveFighter(member)}
                    >
                      Release (+${member.price})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SHOP SECTION */}
        <section className="area shop-area">
          <div className="area-header">
            <h2>Recruitment Center</h2>
          </div>

          <div className="card-grid">
            {zombieFighters.map((zombieFighter) => (
              <div key={zombieFighter.id} className="fighter-card shop-card">
                <div className="card-image">
                  <img src={zombieFighter.img} alt={zombieFighter.name} />
                </div>
                <div className="card-details">
                  <h3>{zombieFighter.name}</h3>
                  <div className="stats-row">
                    <span>STR: {zombieFighter.strength}</span>
                    <span>AGI: {zombieFighter.agility}</span>
                  </div>
                  <div className="price-tag">Cost: ${zombieFighter.price}</div>
                  <button 
                    className="btn btn-add" 
                    disabled={money < zombieFighter.price}
                    onClick={() => handleAddFighter(zombieFighter)}
                  >
                    Recruit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;