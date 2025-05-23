import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['4ce0-5-178-148-117.ngrok-free.app'],
  images: {
    domains: ['res.cloudinary.com']
  }
};

export default withNextIntl(nextConfig);