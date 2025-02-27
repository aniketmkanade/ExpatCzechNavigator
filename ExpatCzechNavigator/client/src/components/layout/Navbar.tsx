import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { School, IdCard, Home, Plane, MapPin, MessageSquare, BookOpen, LogIn } from "lucide-react";

// TODO: Replace with actual auth check
const isAuthenticated = false; // Temporary for testing

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Button variant="link" className="p-0" asChild>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CZ Expat Portal
            </Link>
          </Button>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={location === "/university-search" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/university-search" className="flex items-center">
                <School className="w-4 h-4 mr-2" />
                Universities
              </Link>
            </Button>

            <Button
              variant={location === "/visa-guide" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/visa-guide" className="flex items-center">
                <IdCard className="w-4 h-4 mr-2" />
                Visa Guide
              </Link>
            </Button>

            <Button
              variant={location === "/accommodation" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/accommodation" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Accommodation
              </Link>
            </Button>

            <Button
              variant={location === "/travel-guide" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/travel-guide" className="flex items-center">
                <Plane className="w-4 h-4 mr-2" />
                Travel Guide
              </Link>
            </Button>

            <Button
              variant={location === "/city-guide" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/city-guide" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                City Guide
              </Link>
            </Button>

            <Button
              variant={location === "/chat" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/chat" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Link>
            </Button>
            <Button
              variant={location === "/blog" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="/blog" className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog
              </Link>
            </Button>

            {!isAuthenticated ? (
              <Button
                variant="default"
                className="ml-4"
                asChild
              >
                <Link href="/login" className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}