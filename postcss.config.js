module.exports = ({ file, options, env }) => {
  return {
    plugins: {
      'autoprefixer': env == 'production' ? {} : false,
    }
  };
}
