export function extractTypeInFile(filename) {
  const parseName = filename.split(".");
  return parseName.pop();
}
