"use client";

import React, { useState, useEffect } from "react";
import SpellCard from "@/components/SpellCard";
import { Select, SelectItem, Input, Spinner } from "@nextui-org/react";

import spellsDetails from "../public/data/spell_details.json";

export default function Home() {
  const [spellsByLevel, setSpellsByLevel] = useState(
    Array.from({ length: 10 }, () => [])
  );

  const [loading, setLoading] = useState(true);

  const [collapsedStates, setCollapsedStates] = useState(Array(10).fill(false));

  const [bookmarks, setBookmarks] = useState([]);
  const bookmarkOptions = ["Todos", "Favoritos"];
  const [bookmarkMode, setBookmarkMode] = useState("Todos");

  const classes = [
    "Bárbaro",
    "Bardo",
    "Bruxo",
    "Clérigo",
    "Druida",
    "Feiticeiro",
    "Guerreiro",
    "Ladino",
    "Mago",
    "Paladino",
    "Patrulheiro",
  ];
  const [selectedClass, setSelectedClass] = useState("");

  const schools = [
    "Adivinhação",
    "Abjuração",
    "Conjuração",
    "Encantamento",
    "Evocação",
    "Ilusão",
    "Necromancia",
    "Transmutação",
  ];
  const [selectedSchool, setSelectedSchool] = useState("");

  const levels = [
    "Truques",
    "1º Nível",
    "2º Nível",
    "3º Nível",
    "4º Nível",
    "5º Nível",
    "6º Nível",
    "7º Nível",
    "8º Nível",
    "9º Nível",
  ];
  const [selectedLevel, setSelectedLevel] = useState("");

  const tags = ["Ritual", "Materiais", "Concentração"];
  const [selectedTag, setSelectedTag] = useState([]);

  const [searchSpell, setSearchSpell] = useState("");

  const toggleCollapse = (level) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[level] = !newCollapsedStates[level];
    setCollapsedStates(newCollapsedStates);
  };

  const handleBookmarkChange = (spellId, isBookmarked) => {
    setBookmarks((currentBookmarks) => {
      if (isBookmarked) {
        return currentBookmarks.includes(spellId)
          ? currentBookmarks
          : [...currentBookmarks, spellId];
      } else {
        return currentBookmarks.filter((id) => id !== spellId);
      }
    });
  };

  const applyFilters = () => {
    let filteredSpells = spellsDetails;

    if (selectedClass) {
      filteredSpells = filteredSpells.filter((spell) =>
        spell.spell_lists.includes(selectedClass)
      );
    }

    if (searchSpell) {
      filteredSpells = filteredSpells.filter((spell) =>
        spell.name.toLowerCase().includes(searchSpell.toLowerCase())
      );
    }

    if (selectedSchool) {
      filteredSpells = filteredSpells.filter(
        (spell) => spell.school === selectedSchool.toLowerCase()
      );
    }

    if (selectedLevel) {
      filteredSpells = filteredSpells.filter(
        (spell) => spell.level == selectedLevel
      );
    }

    if (selectedTag.length > 0) {
      if (selectedTag.includes("Ritual")) {
        filteredSpells = filteredSpells.filter((spell) => spell.ritual);
      }

      if (selectedTag.includes("Materiais")) {
        filteredSpells = filteredSpells.filter((spell) => spell.material);
      }

      if (selectedTag.includes("Concentração")) {
        filteredSpells = filteredSpells.filter((spell) => spell.concentration);
      }
    }

    if (bookmarkMode === "Favoritos") {
      filteredSpells = filteredSpells.filter((spell) =>
        bookmarks.includes(spell.id)
      );
    }

    let filteredSpellsByLevel = Array.from({ length: 10 }, () => []);

    filteredSpells.forEach((spell) => {
      filteredSpellsByLevel[spell.level].push(spell);
    });

    setSpellsByLevel(filteredSpellsByLevel);
  };

  // Load bookmarks from local storage only on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");

    if (savedBookmarks) {
      const parsedBookmarks = JSON.parse(savedBookmarks);
      if (Array.isArray(parsedBookmarks)) {
        setBookmarks(parsedBookmarks);
      }
    }
  }, []);

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    setLoading(true);
    applyFilters();
    setLoading(false);
  }, [
    selectedClass,
    searchSpell,
    bookmarkMode,
    selectedLevel,
    selectedSchool,
    selectedTag,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-12">
      <h1 className="text-4xl font-bold font-serif text-red-800 p-12">
        Grimório 5e
      </h1>

      <div className="grid lg:grid-cols-8 w-full gap-4 py-8">
        <div className="col-span-8 lg:col-span-4 flex items-center">
          <Input
            placeholder="Buscar magia"
            onChange={(e) => setSearchSpell(e.target.value)}
          />
        </div>

        <div className="col-span-8 md:col-span-4 lg:col-span-2">
          <Select
            label="Filtrar por classe"
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

        <div className="col-span-8 md:col-span-4 lg:col-span-2">
          <Select
            label="Filtrar por favoritos"
            onSelectionChange={(selectedValue) => {
              setBookmarkMode(Array.from(selectedValue)[0]);
            }}
          >
            {bookmarkOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-8 w-full gap-4 py-8">
        <div className="col-span-8 md:col-span-4 lg:col-span-2">
          <Select
            label="Filtrar por tag"
            selectionMode="multiple"
            onSelectionChange={(selectedValue) => {
              setSelectedTag(Array.from(selectedValue));
            }}
          >
            {tags.map((tagName) => (
              <SelectItem key={tagName} value={tagName}>
                {tagName}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="col-span-8 md:col-span-4 lg:col-span-2">
          <Select
            label="Filtrar por escola"
            onSelectionChange={(selectedValue) => {
              setSelectedSchool(Array.from(selectedValue)[0]);
            }}
          >
            {schools.map((schoolName) => (
              <SelectItem key={schoolName} value={schoolName}>
                {schoolName}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="col-span-8 md:col-span-4 lg:col-span-2">
          <Select
            label="Filtrar por nível"
            onSelectionChange={(selectedValue) => {
              setSelectedLevel(Array.from(selectedValue)[0]);
            }}
          >
            {levels.map((levelName, levelIndex) => (
              <SelectItem key={levelIndex} value={levelIndex}>
                {levelName}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {spellsByLevel.map(
        (spellsDetails, index) =>
          spellsDetails.length > 0 && (
            <div key={index} className="w-screen p-12">
              <div className="flex justify-between text-sm">
                <h2 className="text-2xl font-bold font-serif text-red-800">
                  {levels[index]}
                </h2>

                <button onClick={() => toggleCollapse(index)}>
                  {collapsedStates[index] ? "Mostrar todos" : "Recolher todos"}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {spellsDetails.map((spell, jindex) => (
                  <SpellCard
                    key={jindex}
                    spell={spell}
                    collapsed={collapsedStates[index]}
                    bookmarked={bookmarks.includes(spell.id)}
                    onBookmarkChange={handleBookmarkChange}
                  />
                ))}
              </div>
            </div>
          )
      )}

      {loading && <Spinner size="lg" color="warning" />}

      <footer className="text-sm pt-8">
        <h3 className="text-lg font-bold font-serif text-red-800 border-b-2 border-b-amber-400 border-opacity-50 ">
          Grimório 5e.
        </h3>
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
          Desenvolvido por{" "}
          <a
            className="font-semibold underline"
            href="https://github.com/LucasFASouza"
          >
            Lucas
          </a>{" "}
          para meus aventureiros: Anna & Pedro.
        </p>
      </footer>
    </main>
  );
}
