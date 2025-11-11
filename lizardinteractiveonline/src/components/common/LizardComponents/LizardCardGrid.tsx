interface CardData {
  imageSrc: string;
  title: string;
  description?: string;
}

interface LizardCardGridProps {
  cards: CardData[];
  component: React.ComponentType<{ centerData: CardData }>;
  className?: string; 
  columns?: string; 
}
interface CardData {
  imageSrc: string;
  title: string;
  description?: string;
}

interface LizardCardGridProps {
  cards: CardData[];
  component: React.ComponentType<{ centerData: CardData }>;
  className?: string;
}

export function LizardCardGrid({
  cards,
  component: Component,
  className = "",
}: LizardCardGridProps) {
  return (
    <div
      className={`flex flex-row flex-wrap gap-6 w-full max-w-[600px] bg-gradient-to-r from-black/20 via-red-600/20 to-black/10 ${className}`}
    >
      {cards.map((card, index) => (
        <Component key={index} centerData={card} />
      ))}
    </div>
  );
}
