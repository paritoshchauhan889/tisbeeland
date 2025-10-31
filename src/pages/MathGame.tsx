import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MathGame = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");

  function generateQuestion() {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * (operation === '-' ? num1 : 10)) + 1;
    
    return {
      num1,
      num2,
      operation,
      correctAnswer: operation === '+' ? num1 + num2 : num1 - num2
    };
  }

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    if (isNaN(userAnswer)) {
      toast.error("Please enter a number!");
      return;
    }

    if (userAnswer === question.correctAnswer) {
      toast.success("Correct! Great job! 🎉");
      setScore(score + 1);
      setQuestion(generateQuestion());
      setAnswer("");
    } else {
      toast.error(`Not quite! The answer is ${question.correctAnswer}. Try the next one!`);
      setQuestion(generateQuestion());
      setAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal/20 via-background to-secondary/20 p-6">
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
            MathMagic 🔢
          </h1>
        </div>

        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/20 to-warning/10">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">⭐ Score: {score}</div>
          </div>
        </Card>

        <Card className="p-12 shadow-playful">
          <div className="text-center">
            <p className="text-2xl text-muted-foreground mb-8">Solve this problem:</p>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-8xl font-bold text-primary">{question.num1}</div>
              <div className="text-8xl font-bold text-secondary">
                {question.operation === '+' ? <Plus size={80} /> : <Minus size={80} />}
              </div>
              <div className="text-8xl font-bold text-primary">{question.num2}</div>
              <div className="text-8xl font-bold text-foreground">=</div>
              <div className="text-8xl font-bold text-success">?</div>
            </div>

            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              className="text-6xl font-bold text-center w-48 p-4 border-4 border-primary rounded-2xl mb-8 bg-background"
              placeholder="?"
              autoFocus
            />

            <Button
              size="lg"
              className="text-2xl px-12 py-8 h-auto"
              onClick={checkAnswer}
            >
              Check Answer ✓
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            Keep practicing to become a math wizard! 🧙‍♂️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathGame;
