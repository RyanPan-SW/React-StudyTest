/*
 * @Author: Ryan.pan
 * @Date: 2020-12-22 16:21:22
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-12-22 16:49:55
 * 这是一个插件，
 */

let webpack = require('webpack')
let path = require('path')
let requireFromString = require('require-from-string')
let MFS = require('memory-fs')
let mfs = new MFS()

class SkeletomWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    let { webpackConfig } = this.options;
    compiler.hook.compilation.tap("SkeletonWebpackPlugin", compilation => {
      // 在渲染的时候监听html处理事件
      compilation.hook.htmlWebpackPluginBeforeHtmlProcessing.tapAsync("SkeletonWebpackPlugin", (htmlPluginData, callback) => {
        // 2. 这里要开启一次新的webpack编译，得到编辑结果
        let childrenCompiler = webpack(webpackConfig)
        // 指定webpack编译后用模块什么进行输出（将编辑写在内存中，默认是写在硬盘中的）
        childrenCompiler.outputFileSystem = mfs
        let outputPath = path.join(webpackConfig.output.path, webpackConfig.output.filename)
        childrenCompiler.run((err, stat)=>{
          let skeletonJS = mfs.readFileSync(outputPath,'utf8')  
          let svgHtml = requireFromString(skeletonJS).default

          htmlPluginData.html = htmlPluginData.html.replace('<div id="root"></div>', `<div id="root">${svgHtml}</div>`);
          callback(null, htmlPluginData)
        })
        
        // htmlPluginData.html = htmlPluginData.html.replace('<div id="root"></div>', `<div id="root">这是一个svg图片</div>`);
        // callback(null, htmlPluginData)
      });
    });
  }
}
