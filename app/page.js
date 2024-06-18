import spells from "../public/data/spell-details.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Grimório 5e</h1>
      {spells.map((spell, index) => (
        <div key={index} className="mb-4">
          <div className="card-header">
            <h2>{spell.name}</h2>
          </div>
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
        </div>
      ))}
    </main>
  );
}
