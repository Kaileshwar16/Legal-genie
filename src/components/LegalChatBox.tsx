
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "bot";
  content: string;
  relatedCases?: RelatedCase[];
}

interface RelatedCase {
  title: string;
  link: string;
  summary_and_advice: string;
}

interface LegalChatBoxProps {
  onSendMessage: (message: string) => Promise<{
    main_response: string;
    related_cases: RelatedCase[];
  }>;
}

export const LegalChatBox = ({ onSendMessage }: LegalChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Welcome to Legal Aid Genie. How can I assist you with your legal query today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(userMessage);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: response.main_response,
          relatedCases: response.related_cases,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm sorry, I encountered an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <Card
                className={`p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-12"
                    : "bg-muted mr-12"
                }`}
              >
                <div className="font-medium mb-1">
                  {message.role === "user" ? "You" : "Legal Aid Genie"}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </Card>

              {message.relatedCases && message.relatedCases.length > 0 && (
                <div className="mt-2 space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Related Cases:</h3>
                  {message.relatedCases.map((relatedCase, idx) => (
                    <Card key={idx} className="p-3 bg-secondary/50">
                      <h4 className="font-medium text-sm">{relatedCase.title}</h4>
                      <a
                        href={relatedCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View Case
                      </a>
                      <div className="mt-1 text-xs text-gray-700 whitespace-pre-wrap">
                        {relatedCase.summary_and_advice}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your legal question..."
          className="min-h-[60px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ""}
          className="self-end"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
