/**
      {
        source: "/",
        permanent: true,
        destination: "/home"
      }
    ],
    experimental: {
      serverActions: true,
      esmExternals: "loose",
      instrumentationHook: true
    },
    output: "standalone"
  };
};

export default config;
