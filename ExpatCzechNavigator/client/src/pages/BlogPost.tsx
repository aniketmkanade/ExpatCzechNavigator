import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type BlogPost, type BlogComment } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// TODO: Replace with actual auth check
const isPremium = false; // Temporary for testing

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const { data: post, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog/posts", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return response.json();
    },
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<BlogComment[]>({
    queryKey: ["/api/blog/posts", post?.id, "comments"],
    enabled: !!post?.id,
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${post!.id}/comments`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    },
  });

  if (postLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
      </div>
    );
  }

  if (post.isPremium && !isPremium) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-500" />
              Premium Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is a premium article. Upgrade your account to access exclusive content about studying and living in the Czech Republic.
            </p>
            <Button asChild>
              <a href="/signup">Upgrade to Premium</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">{post.category}</span>
            {post.isPremium && (
              <Lock className="w-4 h-4 text-yellow-500" />
            )}
          </div>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex gap-2">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <Button type="submit">Post</Button>
              </div>
            </form>

            {commentsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {comments?.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm text-muted-foreground">
                          User {comment.userId}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function handleSubmitComment(e: React.FormEvent) {
  e.preventDefault();
  if (!comment.trim()) return;

  try {
    const response = await fetch(`/api/blog/posts/${post!.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    });

    if (!response.ok) throw new Error("Failed to post comment");

    setComment("");
    toast({
      title: "Success",
      description: "Your comment has been posted",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to post comment",
    });
  }
}