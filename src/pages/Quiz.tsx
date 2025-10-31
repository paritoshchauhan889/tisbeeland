import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Question = {
  question: string;
  options: string[];
  correct: number;
  category: "alphabet" | "numbers" | "colors";
};

const questions: Question[] = [
  {
    question: "What comes after the letter B?",
    options: ["A", "C", "D", "E"],
    correct: 1,
    category: "alphabet"
  },
  {
    question: "How much is 5 + 3?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    category: "numbers"
  },
  {
    question: "What color do you get when you mix red and blue?",
    options: ["Green", "Purple", "Orange", "Brown"],
    correct: 1,
    category: "colors"
  },
  {
    question: "Which letter comes first in the alphabet?",
    options: ["B", "A", "Z", "C"],
    correct: 1,
    category: "alphabet"
  },
  {
    question: "What number comes after 10?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    category: "numbers"
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! Great job! 🌟");
    } else {
      toast.error("Oops! Try again next time!");
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-success/20 via-background to-primary/20 p-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8 text-center shadow-playful">
          <Trophy className="h-24 w-24 mx-auto mb-6 text-warning animate-bounce-slow" />
          <h1 className="text-4xl font-bold mb-4 text-primary">Amazing Work!</h1>
          <p className="text-2xl mb-6 text-muted-foreground">
            You scored {score} out of {questions.length}
          </p>
          
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="h-12 w-12 text-warning fill-warning animate-pop" />
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} size="lg" className="text-lg">
              Try Again
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" size="lg" className="text-lg">
              Go Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/20 via-background to-primary/20 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-success">
            Fun Quiz! 🎯
          </h1>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-xl text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: score }).map((_, i) => (
              <Star key={i} className="h-6 w-6 text-warning fill-warning" />
            ))}
          </div>
        </div>

        <Card className="p-8 shadow-playful">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                size="lg"
                variant={
                  selectedAnswer === null
                    ? "outline"
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className="text-xl py-8 h-auto"
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
