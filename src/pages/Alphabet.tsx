import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Alphabet = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const speakLetter = (letter: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveCard(letter);
      setTimeout(() => setActiveCard(null), 500);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Learn the Alphabet! 🔤
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Click on any letter to hear how it sounds!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {letters.map((letter) => (
            <Card
              key={letter}
              className={`
                relative overflow-hidden cursor-pointer
                transition-all duration-300 hover:scale-105
                ${activeCard === letter ? "scale-110 shadow-playful" : "shadow-card"}
              `}
              onClick={() => speakLetter(letter)}
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-br from-card to-muted/30">
                <span className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  {letter}
                </span>
                <span className="text-2xl md:text-3xl text-muted-foreground">
                  {letter.toLowerCase()}
                </span>
                <Volume2 className="absolute bottom-3 right-3 h-5 w-5 text-secondary opacity-60" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alphabet;
