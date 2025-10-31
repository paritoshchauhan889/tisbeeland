import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const vocabularyWords = [
  { word: "Apple", emoji: "🍎", category: "Fruits" },
  { word: "Banana", emoji: "🍌", category: "Fruits" },
  { word: "Cat", emoji: "🐱", category: "Animals" },
  { word: "Dog", emoji: "🐕", category: "Animals" },
  { word: "Elephant", emoji: "🐘", category: "Animals" },
  { word: "Fish", emoji: "🐠", category: "Animals" },
  { word: "Grapes", emoji: "🍇", category: "Fruits" },
  { word: "House", emoji: "🏠", category: "Places" },
  { word: "Ice Cream", emoji: "🍦", category: "Food" },
  { word: "Juice", emoji: "🧃", category: "Drinks" },
  { word: "Kite", emoji: "🪁", category: "Toys" },
  { word: "Lion", emoji: "🦁", category: "Animals" },
  { word: "Moon", emoji: "🌙", category: "Nature" },
  { word: "Nest", emoji: "🪹", category: "Nature" },
  { word: "Orange", emoji: "🍊", category: "Fruits" },
  { word: "Pizza", emoji: "🍕", category: "Food" },
  { word: "Queen", emoji: "👸", category: "People" },
  { word: "Rain", emoji: "🌧️", category: "Weather" },
  { word: "Sun", emoji: "☀️", category: "Nature" },
  { word: "Tree", emoji: "🌳", category: "Nature" },
];

const Vocabulary = () => {
  const navigate = useNavigate();
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveWord(word);
      setTimeout(() => setActiveWord(null), 800);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  const categories = Array.from(new Set(vocabularyWords.map(w => w.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-primary/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-secondary" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            LearnMyWords 🗣️
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Build your vocabulary with pictures and sounds!
        </p>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {vocabularyWords
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card
                    key={item.word}
                    className={`
                      cursor-pointer transition-all duration-300 hover:scale-105
                      ${activeWord === item.word ? "scale-110 shadow-playful" : "shadow-card"}
                    `}
                    onClick={() => speakWord(item.word)}
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-4 bg-gradient-to-br from-card to-accent/10">
                      <div className="text-6xl mb-3">{item.emoji}</div>
                      <span className="text-lg font-bold text-center text-foreground">
                        {item.word}
                      </span>
                      <Volume2 className="absolute bottom-2 right-2 h-4 w-4 text-accent opacity-60" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;
