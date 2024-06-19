"use client";
import React, { useState, useEffect } from "react";

const SpellCard = ({ spell, collapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  const toggleCollapse = () => {
    console.log(isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className="p-4 bg-amber-50 rounded-md text-stone-900">
      <div>
        <h2 className="text-2xl font-serif text-red-800 border-b-2 border-b-amber-400 border-opacity-50">
          {spell.name}
        </h2>
        <button onClick={toggleCollapse} className="text-sm pb-4">
          {isCollapsed ? "Mostrar mais" : "Mostrar menos"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="text-sm">
          <p className=" italic">
            {spell.level > 0
              ? `${capitalizeFirstLetter(spell.school)} de ${
                  spell.level
                }º nível`
              : `Truque de ${spell.school}`}
            {spell.ritual && " (ritual)"}
          </p>
          <p>
            <strong>Tempo de Conjuração:</strong> {spell.casting_time}
          </p>
          <p>
            <strong>Alcance:</strong> {capitalizeFirstLetter(spell.range)}
          </p>
          <p>
            <strong>Componentes:</strong> {spell.components.join(", ")}
          </p>
          {spell.material && (
            <p>
              <strong>Material:</strong> {capitalizeFirstLetter(spell.material)}
            </p>
          )}
          <p>
            <strong>Duração:</strong> {capitalizeFirstLetter(spell.duration)}
          </p>
          <div className="pt-4">
            {spell.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                <p>{line}</p>
              </React.Fragment>
            ))}
          </div>
          {spell.higher_level && (
            <div className="pt-4">
              <strong>Em Níveis Superiores:</strong>
              {spell.higher_level.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  <p>{line}</p>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpellCard;
