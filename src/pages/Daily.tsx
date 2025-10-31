import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const dailyActivities = [
  {
    id: 1,
    title: "Trace the Letter A",
    description: "Practice writing the letter A 5 times",
    points: 10,
    icon: "✍️",
    completed: false
  },
  {
    id: 2,
    title: "Count to 10",
    description: "Count aloud from 1 to 10",
    points: 10,
    icon: "🔢",
    completed: false
  },
  {
    id: 3,
    title: "Name 3 Colors",
    description: "Say the names of red, blue, and yellow",
    points: 10,
    icon: "🎨",
    completed: false
  },
  {
    id: 4,
    title: "Listen to a Story",
    description: "Listen to one story in StoryNest",
    points: 15,
    icon: "📚",
    completed: false
  },
  {
    id: 5,
    title: "Sing a Rhyme",
    description: "Sing one nursery rhyme",
    points: 10,
    icon: "🎵",
    completed: false
  },
  {
    id: 6,
    title: "Draw Something",
    description: "Create a drawing in DrawiFun",
    points: 15,
    icon: "🖍️",
    completed: false
  },
];

const Daily = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(dailyActivities);
  const [totalPoints, setTotalPoints] = useState(0);

  const completeActivity = (id: number) => {
    const activity = activities.find(a => a.id === id);
    if (!activity || activity.completed) return;

    setActivities(activities.map(a => 
      a.id === id ? { ...a, completed: true } : a
    ));
    setTotalPoints(totalPoints + activity.points);
    toast.success(`Great job! You earned ${activity.points} Buzz Coins! 🐝`);
  };

  const completedCount = activities.filter(a => a.completed).length;
  const totalActivities = activities.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-pink/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            KidsSmart 🧠
          </h1>
        </div>

        <Card className="p-8 mb-8 bg-gradient-fun text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
                Daily Challenges
              </h2>
              <p className="text-lg opacity-90">
                Complete activities to earn Buzz Coins! 🐝
              </p>
            </div>
            <div className="text-center">
              <Trophy className="h-16 w-16 mb-2 mx-auto" />
              <div className="text-4xl font-bold">{totalPoints}</div>
              <div className="text-sm opacity-90">Buzz Coins</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-fun h-full transition-all duration-500"
                style={{ width: `${(completedCount / totalActivities) * 100}%` }}
              />
            </div>
            <span className="font-bold text-lg">
              {completedCount}/{totalActivities}
            </span>
          </div>
        </Card>

        <div className="space-y-4">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`p-6 transition-all duration-300 ${
                activity.completed ? "opacity-60" : "hover:shadow-playful"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-5xl">{activity.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Star className="h-6 w-6 text-primary mx-auto mb-1" />
                    <span className="font-bold text-lg">{activity.points}</span>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => completeActivity(activity.id)}
                    disabled={activity.completed}
                  >
                    {activity.completed ? "✓ Done" : "Complete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {completedCount === totalActivities && (
          <Card className="p-8 mt-8 bg-gradient-fun text-white text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
              Amazing Work!
            </h2>
            <p className="text-xl">
              You completed all activities today! Come back tomorrow for new challenges! 🎉
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Daily;
