import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eraser, Trash2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Draw = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#22C55E" },
    { name: "Yellow", hex: "#EAB308" },
    { name: "Purple", hex: "#A855F7" },
    { name: "Orange", hex: "#F97316" },
    { name: "Pink", hex: "#EC4899" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    toast.success("Canvas cleared! Start fresh 🎨");
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = url;
    link.click();
    toast.success("Drawing saved! 📥");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/20 via-background to-pink/20 p-6">
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
          <h1 className="text-4xl md:text-5xl font-bold text-warning" style={{ fontFamily: "'Baloo Bhai 2', cursive" }}>
            DrawiFun 🖍️
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Create your own masterpiece!
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 p-6">
            <h3 className="font-bold text-lg mb-4">Colors</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  className={`h-12 rounded-lg border-4 transition-all ${
                    currentColor === color.hex ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setCurrentColor(color.hex)}
                  title={color.name}
                />
              ))}
            </div>

            <h3 className="font-bold text-lg mb-4">Brush Size</h3>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-center text-sm text-muted-foreground mt-2">{brushSize}px</p>

            <div className="space-y-2 mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCurrentColor("#FFFFFF")}
              >
                <Eraser className="h-4 w-4 mr-2" />
                Eraser
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={clearCanvas}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button
                className="w-full"
                onClick={downloadDrawing}
              >
                <Download className="h-4 w-4 mr-2" />
                Save Drawing
              </Button>
            </div>
          </Card>

          <Card className="md:col-span-3 p-6">
            <canvas
              ref={canvasRef}
              className="w-full h-[500px] border-4 border-dashed border-muted rounded-lg cursor-crosshair bg-white touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Draw;
