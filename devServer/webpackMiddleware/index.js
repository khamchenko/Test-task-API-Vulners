import webpack from 'webpack';
import createWebpackMiddleware from 'webpack-express-middleware';

import config from '../../webpack.config';

const compiler = webpack(config);

const webpackMiddleware = createWebpackMiddleware(compiler, config);

export default (app) => {
  webpackMiddleware(app);
};
