import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { School, IdCard, Home, Plane } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Czech Republic Expat Portal
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive guide for studying and living in the Czech Republic
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/university-search">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <School className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>University Search</CardTitle>
              <CardDescription>Find your perfect study program</CardDescription>
            </CardHeader>
            <CardContent>
              Browse through universities and courses with advanced filters
            </CardContent>
          </Card>
        </Link>

        <Link href="/visa-guide">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <IdCard className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Visa Guide</CardTitle>
              <CardDescription>Step-by-step visa assistance</CardDescription>
            </CardHeader>
            <CardContent>
              Complete guidance for visa application process
            </CardContent>
          </Card>
        </Link>

        <Link href="/accommodation">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <Home className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle>Accommodation</CardTitle>
              <CardDescription>Find your new home</CardDescription>
            </CardHeader>
            <CardContent>
              Search for student dorms and private rentals
            </CardContent>
          </Card>
        </Link>

        <Link href="/travel-guide">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <Plane className="w-8 h-8 text-purple-500 mb-2" />
              <CardTitle>Travel Guide</CardTitle>
              <CardDescription>Prepare for your journey</CardDescription>
            </CardHeader>
            <CardContent>
              Essential tips and checklists for your arrival
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/university-search">
            Start Your Journey
          </Link>
        </Button>
      </div>
    </div>
  );
}