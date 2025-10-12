/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
  images: {
    domains: [
      "gratisongkir-storage.com",
      "www.static-src.com",
      "img.lazcdn.com",
      "down-id.img.susercontent.com",
      "blue.kumparan.com",
      "ackcmovpibecjfiqmirg.supabase.co", // ✅ tambahin ini bre
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
