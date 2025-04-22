
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface PetitionGeneratorProps {
  onGenerate: (details: string) => Promise<{
    main_response: string;
    docx_content?: string;
  }>;
}

export const PetitionGenerator = ({ onGenerate }: PetitionGeneratorProps) => {
  const [details, setDetails] = useState("");
  const [petitionTemplate, setPetitionTemplate] = useState("");
  const [docxContent, setDocxContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (details.trim() === "") return;
    
    setIsLoading(true);
    try {
      const response = await onGenerate(details);
      setPetitionTemplate(response.main_response);
      setDocxContent(response.docx_content || "");
    } catch (error) {
      console.error("Error generating petition:", error);
      setPetitionTemplate("An error occurred while generating your petition template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!docxContent) return;
    
    // Convert base64 to blob
    const byteCharacters = atob(docxContent);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "petition_template.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Create Legal Petition</h3>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe your case details and the type of petition you need to file..."
          className="min-h-[150px]"
        />
      </div>

      <Button 
        onClick={handleGenerate} 
        disabled={isLoading || details.trim() === ""}
        className="w-full"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Generate Petition Template
      </Button>

      {petitionTemplate && (
        <div className="border rounded-md p-4 bg-muted/50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Petition Template:</h4>
            {docxContent && (
              <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                Download DOCX
              </Button>
            )}
          </div>
          <div className="text-sm">
            <MarkdownRenderer content={petitionTemplate} />
          </div>
        </div>
      )}
    </div>
  );
};
