import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import HomePage from "@/pages/Home";
import UniversitySearch from "@/pages/UniversitySearch";
import VisaGuide from "@/pages/VisaGuide";
import Accommodation from "@/pages/Accommodation";
import TravelGuide from "@/pages/TravelGuide";
import CityGuide from "@/pages/CityGuide";
import Chat from "@/pages/Chat";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/university-search" component={UniversitySearch} />
          <Route path="/visa-guide" component={VisaGuide} />
          <Route path="/accommodation" component={Accommodation} />
          <Route path="/travel-guide" component={TravelGuide} />
          <Route path="/city-guide" component={CityGuide} />
          <Route path="/chat" component={Chat} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;