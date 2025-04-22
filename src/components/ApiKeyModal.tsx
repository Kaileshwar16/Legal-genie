
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal = ({ isOpen, onClose }: ApiKeyModalProps) => {
  const [googleApiKey, setGoogleApiKey] = useLocalStorage("googleApiKey", "");
  const [groqApiKey, setGroqApiKey] = useLocalStorage("groqApiKey", "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key Configuration</DialogTitle>
          <DialogDescription>
            Enter your API keys to enable all features of the Legal Aid Genie.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              These keys are stored locally in your browser and are not sent to any server except the official API endpoints.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="google-api-key" className="text-sm font-medium">
              Google Gemini API Key
            </label>
            <Input
              id="google-api-key"
              type="password"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              placeholder="Enter Google API Key"
            />
            <p className="text-xs text-muted-foreground">
              Required for document analysis and image recognition features.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="groq-api-key" className="text-sm font-medium">
              GROQ API Key
            </label>
            <Input
              id="groq-api-key"
              type="password"
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
              placeholder="Enter GROQ API Key"
            />
            <p className="text-xs text-muted-foreground">
              Required for legal analysis and response generation features.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Keys"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
