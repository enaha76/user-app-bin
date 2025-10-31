// OpenRouter API configuration
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-chat-v3.1:free';

export interface ImageAnalysisResult {
  urgency: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  wasteType: string;
  description?: string;
}

/**
 * Analyzes a waste bin image using DeepSeek via OpenRouter
 * @param imageBase64 Base64 encoded image string
 * @returns Analysis result with urgency, confidence, and waste type
 */
export async function analyzeWasteImage(imageBase64: string): Promise<ImageAnalysisResult> {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'EcoClean Waste Reporter',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an AI waste management analyst. Analyze this waste bin image and provide:
1. Urgency level: "low", "medium", "high", or "critical"
2. Confidence score: 0-100
3. Waste type description

Urgency guidelines:
- low: Bin is mostly empty, minimal waste
- medium: Bin is 30-60% full, moderate waste
- high: Bin is 60-90% full, significant accumulation
- critical: Bin is overflowing, immediate attention needed

Respond ONLY with valid JSON in this exact format:
{"urgency": "medium", "confidence": 85, "wasteType": "Mixed recyclables and general waste", "description": "Brief description"}`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64,
                },
              },
            ],
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response content from API');
    }

    // Parse the JSON response from the model
    const result = JSON.parse(content);

    // Validate the response
    if (!result.urgency || !result.confidence || !result.wasteType) {
      throw new Error('Invalid response format from AI model');
    }

    return {
      urgency: result.urgency,
      confidence: result.confidence,
      wasteType: result.wasteType,
      description: result.description,
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    // Return a fallback result if API fails
    return {
      urgency: 'medium',
      confidence: 0,
      wasteType: 'Unable to analyze - using default values',
      description: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
