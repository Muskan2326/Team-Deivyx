import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Surveys from "./pages/Surveys";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import VideoCoaching from "./pages/VideoCoaching";
import WellnessGames from "./pages/WellnessGames";
import PersonalDiary from "./pages/PersonalDiary";
import ExpressYourself from "./pages/ExpressYourself";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="community" element={<Community />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="help" element={<Help />} />
            <Route path="video-coaching" element={<VideoCoaching />} />
            <Route path="wellness-games" element={<WellnessGames />} />
            <Route path="personal-diary" element={<PersonalDiary />} />
            <Route path="express-yourself" element={<ExpressYourself />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
