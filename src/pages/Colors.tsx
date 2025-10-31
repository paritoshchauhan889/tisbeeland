import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const colorOptions = [
  { name: "Red", hex: "#EF4444", hsl: "0 84% 60%" },
  { name: "Blue", hex: "#3B82F6", hsl: "217 91% 60%" },
  { name: "Yellow", hex: "#EAB308", hsl: "48 96% 53%" },
  { name: "Green", hex: "#22C55E", hsl: "142 76% 45%" },
  { name: "Orange", hex: "#F97316", hsl: "25 95% 53%" },
  { name: "Purple", hex: "#A855F7", hsl: "268 80% 60%" },
];

const Colors = () => {
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mixedColor, setMixedColor] = useState<string | null>(null);

  const selectColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else if (selectedColors.length < 2) {
      const newSelected = [...selectedColors, colorName];
      setSelectedColors(newSelected);
      
      if (newSelected.length === 2) {
        mixColors(newSelected);
      }
    } else {
      toast.info("Clear your mix to select new colors!");
    }
  };

  const mixColors = (colors: string[]) => {
    const mixResults: { [key: string]: string } = {
      "Red,Blue": "Purple",
      "Blue,Red": "Purple",
      "Red,Yellow": "Orange",
      "Yellow,Red": "Orange",
      "Blue,Yellow": "Green",
      "Yellow,Blue": "Green",
    };

    const key = colors.join(",");
    const result = mixResults[key];
    
    if (result) {
      setMixedColor(result);
      toast.success(`${colors[0]} + ${colors[1]} = ${result}! 🎨`);
    }
  };

  const clearMix = () => {
    setSelectedColors([]);
    setMixedColor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/20 via-background to-success/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-warning">
            Mix Colors! 🎨
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-4">
          Select two colors to mix them together!
        </p>

        {mixedColor && (
          <Card className="mb-8 p-6 bg-gradient-fun text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 animate-bounce-slow" />
                <div>
                  <p className="text-lg font-semibold">Amazing Mix!</p>
                  <p className="text-2xl font-bold">{selectedColors[0]} + {selectedColors[1]} = {mixedColor}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={clearMix}
              >
                Try Again
              </Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {colorOptions.map((color) => (
            <Card
              key={color.name}
              className={`
                relative overflow-hidden cursor-pointer
                transition-all duration-300 hover:scale-105
                ${selectedColors.includes(color.name) ? "ring-4 ring-primary scale-105 shadow-playful" : "shadow-card"}
              `}
              onClick={() => selectColor(color.name)}
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6">
                <div
                  className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-lg"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-2xl font-bold text-foreground">
                  {color.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colors;
