import { S3 } from '@aws-sdk/client-s3';

export const s3Client = new S3({
  endpoint: process.env.AWS_ENDPOINT as string,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY as string,
  },
  region: process.env.AWS_DEFAULT_REGION,
});
export default s3Client;
