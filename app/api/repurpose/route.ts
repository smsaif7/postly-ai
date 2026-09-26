import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const prompt = `
    Act as a professional social media manager and content creator. 
    Take the following content and repurpose it into three distinct formats:
    1. A Twitter/X thread (3-5 short engaging tweets).
    2. A professional LinkedIn post with relevant hashtags.
    3. A catchy, engaging Facebook caption with emojis.

    Return the response strictly in valid JSON format with keys: twitter, linkedin, facebook.
    
    Content to repurpose:
    ${text}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const rawResponseText = response.text || '';
    const cleanedJson = rawResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedContent = JSON.parse(cleanedJson);

    return NextResponse.json({ success: true, data: parsedContent });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate AI content' }, { status: 500 });
  }
}