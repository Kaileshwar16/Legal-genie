
import apiClient from '@/lib/apiClient';

// API service that connects to the Flask backend
// If API isn't available, falls back to mock responses

interface RelatedCase {
  title: string;
  link: string;
  summary_and_advice: string;
}

export const api = {
  // Chat with legal assistant
  sendChatMessage: async (message: string): Promise<{
    main_response: string;
    related_cases: RelatedCase[];
  }> => {
    console.log("Sending chat message:", message);
    
    try {
      const response = await apiClient.post('/chat', {
        user_prompt: message
      });
      return response.data;
    } catch (error) {
      console.error('Error in chat API:', error);
      // Fallback to mock response if the API fails
      return {
        main_response: `This is a fallback response to your query: "${message}"\n\n# Legal Framework\n- Section 123 of Indian Penal Code applies here\n- Consumer Protection Act, 2019 may also be relevant\n\n## Case Law Analysis\n- Similar cases show precedent for consumer remedies\n- Courts typically award compensation in such scenarios\n\n## Practical Advice\n- File a formal complaint with the consumer forum\n- Gather all evidence of the transaction\n- Consider sending a legal notice before proceeding`,
        related_cases: [
          {
            title: "Consumer Protection Council vs Tech Retailers Ltd (2019)",
            link: "https://indiankanoon.org/doc/123456/",
            summary_and_advice: "# Case Summary\n## Key Facts\n- Retailer sold refurbished products as new\n- Multiple consumers affected across different regions\n\n## Legal Principles\n- Misleading advertising is punishable\n- Consumers entitled to compensation\n\n## Outcome & Implications\n- Company fined ₹50 lakhs and directed to replace products"
          }
        ]
      };
    }
  },

  // Upload and analyze PDF
  analyzePDF: async (file: File): Promise<{
    main_response: string;
    related_cases: RelatedCase[];
  }> => {
    console.log("Analyzing PDF:", file.name);
    
    // Mock response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          main_response: "# Document Analysis\n\n## Summary\nThis document appears to be a rental agreement between landlord and tenant.\n\n## Legal Context\nThe agreement falls under the Rent Control Act and Transfer of Property Act.\n\n## Implications\nBoth parties have clear obligations and rights defined in the contract.\n\n## Recommended Actions\n- Verify all terms before signing\n- Keep a signed copy safely\n- Note all payment dates\n\n## Guidance\nThis is a standard agreement but pay attention to the notice period and security deposit terms.",
          related_cases: []
        });
      }, 2000);
    });
  },

  // Analyze image for legal context
  analyzeImage: async (file: File): Promise<{
    main_response: string;
    related_cases: RelatedCase[];
  }> => {
    console.log("Analyzing image:", file.name);
    
    // Mock response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          main_response: "The image shows what appears to be a traffic violation. Based on the visible elements, this would fall under Section 184 of the Motor Vehicles Act, 1988, which deals with dangerous driving. The penalties for such violations include imprisonment up to one year and/or fine up to ₹5,000 for first offense. For repeat offenders, penalties can be higher.",
          related_cases: []
        });
      }, 2000);
    });
  },

  // Analyze case probability
  analyzeCaseProbability: async (details: string): Promise<{
    main_response: string;
  }> => {
    console.log("Analyzing case probability:", details);
    
    // Mock response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          main_response: '{\n  "success_probability": "65%",\n  "confidence_level": "Medium",\n  "key_factors": ["Documentary evidence available", "Clear legal violation", "Precedent in similar cases"],\n  "challenges": ["Potential delays in court proceedings", "Opposing party has significant resources"],\n  "recommendation": "Proceed with the case but prepare for a lengthy legal process. Consider alternative dispute resolution as a parallel approach."\n}'
        });
      }, 1500);
    });
  },

  // Generate petition template
  generatePetition: async (details: string): Promise<{
    main_response: string;
    docx_content: string;
  }> => {
    console.log("Generating petition for:", details);
    
    // Mock response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          main_response: "# Petition/Case Filing Template\n\n## General Instructions\nThis document provides a structured format for filing a consumer complaint against a retailer for product misrepresentation.\n\n## Petition Format\n\n### 1. Header\n**IN THE CONSUMER DISPUTES REDRESSAL COMMISSION**\n**[LOCATION]**\n\nConsumer Complaint No. ________ of 20XX\n\n**[Your Name]** ... Complainant\n\nVersus\n\n**[Company/Person Name]** ... Respondent\n\n### 2. Introduction\nI, [Your Full Name], resident of [Your Complete Address], hereby file this consumer complaint under Section 35 of the Consumer Protection Act, 2019.\n\n### 3. Statement of Facts\n1. On [Date], I purchased [Product] from the respondent for a sum of Rs. [Amount].\n2. The product was represented as [describe how it was advertised/represented].\n3. However, upon using the product, I discovered [describe the issue/defect].\n4. I contacted the respondent on [Date] via [medium of communication] and requested [remedy sought].\n5. The respondent [describe their response or lack thereof].\n\n### 4. Legal Grounds\n1. The actions of the respondent constitute an unfair trade practice under Section 2(47) of the Consumer Protection Act, 2019.\n2. The respondent has engaged in misleading advertisement as defined under Section 2(28) of the Act.\n3. As per Section 35(1) of the Act, I am entitled to seek compensation for the deficient service provided.\n\n### 5. Prayer for Relief\nIn view of the above facts and circumstances, I humbly pray that this Hon'ble Commission may be pleased to:\n\na) Direct the respondent to [specific remedy sought, e.g., refund, replacement, repair].\nb) Award compensation of Rs. [Amount] for the mental agony, harassment, and inconvenience caused.\nc) Direct the respondent to pay costs of this complaint.\nd) Pass any other order deemed fit in the interests of justice.\n\n### 6. Declaration\nI, [Your Name], hereby declare that the facts stated above are true to the best of my knowledge and belief.\n\nDate: [Date]\nPlace: [Place]\n\n[Your Signature]\n[Your Name]\nComplainant\n\n### 7. Annexures\nAnnexure 1: Copy of purchase invoice/receipt\nAnnexure 2: Product warranty card/documentation\nAnnexure 3: Communication with the respondent\nAnnexure 4: Photographs/evidence of defect\n\n## Success Factors\n- Similar cases have seen a 65% success rate in consumer forums\n- Documentary evidence will significantly strengthen your case\n- Clear violation of Consumer Protection Act provisions works in your favor\n\n## Potential Challenges\n- Be prepared for potential delays in proceedings\n- Opposing party may have greater resources for legal representation",
          docx_content: "bW9jayBkb2N4IGNvbnRlbnQgaW4gYmFzZTY0"
        });
      }, 2000);
    });
  },

  // Explain legal term
  explainLegalTerm: async (term: string): Promise<{
    main_response: string;
  }> => {
    console.log("Explaining legal term:", term);
    
    // Mock response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          main_response: `# Explanation of ${term}\n\n## Definition\nThis legal term refers to the principle that accused persons are considered innocent until proven guilty beyond reasonable doubt in a court of law.\n\n## Legal Context and Usage\nThis principle is fundamental to criminal proceedings in most democracies, placing the burden of proof on the prosecution. It's enshrined in Article 11 of the Universal Declaration of Human Rights.\n\n## Related Legal Terms\n- Beyond reasonable doubt\n- Burden of proof\n- Presumption of innocence\n\n## Practical Implications\nThis principle protects individuals from arbitrary conviction and ensures fair trials. It means the accused doesn't have to prove their innocence; rather, the state must prove their guilt conclusively.`
        });
      }, 1000);
    });
  },

  // Gender neutral language suggestions
  suggestGenderNeutralLanguage: async (text: string): Promise<{
    main_response: string;
  }> => {
    console.log("Suggesting gender-neutral language for:", text);
    
    try {
      const response = await apiClient.post('/gender-neutral-language-suggestions', {
        user_text: text
      });
      
      return response.data;
    } catch (error) {
      console.error('Error in gender-neutral language API:', error);
      // Fallback to mock response if the API fails
      return {
        main_response: "# Gender-Neutral Language Suggestions\n\n## Gendered Terms Detected\n\n1. **\"chairman\"** - Suggested replacement: \"chairperson\" or \"chair\"\n2. **\"policeman\"** - Suggested replacement: \"police officer\"\n3. **\"he/his\"** (when referring to an unspecified person) - Suggested replacement: \"they/their\"\n\n## Revised Text\n\n\"The chairperson called the meeting to order. They asked each police officer to submit their report by Friday.\""
      };
    }
  },

  // Find nearby lawyers
  findNearbyLawyers: async (latitude: number, longitude: number): Promise<any[]> => {
    console.log("Finding lawyers near:", latitude, longitude);
    
    try {
      const response = await apiClient.post('/nearby-lawyers', {
        latitude,
        longitude
      });
      
      return response.data.data || [];
    } catch (error) {
      console.error('Error finding nearby lawyers:', error);
      // Fallback to mock response if the API fails
      return [
        {
          name: "Singh & Associates",
          address: "123 Law Street, New Delhi",
          rating: 4.8,
          total_ratings: 156,
          place_id: "place123",
          location: { lat: latitude + 0.01, lng: longitude + 0.01 },
          open_now: true
        },
        {
          name: "Legal Experts LLP",
          address: "456 Justice Road, New Delhi",
          rating: 4.5,
          total_ratings: 89,
          place_id: "place456",
          location: { lat: latitude - 0.01, lng: longitude - 0.01 },
          open_now: false
        },
        {
          name: "Sharma Legal Consultants",
          address: "789 Court Avenue, New Delhi",
          rating: 4.2,
          total_ratings: 42,
          place_id: "place789",
          location: { lat: latitude + 0.02, lng: longitude - 0.02 },
          open_now: true
        }
      ];
    }
  }
};
