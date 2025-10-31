import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Alphabet from "./pages/Alphabet";
import Numbers from "./pages/Numbers";
import Colors from "./pages/Colors";
import Quiz from "./pages/Quiz";
import Stories from "./pages/Stories";
import Rhymes from "./pages/Rhymes";
import Draw from "./pages/Draw";
import Vocabulary from "./pages/Vocabulary";
import MathGame from "./pages/MathGame";
import Puzzles from "./pages/Puzzles";
import Daily from "./pages/Daily";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/rhymes" element={<Rhymes />} />
          <Route path="/draw" element={<Draw />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/math" element={<MathGame />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/daily" element={<Daily />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
