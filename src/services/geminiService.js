// Gemini AI Service for Artomate
// This service handles all AI-powered content generation

// Configuration - Replace with your actual API keys
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const IMAGEN_API_KEY = 'YOUR_IMAGEN_API_KEY';

// Gemini API endpoints
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateContent';

/**
 * Generate comprehensive marketing content using Gemini AI
 */
export const generateContentWithAI = async (campaignData) => {
  try {
    const prompt = `You are Artomate, an AI-powered content creation suite for artists. 
    
Based on the following content information, generate a complete marketing package:

Content Type: ${campaignData.contentType}
Theme/Vibe: ${campaignData.theme}
Source File: ${campaignData.sourceFile?.name}

Please generate the following content in JSON format:

1. caption: An engaging Instagram caption that captures the essence of the content
2. captionB: An alternative A/B test caption with a different approach
3. hashtags: An array of exactly 5 relevant hashtags
4. email: An object containing:
   - subject: Compelling email subject line
   - body: Professional marketing email body (2-3 paragraphs)
   - ctaText: Call-to-action button text
5. imagePrompt: A detailed, artistic prompt for image generation (be specific about style, mood, colors)
6. videoScript: A scene-by-scene script for a 15-second vertical video (9:16 aspect ratio)

Make the content engaging, professional, and tailored to the content type and theme.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        responseSchema: {
          type: "object",
          properties: {
            caption: { type: "string" },
            captionB: { type: "string" },
            hashtags: { 
              type: "array", 
              items: { type: "string" },
              minItems: 5,
              maxItems: 5
            },
            email: {
              type: "object",
              properties: {
                subject: { type: "string" },
                body: { type: "string" },
                ctaText: { type: "string" }
              },
              required: ["subject", "body", "ctaText"]
            },
            imagePrompt: { type: "string" },
            videoScript: { type: "string" }
          },
          required: ["caption", "captionB", "hashtags", "email", "imagePrompt", "videoScript"]
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      try {
        const parsedContent = JSON.parse(content);
        return parsedContent;
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        throw new Error('Failed to parse AI-generated content');
      }
    } else {
      throw new Error('Invalid response from Gemini API');
    }

  } catch (error) {
    console.error('Error generating content with AI:', error);
    throw new Error(`Content generation failed: ${error.message}`);
  }
};

/**
 * Generate image using Imagen AI
 */
export const generateImageWithAI = async (imagePrompt) => {
  try {
    const response = await fetch(`${IMAGEN_API_URL}?key=${IMAGEN_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a high-quality, artistic image based on this prompt: ${imagePrompt}. 
            The image should be 1:1 aspect ratio, professional quality, and suitable for social media marketing.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Imagen API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      // In a real implementation, Imagen would return image data
      // For now, we'll simulate this with a placeholder
      return {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjI1NiIgeT0iMjU2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+Cjx0ZXh0IHg9IjI1NiIgeT0iMzEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HZW5lcmF0ZWQ8L3RleHQ+Cjwvc3ZnPgo=',
        prompt: imagePrompt
      };
    } else {
      throw new Error('Invalid response from Imagen API');
    }

  } catch (error) {
    console.error('Error generating image with AI:', error);
    throw new Error(`Image generation failed: ${error.message}`);
  }
};

/**
 * Generate video using client-side canvas and MediaRecorder
 */
