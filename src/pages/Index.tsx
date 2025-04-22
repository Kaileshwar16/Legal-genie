
import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { TabsContent } from "@/components/ui/tabs";
import { LegalChatBox } from "@/components/LegalChatBox";
import { PDFUploader, ImageUploader } from "@/components/FileUploader";
import { TextAnalyzer } from "@/components/TextAnalyzer";
import { PetitionGenerator } from "@/components/PetitionGenerator";
import { LocationFinder } from "@/components/LocationFinder";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const Index = () => {
  const [showApiModal, setShowApiModal] = useState(false);
  const [googleApiKey] = useLocalStorage("googleApiKey", "");
  const [groqApiKey] = useLocalStorage("groqApiKey", "");
  const [apiConfigured, setApiConfigured] = useState(false);
  
  useEffect(() => {
    // Check if API keys are configured
    setApiConfigured(!!googleApiKey && !!groqApiKey);
  }, [googleApiKey, groqApiKey]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent rounded-full p-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6 text-primary"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Legal Aid Genie</h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-base opacity-90">Your AI-powered legal assistant for Indian law</p>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowApiModal(true)}
                className="bg-primary/10 hover:bg-primary/20"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden min-h-[calc(100vh-12rem)]">
          <TabNavigation>
            {/* Chat Tab */}
            <TabsContent value="chat" className="h-[calc(100vh-12rem)]">
              <LegalChatBox onSendMessage={api.sendChatMessage} />
            </TabsContent>

            {/* PDF Analysis Tab */}
            <TabsContent value="pdf" className="p-6">
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Legal Document Analysis</h2>
                  <p className="text-gray-600 mb-4">Upload a legal document to get an in-depth analysis and explanation.</p>
                  <PDFUploader 
                    onUpload={async (file) => {
                      return await api.analyzePDF(file);
                    }} 
                  />
                </div>
              </div>
            </TabsContent>

            {/* Image Analysis Tab */}
            <TabsContent value="image" className="p-6">
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Legal Image Analysis</h2>
                  <p className="text-gray-600 mb-4">Upload an image to identify potential legal issues or documentation.</p>
                  <ImageUploader 
                    onUpload={async (file) => {
                      return await api.analyzeImage(file);
                    }} 
                  />
                </div>
              </div>
            </TabsContent>

            {/* Case Analysis Tab */}
            <TabsContent value="case" className="p-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Case Success Probability</h2>
                <p className="text-gray-600 mb-4">Describe your case to get an analysis of your success probability based on similar precedents.</p>
                <TextAnalyzer 
                  onAnalyze={api.analyzeCaseProbability}
                  placeholder="Describe your case details here... For example: I purchased a TV advertised as new, but received a refurbished model. The retailer refuses to replace it or provide a refund."
                  title="Case Details"
                  buttonText="Analyze Success Probability"
                />
              </div>
            </TabsContent>

            {/* Petition Generator Tab */}
            <TabsContent value="petition" className="p-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Legal Petition Generator</h2>
                <p className="text-gray-600 mb-4">Create a professionally formatted legal petition based on your case details.</p>
                <PetitionGenerator onGenerate={api.generatePetition} />
              </div>
            </TabsContent>

            {/* Legal Terms Tab */}
            <TabsContent value="terms" className="p-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Legal Term Explainer</h2>
                <p className="text-gray-600 mb-4">Get clear explanations of complex legal terminology in simple language.</p>
                <TextAnalyzer 
                  onAnalyze={api.explainLegalTerm}
                  placeholder="Enter a legal term to explain... (e.g., Habeas Corpus, Affidavit, Prima Facie)"
                  title="Legal Term"
                  buttonText="Explain Term"
                />
              </div>
            </TabsContent>

            {/* Gender Neutral Language Tab */}
            <TabsContent value="language" className="p-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Gender-Neutral Language Tool</h2>
                <p className="text-gray-600 mb-4">Convert gendered language to gender-neutral alternatives for legal documents.</p>
                <TextAnalyzer 
                  onAnalyze={api.suggestGenderNeutralLanguage}
                  placeholder="Enter text to convert to gender-neutral language... (e.g., 'The chairman will make his decision soon.')"
                  title="Text to Analyze"
                  buttonText="Suggest Gender-Neutral Alternatives"
                />
              </div>
            </TabsContent>

            {/* Find Lawyers Tab */}
            <TabsContent value="lawyers" className="p-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Find Legal Professionals</h2>
                <p className="text-gray-600 mb-4">Locate legal professionals near you who can help with your case.</p>
                <LocationFinder onFindLawyers={api.findNearbyLawyers} />
              </div>
            </TabsContent>
          </TabNavigation>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 border-t">
        <div className="container mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p>Legal Aid Genie Bot - An AI legal assistant for Indian law</p>
            <p className="mt-1">This tool provides general legal information, not legal advice. Always consult a qualified lawyer for specific legal matters.</p>
          </div>
        </div>
      </footer>
      
      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
      />
    </div>
  );
};

export default Index;
