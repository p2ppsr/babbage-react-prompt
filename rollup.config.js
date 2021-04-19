import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'umd',
    name: 'BabbageReactPrompt'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        '@babel/preset-react'
      ]
    })
  ]
}
