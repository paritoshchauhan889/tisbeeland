import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const emojis = ["🐶", "🐱", "🐼", "🦁", "🐸", "🦊", "🐯", "🐨"];

const Puzzles = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<{ emoji: string; id: number; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        emoji,
        id: index,
        flipped: false,
        matched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
          toast.success("Match found! 🎉");
          
          if (matches + 1 === emojis.length) {
            toast.success(`You won in ${moves + 1} moves! 🏆`);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal/20 via-background to-success/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-teal" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            BrainyBee 🧩
          </h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <Card className="p-4">
            <p className="text-lg font-bold">Moves: {moves}</p>
          </Card>
          <Card className="p-4">
            <p className="text-lg font-bold">Matches: {matches}/{emojis.length}</p>
          </Card>
          <Button onClick={initializeGame} variant="outline">
            <RotateCcw className="h-5 w-5 mr-2" />
            New Game
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`
                aspect-square cursor-pointer transition-all duration-300 hover:scale-105
                ${card.matched ? "opacity-50" : ""}
              `}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/10">
                {card.flipped || card.matched ? (
                  <span className="text-6xl">{card.emoji}</span>
                ) : (
                  <span className="text-6xl">❓</span>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            Find matching pairs by flipping cards! 🧠
          </p>
        </div>
      </div>
    </div>
  );
};

export default Puzzles;
