import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const rhymes = [
  {
    id: 1,
    title: "Twinkle Twinkle Little Star",
    lyrics: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.",
    emoji: "⭐",
    color: "from-primary/30 to-warning/20"
  },
  {
    id: 2,
    title: "Baa Baa Black Sheep",
    lyrics: "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full!",
    emoji: "🐑",
    color: "from-secondary/30 to-accent/20"
  },
  {
    id: 3,
    title: "Mary Had a Little Lamb",
    lyrics: "Mary had a little lamb,\nLittle lamb, little lamb,\nMary had a little lamb,\nIts fleece was white as snow.",
    emoji: "🐑",
    color: "from-pink/30 to-warning/20"
  },
  {
    id: 4,
    title: "Humpty Dumpty",
    lyrics: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall,\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again.",
    emoji: "🥚",
    color: "from-teal/30 to-success/20"
  },
  {
    id: 5,
    title: "Old MacDonald",
    lyrics: "Old MacDonald had a farm,\nE-I-E-I-O!\nAnd on that farm he had a cow,\nE-I-E-I-O!\nWith a moo moo here,\nAnd a moo moo there!",
    emoji: "🚜",
    color: "from-success/30 to-teal/20"
  },
  {
    id: 6,
    title: "Itsy Bitsy Spider",
    lyrics: "The itsy bitsy spider,\nClimbed up the water spout,\nDown came the rain,\nAnd washed the spider out!",
    emoji: "🕷️",
    color: "from-primary/30 to-pink/20"
  }
];

const Rhymes = () => {
  const navigate = useNavigate();
  const [playingRhyme, setPlayingRhyme] = useState<number | null>(null);

  const playRhyme = (rhyme: typeof rhymes[0]) => {
    if (playingRhyme === rhyme.id) {
      window.speechSynthesis.cancel();
      setPlayingRhyme(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${rhyme.title}. ${rhyme.lyrics}`);
      utterance.rate = 0.8;
      utterance.pitch = 1.3;
      utterance.onend = () => setPlayingRhyme(null);
      window.speechSynthesis.speak(utterance);
      setPlayingRhyme(rhyme.id);
      toast.success(`Playing: ${rhyme.title} 🎵`);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink/20 via-background to-secondary/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-pink" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            RhymesWorld 🎵
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Sing along with classic nursery rhymes!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rhymes.map((rhyme) => (
            <Card
              key={rhyme.id}
              className="overflow-hidden transition-all duration-300 hover:scale-105 shadow-card hover:shadow-playful"
            >
              <div className={`p-6 bg-gradient-to-br ${rhyme.color}`}>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{rhyme.emoji}</div>
                  <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
                    {rhyme.title}
                  </h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">
                    {rhyme.lyrics}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => playRhyme(rhyme)}
                >
                  {playingRhyme === rhyme.id ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Play Rhyme
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rhymes;
