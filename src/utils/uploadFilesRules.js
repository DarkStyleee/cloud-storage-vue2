const kb = 1000;
const mb = Math.pow(kb, 2);
const gb = Math.pow(kb, 3);

export function convertSize(size) {
  if (+size < kb) {
    return `${+size} Б`;
  }

  if (+size < mb) {
    return `${(+size / kb).toFixed(2)} КБ`;
  }

  if (+size < gb) {
    return `${(+size / mb).toFixed(2)} МБ`;
  }

  return `${(+size / gb).toFixed(2)} ГБ`;
}

export function checkLimit(fileSize, limit) {
  if (+fileSize <= limit * mb) {
    return true;
  }

  return false;
}

export function checkFileType(fileName, blockTypes) {
  const parseName = fileName.split(".");
  const fType = parseName.pop();

  if (Array.isArray(blockTypes)) {
    for (let i = 0; i < blockTypes.length; i++) {
      const type = blockTypes[i];
      if (fType === type) {
        return {
          error: true,
          fileType: type,
        };
      }
    }
  }

  if (fType === blockTypes) {
    return {
      error: true,
      fileType: blockTypes,
    };
  }

  return {
    error: false,
  };
}
