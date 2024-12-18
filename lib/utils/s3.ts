import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getImageUrl(imageKey: string | null): Promise<string | null> {
  if (!imageKey) return null;
  
  // Option 1: Direct URL (only for public buckets)
  // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;
  
  // Option 2: Pre-signed URL (recommended for private buckets)
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageKey,
  });
  
  // URL will expire in 3600 seconds (1 hour)
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  console.log(signedUrl);
  return signedUrl;
} 