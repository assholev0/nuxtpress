import markdownit from 'markdown-it';
import markdownAnchors from 'markdown-it-anchor';

export default function MDParser({ anchorsLevel = 1, parsers: { md = {} } = {} } = {}) {
  const config = {
    html: true,
    typographer: true,
    linkify: true
  };

  if (md.extend !== undefined) {
    md.extend(config);
  }

  const parser = markdownit(config);

  const plugins = [
    [
      markdownAnchors,
      {
        level: [anchorsLevel]
      }
    ]
  ].concat(md.plugins || []);

  plugins.forEach((plugin) => {
    if (Array.isArray(plugin)) { parser.use(...plugin); } else { parser.use(plugin); }
  });

  if (md.customize !== undefined) {
    md.customize(parser);
  }

  return parser;
}
