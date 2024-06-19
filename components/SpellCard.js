"use client";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

const SpellCard = ({ spell, collapsed, bookmarked }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

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
    <div className="py-4 bg-amber-50 rounded-md text-stone-900 text-sm h-full">
      <div className="px-4">
        <div className="border-b-2 border-b-amber-400 border-opacity-50 flex justify-between gap-2">
          <h2 className="text-2xl font-serif text-red-800 ">{spell.name}</h2>
          <button onClick={() => setIsBookmarked(!isBookmarked)}>
            <FontAwesomeIcon
              icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
              size="2x"
              className="text-2xl font-serif text-red-800 hover:text-red-600"
            />
          </button>
        </div>
        <button onClick={toggleCollapse} className="pb-4">
          {isCollapsed ? "Mostrar mais" : "Mostrar menos"}
        </button>
      </div>

      {!isCollapsed && (
        <div style={{ overflowY: "auto" }} className="px-4 max-h-[500px]">
          <p className="italic">
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
              <p key={index}>{line}</p>
            ))}
          </div>
          {spell.higher_level && (
            <div className="pt-4">
              <strong>Em Níveis Superiores:</strong>
              {spell.higher_level.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpellCard;
