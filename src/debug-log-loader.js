const fs = require("fs");
const path = require("path");
const micromatch = require("micromatch");
const { getOptions } = require("loader-utils");
const validateOptions = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    include: {
      type: "string",
    },
    exclude: {
      type: "string",
    },
    name: {
      type: "string",
    },
    output: {
      type: "string",
    },
  },
};

const defaultOptions = {
  name: "[name].debug[ext]",
  output: "debug",
};

function debugEnabled(filePath, include, exclude) {
  if (!include && !exclude) {
    return true;
  }

  if (!!exclude && micromatch.contains(filePath, exclude)) {
    return false;
  }

  if (!!include && !micromatch.contains(filePath, include)) {
    return false;
  }

  return true;
}

// https://webpack.js.org/contribute/writing-a-loader/
function loader(source) {
  // #1 Validate that options are correct
  const options = { ...defaultOptions, ...getOptions(this) };
  validateOptions(schema, options, { name: "Debug Log Loader" });

  // #2 Get current filename
  const { resourcePath } = this;

  // #3 Match agains include/exclude options
  if (!debugEnabled(resourcePath, options.include, options.exclude)) {
    // #3a Excluded? Return early
    return `export default ${JSON.stringify(source)}`;
  }

  // #4 Construct output file name
  const { name, ext } = path.parse(resourcePath);
  const outputFilename = options.name
    .replace("[name]", name)
    .replace("[ext]", ext);
  const outputFile = path.resolve(options.output, outputFilename);

  // #5 Write debug output to file
  fs.mkdirSync(options.output, { recursive: true });
  fs.writeFileSync(outputFile, source);

  return `export default ${JSON.stringify(source)}`;
}

module.exports = loader;
