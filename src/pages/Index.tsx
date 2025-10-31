import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, Hash, Palette, Brain, Music, Pencil, BookHeart, MessageCircle, Calculator, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const zones = [
    {
      title: "AlphabetLand",
      description: "Learn letters & sounds",
      icon: BookOpen,
      path: "/alphabet",
      gradient: "from-primary/30 to-warning/20",
      emoji: "🅰️"
    },
    {
      title: "NumberWorld",
      description: "Count & calculate",
      icon: Hash,
      path: "/numbers",
      gradient: "from-secondary/30 to-accent/20",
      emoji: "🔢"
    },
    {
      title: "ColorLand",
      description: "Mix & paint colors",
      icon: Palette,
      path: "/colors",
      gradient: "from-pink/30 to-warning/20",
      emoji: "🎨"
    },
    {
      title: "BrainyBee",
      description: "Memory & puzzles",
      icon: Brain,
      path: "/puzzles",
      gradient: "from-teal/30 to-success/20",
      emoji: "🧩"
    },
    {
      title: "RhymesWorld",
      description: "Sing & dance along",
      icon: Music,
      path: "/rhymes",
      gradient: "from-pink/30 to-secondary/20",
      emoji: "🎵"
    },
    {
      title: "DrawiFun",
      description: "Draw & create art",
      icon: Pencil,
      path: "/draw",
      gradient: "from-warning/30 to-pink/20",
      emoji: "🖍️"
    },
    {
      title: "StoryNest",
      description: "Read magical tales",
      icon: BookHeart,
      path: "/stories",
      gradient: "from-success/30 to-teal/20",
      emoji: "📚"
    },
    {
      title: "LearnMyWords",
      description: "Build vocabulary",
      icon: MessageCircle,
      path: "/vocabulary",
      gradient: "from-secondary/30 to-primary/20",
      emoji: "🗣️"
    },
    {
      title: "MathMagic",
      description: "Fun math practice",
      icon: Calculator,
      path: "/math",
      gradient: "from-teal/30 to-secondary/20",
      emoji: "🔢"
    },
    {
      title: "KidsSmart",
      description: "Daily challenges",
      icon: Star,
      path: "/daily",
      gradient: "from-primary/30 to-pink/20",
      emoji: "🧠"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Floating clouds */}
      <div className="absolute top-10 left-10 text-6xl animate-float opacity-60">☁️</div>
      <div className="absolute top-32 right-20 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>☁️</div>
      <div className="absolute bottom-40 left-32 text-7xl animate-float opacity-40" style={{ animationDelay: '2s' }}>☁️</div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-fun bg-clip-text text-transparent" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
              TisbeeLand 🐝
            </h1>
            <div className="absolute -top-4 -right-8 text-5xl animate-bounce-slow">✨</div>
          </div>
          <p className="text-2xl md:text-3xl text-foreground font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Learn, Play, and Grow in One Magical World! 🎈
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <Card
                key={zone.path}
                className="group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-2 shadow-card hover:shadow-playful"
                onClick={() => navigate(zone.path)}
              >
                <div className={`p-6 bg-gradient-to-br ${zone.gradient} relative`}>
                  <div className="absolute top-2 right-2 text-3xl">{zone.emoji}</div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 rounded-2xl bg-background/80 backdrop-blur-sm">
                      <Icon className="h-8 w-8 text-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
                        {zone.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {zone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg text-foreground font-medium mb-2">
            👆 Click any zone to start your adventure!
          </p>
          <p className="text-sm text-muted-foreground">
            Guided by Tisbee the Bee 🐝
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
