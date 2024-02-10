interface Config {
  API_URL: string;
}

const config: Config = {
  API_URL: String(process.env.NEXT_PUBLIC_API_URL),
};

export default config;