export const generateVideoWithAI = async ({ image, script, audio }) => {
  try {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas to 9:16 aspect ratio (vertical video)
      canvas.width = 1080;
      canvas.height = 1920;
      
      const videoDuration = 15000; // 15 seconds
      const frameRate = 30;
      const totalFrames = (videoDuration / 1000) * frameRate;
      const frameTime = videoDuration / totalFrames;
      
      let currentFrame = 0;
      const frames = [];
      
      // Create image element for background
      const img = new Image();
      img.onload = () => {
        const generateFrame = () => {
          if (currentFrame >= totalFrames) {
            // All frames generated, create video
            createVideoFromFrames();
            return;
          }
          
          // Clear canvas
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw background image with Ken Burns effect
          const scale = 1 + (currentFrame / totalFrames) * 0.1;
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.scale(scale, scale);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          ctx.restore();
          
          // Add overlay text
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
          
          // Split script into scenes (simplified)
          const scenes = script.split('\n').filter(line => line.trim());
          const currentScene = Math.floor((currentFrame / totalFrames) * scenes.length);
          const sceneText = scenes[currentScene] || scenes[0] || 'Your content here';
          
          // Draw text
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 48px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Add text shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          
          // Wrap text if too long
          const maxWidth = canvas.width - 80;
          const words = sceneText.split(' ');
          let line = '';
          let yPos = canvas.height - 100;
          
          for (let word of words) {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && line !== '') {
              ctx.fillText(line, canvas.width / 2, yPos);
              line = word + ' ';
              yPos += 60;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, canvas.width / 2, yPos);
          
          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Capture frame
          canvas.toBlob((blob) => {
            frames.push(blob);
            currentFrame++;
            generateFrame();
          }, 'image/png');
        };
        
        generateFrame();
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load background image'));
      };
      
      img.src = image.url;
      
      const createVideoFromFrames = () => {
        try {
          // Create video from frames using MediaRecorder
          const stream = canvas.captureStream(frameRate);
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
          });
          
          const chunks = [];
          
          mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
          };
          
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            
            resolve({
              url: videoUrl,
              blob: blob,
              duration: videoDuration,
              format: 'webm'
            });
          };
          
          // Start recording
          mediaRecorder.start();
          
          // Play frames as video
          let frameIndex = 0;
          const playFrames = () => {
            if (frameIndex < frames.length) {
              // Draw frame to canvas
              const img = new Image();
              img.onload = () => {
                ctx.drawImage(img, 0, 0);
                frameIndex++;
                setTimeout(playFrames, frameTime);
              };
              img.src = URL.createObjectURL(frames[frameIndex]);
            } else {
              mediaRecorder.stop();
            }
          };
          
          playFrames();
          
        } catch (error) {
          reject(new Error(`Video creation failed: ${error.message}`));
        }
      };
    });
    
  } catch (error) {
    console.error('Error generating video:', error);
    throw new Error(`Video generation failed: ${error.message}`);
  }
};

// Mock implementation for development/testing
export const generateMockContent = async (campaignData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    caption: `🎵 Just dropped my latest ${campaignData.contentType} "${campaignData.theme}"! This one's been brewing in my soul for months. Hope it resonates with you all! 🎶`,
    captionB: `🔥 New ${campaignData.contentType} alert! "${campaignData.theme}" is finally here and it's everything I hoped it would be. Drop a ❤️ if you're feeling it!`,
    hashtags: ['#NewMusic', '#ArtistLife', '#CreativeFlow', '#MusicLover', '#IndieArtist'],
    email: {
      subject: `🎵 Your New ${campaignData.contentType} is Here: "${campaignData.theme}"`,
      body: `Hey there! 👋\n\nI'm so excited to share my latest ${campaignData.contentType} with you! "${campaignData.theme}" has been a labor of love, and I can't wait for you to hear it.\n\nThis track represents everything I've been feeling and creating lately. It's raw, it's real, and it's straight from the heart.\n\nI hope it speaks to you the way it speaks to me. Let me know what you think!`,
      ctaText: 'Listen Now'
    },
    imagePrompt: `A vibrant, artistic composition featuring musical elements, warm golden hour lighting, with a dreamy, ethereal atmosphere. The image should capture the essence of "${campaignData.theme}" with rich colors, dynamic composition, and professional photography quality. 1:1 aspect ratio, suitable for social media.`,
    videoScript: `Scene 1 (0-3s): Fade in from black to reveal the artist in a creative studio space\nScene 2 (3-6s): Close-up of hands creating music, with dynamic lighting\nScene 3 (6-9s): Wide shot of the artist performing, with atmospheric effects\nScene 4 (9-12s): Artistic montage of creative process and final result\nScene 5 (12-15s): Fade to brand logo and call-to-action`
  };
}; 