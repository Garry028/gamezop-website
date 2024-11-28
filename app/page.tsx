import GameSection from "./components/GameSection";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className="container mx-auto">
      <GameSection searchParams={searchParams} />
    </div>
  );
}
