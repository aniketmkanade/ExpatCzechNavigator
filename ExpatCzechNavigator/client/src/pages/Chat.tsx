import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import ChatBot from "@/components/chat/ChatBot";

// TODO: Replace with actual auth check
const isPremium = true; // Temporary for testing

export default function Chat() {
  if (!isPremium) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              Premium Feature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The AI Assistant is available exclusively to premium members. Upgrade your account to access personalized assistance with visa applications, accommodation search, and more.
            </p>
            <Button>Upgrade to Premium</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ChatBot />
    </div>
  );
}
