import fs from 'node:fs'
import path from 'node:path'
import esbuild from 'esbuild'
import { type Plugin, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      script: {
        fs: {
          fileExists: fs.existsSync,
          readFile: file => fs.readFileSync(file, 'utf-8')
        }
      }
    }),
    copyVuePlugin(),
    CustomBuildPlugin()
  ],
  define: {
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/main.ts',
        index: './index.html' // 添加 HTML 文件的输入路径
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})
function compileAndBundle () {
  return new Promise((resolve, reject) => {
    esbuild.build({
      entryPoints: ['src/plugin.js'], // 替换成你的主文件路径
      bundle: true,
      outfile: 'dist/src/plugin.js',
      format: 'esm', // 将ES模块转换为立即执行函数表达式（IIFE）
      plugins: [
        {
          name: 'resolve-three-alias',
          setup (build) {
            build.onResolve({ filter: /^three\/examples\/jsm\/controls\/OrbitControls$/ }, args => {
              return { path: path.resolve(__dirname, 'node_modules/three/examples/jsm/controls/OrbitControls.js') }
            })
          }
        }
      ]
    }).then(() => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

// 增强错误处理
compileAndBundle().catch(error => {
  console.error('编译和打包过程中出现错误:', error)
})
function CustomBuildPlugin (): Plugin {
  return {
    name: 'custom-build-plugin',
    apply: 'build',
    // 在构建完成后执行额外的编译任务
    async closeBundle () {
      console.log('Custom build task executed after Vite build completion')
      // 在这里添加你的额外编译任务逻辑
      await compileAndBundle()
    }
  }
}

function copyVuePlugin (): Plugin {
  return {
    name: 'copy-vue',
    generateBundle () {
      const copyFile = (file: string) => {
        const filePath = path.resolve(__dirname, file)
        const basename = path.basename(file)
        console.log(fs.existsSync(filePath), fs.accessSync(filePath))
        if (!fs.existsSync(filePath)) {
          throw new Error(
            `${basename} not built. ` +
              'Run "nr build vue -f esm-browser" first.'
          )
        }
        this.emitFile({
          type: 'asset',
          fileName: basename,
          source: fs.readFileSync(filePath, 'utf-8')
        })
      }

      copyFile('./source/vue/vue.esm-browser.js')
      copyFile('./source/vue/vue.esm-browser.prod.js')
      copyFile('./source/vue/vue.runtime.esm-browser.js')
      copyFile('./source/vue/vue.runtime.esm-browser.prod.js')
      copyFile('./source/vue/server-renderer.esm-browser.js')
    }
  }
}
