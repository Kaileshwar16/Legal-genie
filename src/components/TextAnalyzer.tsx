
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface TextAnalyzerProps {
  onAnalyze: (text: string) => Promise<{
    main_response: string;
  }>;
  placeholder: string;
  title: string;
  buttonText: string;
}

export const TextAnalyzer = ({ 
  onAnalyze, 
  placeholder, 
  title, 
  buttonText 
}: TextAnalyzerProps) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (text.trim() === "") return;
    
    setIsLoading(true);
    try {
      const response = await onAnalyze(text);
      setResult(response.main_response);
    } catch (error) {
      console.error("Error analyzing text:", error);
      setResult("An error occurred while analyzing your text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-[150px]"
        />
      </div>

      <Button 
        onClick={handleAnalyze} 
        disabled={isLoading || text.trim() === ""}
        className="w-full"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {buttonText}
      </Button>

      {result && (
        <div className="border rounded-md p-4 bg-muted/50">
          <h4 className="font-medium text-sm mb-2">Result:</h4>
          <div className="text-sm">
            <MarkdownRenderer content={result} />
          </div>
        </div>
      )}
    </div>
  );
};
