import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const stories = [
  {
    id: 1,
    title: "The Honest Woodcutter",
    moral: "Honesty is the best policy",
    content: "Once upon a time, a woodcutter was cutting wood near a river. His axe fell into the water. A magical fairy appeared and gave him a golden axe. The honest woodcutter said it wasn't his. The fairy was pleased and gave him his iron axe plus the golden one as a reward for his honesty!",
    emoji: "🪓",
    color: "from-success/30 to-teal/20"
  },
  {
    id: 2,
    title: "The Ant and the Grasshopper",
    moral: "Hard work pays off",
    content: "In summer, an ant worked hard collecting food. A grasshopper played and sang all day. When winter came, the ant had plenty of food, but the grasshopper had none. The grasshopper learned that hard work is important!",
    emoji: "🐜",
    color: "from-primary/30 to-warning/20"
  },
  {
    id: 3,
    title: "The Lion and the Mouse",
    moral: "Everyone can help",
    content: "A tiny mouse woke up a sleeping lion. The lion was about to eat him, but the mouse promised to help someday. Later, the lion was caught in a net. The little mouse chewed through the ropes and set the lion free!",
    emoji: "🦁",
    color: "from-secondary/30 to-accent/20"
  },
  {
    id: 4,
    title: "The Boy Who Cried Wolf",
    moral: "Always tell the truth",
    content: "A shepherd boy played tricks by crying 'Wolf!' when there was no wolf. Villagers came running but found no wolf. When a real wolf came and he cried for help, nobody believed him. Always tell the truth!",
    emoji: "🐺",
    color: "from-pink/30 to-warning/20"
  }
];

const Stories = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const readStory = (story: typeof stories[0]) => {
    setSelectedStory(story.id);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(story.content);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setSelectedStory(null);
      window.speechSynthesis.speak(utterance);
      toast.success(`Reading: ${story.title} 📖`);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/20 via-background to-teal/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-success" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            StoryNest 📚
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Listen to magical stories with important lessons!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="overflow-hidden transition-all duration-300 hover:scale-105 shadow-card hover:shadow-playful"
            >
              <div className={`p-6 bg-gradient-to-br ${story.color}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-6xl">{story.emoji}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
                      {story.title}
                    </h2>
                    <p className="text-sm font-semibold text-success mb-3">
                      ⭐ Moral: {story.moral}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {story.content}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => readStory(story)}
                    disabled={selectedStory === story.id}
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    {selectedStory === story.id ? "Reading..." : "Listen"}
                  </Button>
                  {selectedStory === story.id && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={stopReading}
                    >
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
