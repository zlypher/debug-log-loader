// import { getOptions } from "loader-utils";

function loader(source) {
  // const options = getOptions(this);
  // source = source.replace(/\[name\]/g, options.name);
  console.log("Will this be output?");
  console.log(source);

  return `export default ${JSON.stringify(source)}`;
}

module.exports = loader;
