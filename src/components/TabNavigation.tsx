
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  FileText, 
  Image, 
  Scale, 
  FileOutput, 
  Book, 
  Languages, 
  MapPin 
} from "lucide-react";

interface TabNavigationProps {
  children: React.ReactNode;
}

export const TabNavigation = ({ children }: TabNavigationProps) => {
  const [activeTab, setActiveTab] = React.useState("chat");
  
  return (
    <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
      <div className="border-b sticky top-0 bg-background z-10">
        <TabsList className="w-full h-auto flex overflow-x-auto p-1">
          <TabsTrigger value="chat" className="flex items-center gap-2 py-2">
            <MessageCircle className="h-4 w-4" /> 
            <span className="hidden sm:inline">Legal Chat</span>
          </TabsTrigger>
          
          <TabsTrigger value="pdf" className="flex items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Document Analysis</span>
          </TabsTrigger>
          
          <TabsTrigger value="image" className="flex items-center gap-2 py-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Image Analysis</span>
          </TabsTrigger>
          
          <TabsTrigger value="case" className="flex items-center gap-2 py-2">
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">Case Analysis</span>
          </TabsTrigger>
          
          <TabsTrigger value="petition" className="flex items-center gap-2 py-2">
            <FileOutput className="h-4 w-4" />
            <span className="hidden sm:inline">Create Petition</span>
          </TabsTrigger>
          
          <TabsTrigger value="terms" className="flex items-center gap-2 py-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Legal Terms</span>
          </TabsTrigger>
          
          <TabsTrigger value="language" className="flex items-center gap-2 py-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Gender-Neutral</span>
          </TabsTrigger>
          
          <TabsTrigger value="lawyers" className="flex items-center gap-2 py-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Find Lawyers</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;
        return child;
      })}
    </Tabs>
  );
};
