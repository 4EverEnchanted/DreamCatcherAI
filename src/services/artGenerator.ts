import { HfInference } from '@huggingface/inference';

const token = process.env.HUGGING_FACE_TOKEN;
const hf = new HfInference(token);

export async function generateDreamArt(description: string): Promise<string> {
  try {
    // Create a more detailed prompt based on the description
    const prompt = `Psychedelic dream art, surreal and ethereal: ${description}. Vibrant colors, flowing forms, dreamlike quality, digital art style.`;
    
    // Generate image using Stable Diffusion
    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-2-1",
      inputs: prompt,
      parameters: {
        negative_prompt: "text, watermark, signature, blurry, low quality",
        num_inference_steps: 30,
        guidance_scale: 7.5,
      }
    });

    // Convert blob to base64
    const blob = await response.blob();
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error generating dream art:', error);
    // Fallback to placeholder images if API fails
    const fallbackImages = [
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
      'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg',
      'https://images.pexels.com/photos/3309754/pexels-photo-3309754.jpeg',
      'https://images.pexels.com/photos/3309758/pexels-photo-3309758.jpeg',
      'https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg',
    ];
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
}