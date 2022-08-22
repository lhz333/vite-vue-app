// vite.config.ts
import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    css: {
      // 使用 scss 全局变量
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/styles/variables.scss";'
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(root, 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    base: env.VITE_PUBLIC_PATH, // 设置打包路径
    server: {
      port: 8080, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   [env.VITE_API_BASE_URL]: {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(new RegExp('^' + env.VITE_API_BASE_URL), '')
      //   }
      // }
    }
  }
}
