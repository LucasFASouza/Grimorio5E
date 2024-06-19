"use client";

import React, { useState, useEffect } from "react";
import SpellCard from "@/components/SpellCard";
import { Select, SelectItem, Input } from "@nextui-org/react";

import spells from "../public/data/spell-details.json";
import spellLists from "../public/data/class-spells.json";

export default function Home() {
  const [spellsByLevel, setSpellsByLevel] = useState(
    Array.from({ length: 10 }, () => [])
  );

  const [collapsedStates, setCollapsedStates] = useState(Array(10).fill(false));
  const [bookmarks, setBookmarks] = useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [searchSpell, setSearchSpell] = useState("");

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

    if (searchSpell) {
      filteredSpells = filteredSpells.filter((spell) =>
        spell.name.toLowerCase().includes(searchSpell.toLowerCase())
      );
    }

    let filteredSpellsByLevel = Array.from({ length: 10 }, () => []);

    filteredSpells.forEach((spell) => {
      filteredSpellsByLevel[spell.level].push(spell);
    });

    setSpellsByLevel(filteredSpellsByLevel);
  }, [selectedClass, searchSpell, spellLists, spells]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold font-serif text-red-800">
        Grimório 5e
      </h1>

      <div className="grid lg:grid-cols-3 w-full gap-4">
        <div className="lg:col-span-2 flex items-center">
          <Input
            placeholder="Buscar magia"
            onChange={(e) => setSearchSpell(e.target.value)}
          />
        </div>

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
      </div>

      {spellsByLevel.map(
        (spells, index) =>
          spells.length > 0 && (
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
                  <SpellCard
                    key={jindex}
                    spell={spell}
                    collapsed={collapsedStates[index]}
                    bookmarked={bookmarks.includes(spell.id)}
                  />
                ))}
              </div>
            </div>
          )
      )}

      <footer className="text-sm pt-8">
        <h3 className="text-lg font-bold font-serif text-red-800 border-b-2 border-b-amber-400 border-opacity-50 ">
          Grimório 5e.
        </h3>
        <p>
          Essa ferramenta é baseada no{" "}
          <a
            className="font-semibold underline"
            href="https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf"
          >
            System Reference Document
          </a>{" "}
          (SRD) e opera sob a Open Game License (OGL).
        </p>
        <p>Não é oficialmente afiliada à Wizards of the Coast.</p>
        <p>
          Construida com{" "}
          <a className="font-semibold underline" href="https://reactjs.org/">
            React
          </a>
          ,{" "}
          <a className="font-semibold underline" href="https://nextjs.org/">
            Next.js
          </a>
          , e{" "}
          <a className="font-semibold underline" href="https://nextui.org/">
            NextUI
          </a>
          .
        </p>
        <p>
          Desenvolivda por{" "}
          <a
            className="font-semibold underline"
            href="https://github.com/LucasFASouza"
          >
            Lucas
          </a>{" "}
          para meus aventureiros Anna e Pedro.
        </p>
      </footer>
    </main>
  );
}
