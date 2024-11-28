import GameSection from "./components/GameSection";
export default function Home({ searchParams }: { searchParams: never }) {
  return (
    <div className="container mx-auto">
      <GameSection searchParams={searchParams} />
    </div>
  );
}
