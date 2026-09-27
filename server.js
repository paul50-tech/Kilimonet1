import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable gzip compression and json parser for API payloads
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Crop diagnosis endpoint using Google Gemini API
app.post('/api/diagnose', async (req, res) => {
  try {
    const { cropType = '', symptoms = '', imageBase64 = '', mimeType = 'image/jpeg', location = 'Kenya' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'No GEMINI_API_KEY provided; utilizing Kilimonet Kenyan Agronomic Knowledge Engine.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `You are the chief agronomic plant pathologist and pest diagnostician at Kilimonet Integrated Agrisystems in Kenya.
Analyze the following crop distress report:
- Crop Type: ${cropType || 'Unspecified (determine from image/symptoms)'}
- Observed Symptoms: ${symptoms || 'Visual examination only'}
- Location: ${location || 'Kenya, East Africa'}

Analyze for common East African agricultural pests and diseases (e.g. Fall Armyworm, Tuta Absoluta, Late Blight, Bacterial Wilt, PCN, Diamondback Moth, Bean Rust, Powdery Mildew, Anthracnose, False Codling Moth, nutrient deficiencies).

Respond ONLY with valid, raw JSON (no markdown formatting, no backticks, no wrapping text) conforming to this exact structure:
{
  "diagnosis": "Condition Name with Pathogen/Pest (e.g. Fall Armyworm (Spodoptera frugiperda))",
  "commonName": "Common english name",
  "localSwahiliName": "Common Kiswahili name if applicable (e.g. Viwavi Jeshi Vamizi)",
  "scientificName": "Scientific species or pathogen name",
  "severity": "Low" | "Moderate" | "High" | "Critical",
  "confidence": 94,
  "symptomAnalysis": [
    "Explanation of why the visual/reported symptoms confirm this condition"
  ],
  "activeChemicals": [
    {
      "ingredient": "Active chemical ingredient (e.g. Emamectin Benzoate 5% SG)",
      "commercialProducts": ["Product Name 1", "Product Name 2"],
      "dosage": "Recommended dilution (e.g. 10g per 20L knapsack sprayer)"
    }
  ],
  "organicAlternatives": [
    "Biological or organic alternative (e.g. Bacillus thuringiensis (Bt), Neem oil)"
  ],
  "withholdingPeriod": {
    "days": 7,
    "description": "Safety advice on Pre-Harvest Interval (PHI) for consumer safety and export compliance",
    "reEntryHours": 24
  },
  "culturalPractices": [
    "Farm hygiene, sanitation, or agronomic practice to stop recurrence"
  ],
  "products": [
    "Commercial product names registered and available in Kenya for agrovet search"
  ],
  "disclaimer": "Diagnostic recommendation based on visual signs and reported symptoms. Always read pesticide manufacturer label before field mixing."
}`;

    const parts = [];
    if (imageBase64) {
      // Strip any data:image/...;base64, prefix if present
      const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64
        }
      });
    }
    parts.push({ text: promptText });

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json'
        }
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json'
        }
      });
    }

    const responseText = response.text?.trim() || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      // If output had unexpected wrapping, extract the JSON object
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse Gemini JSON response');
      }
    }

    return res.json({
      success: true,
      source: 'gemini-ai',
      ...parsedResult
    });
  } catch (error) {
    console.error('Gemini diagnosis error:', error?.message || error);
    return res.status(200).json({
      success: false,
      fallback: true,
      error: error?.message || 'Gemini analysis failed'
    });
  }
});

// Serve static files with caching and html extension support
app.use(express.static(__dirname, {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    // Service Worker and Logo assets must always be revalidated immediately
    if (filePath.endsWith('sw.js') || filePath.includes('logo') || filePath.includes('icon')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      if (filePath.endsWith('sw.js')) {
        res.setHeader('Service-Worker-Allowed', '/');
      }
    }
    // Cache HTML
    else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
    // Cache other static assets
    else if (filePath.match(/\.(css|js|webp|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Explicit clean route handlers for top-level pages
const pages = ['services', 'technology', 'about', 'contact', 'partnerships', 'smart-assist', 'intake', 'labour'];
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// Fallback to index.html for single-page applications or routing
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
