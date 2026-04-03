/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs', 'nodemailer']
  },
  images: { domains: ['i.ibb.co.com', 'i.postimg.cc'] }
};
module.exports = nextConfig;
