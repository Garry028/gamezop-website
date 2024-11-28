import GameSection from "./components/GameSection";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="container mx-auto ">
      <Suspense>
        <GameSection />
      </Suspense>
    </div>
  );
}
