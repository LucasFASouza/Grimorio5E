"use client";

import React, { useState, useEffect } from "react";
import SpellCard from "@/components/SpellCard";
import { Select, SelectItem } from "@nextui-org/react";

import spells from "../public/data/spell-details.json";
import spellLists from "../public/data/class-spells.json";

export default function Home() {
  const [spellsByLevel, setSpellsByLevel] = useState(
    Array.from({ length: 10 }, () => [])
  );

  const [collapsedStates, setCollapsedStates] = useState(Array(10).fill(false));

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const toggleCollapse = (level) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[level] = !newCollapsedStates[level];
    setCollapsedStates(newCollapsedStates);
  };

  useEffect(() => {
    let classesList = ["Todos"];

    Object.keys(spellLists).forEach((classe) => {
      classesList.push(classe);
    });

    setClasses(classesList);
  }, [spellLists]);

  useEffect(() => {
    let filteredSpells = spells;

    if (selectedClass && selectedClass !== "Todos") {
      let spellsClassIds = spellLists[selectedClass];

      filteredSpells = filteredSpells.filter((spell) =>
        spellsClassIds.includes(spell.id)
      );
    }

    let filteredSpellsByLevel = Array.from({ length: 10 }, () => []);

    filteredSpells.forEach((spell) => {
      filteredSpellsByLevel[spell.level].push(spell);
    });

    setSpellsByLevel(filteredSpellsByLevel);
  }, [selectedClass, spellLists, spells]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold font-serif text-red-800">
        Grimório 5e
      </h1>

      <Select
        label="Classe"
        onSelectionChange={(selectedValue) => {
          setSelectedClass(Array.from(selectedValue)[0]);
        }}
      >
        {classes.map((classeName) => (
          <SelectItem key={classeName} value={classeName}>
            {classeName}
          </SelectItem>
        ))}
      </Select>

      {spellsByLevel.map((spells, index) => (
        <div key={index} className="mt-6 w-screen p-8">
          <div className="flex justify-between text-sm">
            <h2 className="text-2xl font-bold font-serif text-red-800">
              {index === 0 ? "Truques" : `Magias de ${index}º Nível`}
            </h2>

            <button onClick={() => toggleCollapse(index)}>
              {collapsedStates[index] ? "Mostrar todos" : "Recolher todos"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {spells.map((spell, jindex) => (
              <div>
                <SpellCard
                  key={jindex}
                  spell={spell}
                  collapsed={collapsedStates[index]}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
