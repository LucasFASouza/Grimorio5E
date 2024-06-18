"use client";
import React, { useState } from "react";

const SpellCard = ({ spell }) => {
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="w-1/4 p-2">
      <div className="card-header">
        <h2 className="text-xl font-bold">{spell.name}</h2>
        <button onClick={toggleCollapse} className="text-sm">
          {isCollapsed ? "Show More" : "Show Less"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="card-body">
          <p>
            Círculo de <strong>{spell.school}</strong>
            {spell.level > 0 && ` (Nível ${spell.level})`}
            {spell.level == 0 && ` (Truque)`}
          </p>
          <p>
            <strong>Tempo de Conjuração:</strong> {spell.casting_time}
          </p>
          <p>
            <strong>Alcance:</strong> {spell.range}
          </p>
          <p>
            <strong>Componentes:</strong> {spell.components.join(", ")}
          </p>
          <p>
            <strong>Duração:</strong> {spell.duration}
          </p>
          <p>
            <strong>Descrição:</strong> {spell.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SpellCard;
