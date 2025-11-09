import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // 여기서 서버액션으로 허용할 최대 body 크기 설정
      // 문자열 포맷: '2mb', '10mb', '50mb' 등
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
