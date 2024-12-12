const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Extend the default config
const { resolver: { sourceExts, assetExts } } = config;

// Add CSS file extensions
config.resolver.sourceExts = [...sourceExts, "css", "scss", "sass"];

// Configure transformer for CSS
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("metro-react-native-babel-transformer"),
  
  // 添加缓存配置
  enableBabelRCLookup: false,
  enableBabelRuntime: false,
};

// 添加缓存设置
config.cacheStores = [
  {
    name: "metro",
    type: "fs",
    root: `${__dirname}/node_modules/.cache/metro`,
  },
];

module.exports = config;