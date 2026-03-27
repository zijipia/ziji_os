import { GoogleGenAI, Type } from "@google/genai";
import { fetchRepos, getSpecs, Project, Spec } from "./dataService";

export interface SearchResult {
  type: 'PROJECT' | 'SPEC';
  id: string;
  title: string;
  relevanceReason: string;
  data: Project | Spec;
}

export const performAISearch = async (query: string): Promise<SearchResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const projects = await fetchRepos();
  const specs = getSpecs();

  const searchableData = [
    ...projects.map(p => ({ id: p.id, type: 'PROJECT', title: p.title, description: p.description, tags: p.tags })),
    ...specs.map((s, i) => ({ id: `spec-${i}`, type: 'SPEC', title: s.category, description: s.description, items: s.items }))
  ];

  const prompt = `
    You are the ZIJI_OS Search Engine. 
    User Query: "${query}"
    
    Data to search:
    ${JSON.stringify(searchableData, null, 2)}
    
    Instructions:
    1. Analyze the user query and find the most relevant items from the data.
    2. Return a list of up to 5 relevant items.
    3. For each item, provide a brief "relevanceReason" explaining why it matches the query.
    4. If no items are relevant, return an empty array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING },
              relevanceReason: { type: Type.STRING }
            },
            required: ["id", "type", "relevanceReason"]
          }
        }
      }
    });

    const aiResults = JSON.parse(response.text);
    
    return aiResults.map((res: any) => {
      if (res.type === 'PROJECT') {
        const project = projects.find(p => p.id === res.id);
        if (project) {
          return {
            type: 'PROJECT',
            id: project.id,
            title: project.title,
            relevanceReason: res.relevanceReason,
            data: project
          };
        }
      } else {
        const index = parseInt(res.id.split('-')[1]);
        const spec = specs[index];
        if (spec) {
          return {
            type: 'SPEC',
            id: res.id,
            title: spec.category,
            relevanceReason: res.relevanceReason,
            data: spec
          };
        }
      }
      return null;
    }).filter(Boolean);

  } catch (error) {
    console.error('AI Search Error:', error);
    return [];
  }
};
