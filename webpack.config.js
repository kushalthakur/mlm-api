const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
let nodeModules = {}

fs.readdirSync('node_modules')
   .filter((c) => {
      return ['.bin'].indexOf(c) === -1
   }).forEach((mod) => {
      nodeModules[mod] = 'commonjs ' + mod
   })

const { NODE_ENV = 'production' } = process.env
module.exports = {
   entry: { server: "./server/server.ts" },
   module: {
      rules: [
         {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/
         }
      ]
   },
   output: {
      path: path.join(__dirname, 'build'),
      filename: "[name].js"
   },
   resolve: {
      extensions: ['.ts', '.js']
   },
   mode: NODE_ENV,
   watch: NODE_ENV === 'development',
   target: 'node',
   externals: nodeModules,
   plugins: [
      new webpack.DefinePlugin({
         'process.env.server': JSON.stringify(process.env.server || '')
      })
   ]
}