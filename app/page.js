import SpellCard from "@/components/SpellCard";
import spells from "../public/data/spell-details.json";

export default function Home() {
  const spellsByLevel = Array.from({ length: 10 }, () => []);

  spells.forEach((spell) => {
    spellsByLevel[spell.level].push(spell);
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Grimório 5e</h1>

      {spellsByLevel.map((spells, index) => (
        <div key={index} className="mt-12">
          <h2 className="text-2xl font-bold">Nível {index}</h2>
          <div className="flex flex-wrap">
            {spells.map((spell, index) => (
              <SpellCard key={index} spell={spell} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
