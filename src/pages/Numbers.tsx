import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

const numberWords = [
  "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
];

const Numbers = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const speakNumber = (num: number, word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${num}, ${word}`);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveCard(num);
      setTimeout(() => setActiveCard(null), 800);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Count with Numbers! 🔢
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Click on any number to hear it counted!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {numbers.map((num) => (
            <Card
              key={num}
              className={`
                relative overflow-hidden cursor-pointer
                transition-all duration-300 hover:scale-105
                ${activeCard === num ? "scale-110 shadow-playful" : "shadow-card"}
              `}
              onClick={() => speakNumber(num, numberWords[num - 1])}
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-br from-card to-secondary/10">
                <span className="text-6xl md:text-7xl font-bold text-secondary mb-2">
                  {num}
                </span>
                <span className="text-lg md:text-xl text-muted-foreground capitalize">
                  {numberWords[num - 1]}
                </span>
                <Volume2 className="absolute bottom-3 right-3 h-5 w-5 text-accent opacity-60" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
