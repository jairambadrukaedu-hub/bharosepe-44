import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [react()];
  
  // Skip componentTagger for now to fix server exit issue
  // TODO: Re-enable when stable
  // if (mode === 'development') {
  //   try {
  //     const { componentTagger } = await import("lovable-tagger");
  //     plugins.push(componentTagger());
  //   } catch (e) {
  //     console.warn('lovable-tagger not available, skipping...');
  //   }
  // }

  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: false,
      open: false,
      middlewareMode: false,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            charts: ['recharts'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          },
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext || '')) {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
    },
  };
});
