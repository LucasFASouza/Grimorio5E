"use client";
import React, { useState } from "react";

const SpellCard = ({ spell }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="w-[24%] p-2 bg-amber-50 rounded-md text-stone-900">
      <div>
        <h2 className="text-2xl font-serif text-red-800 border-b-2 border-b-amber-400 border-opacity-50">
          {spell.name}
        </h2>
        <button onClick={toggleCollapse} className="text-sm pb-4">
          {isCollapsed ? "Show More" : "Show Less"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="text-sm">
          <p>
            {spell.level > 0 ? "Magia " : "Truque "}
            de <strong>{spell.school}</strong>
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
          <div>
            <strong>Descrição:</strong>
            {spell.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                <p>{line}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellCard;
