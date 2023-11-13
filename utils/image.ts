/**
 * By default it uses the image in public folder with same path as current route
 * use value with '/' to overwrite this behavior
 * @param imageName
 * @param path
 * @returns
 */
export const computeImageSrc = (imageName: string, path: string) => {
  return () => {
    if (imageName.startsWith('/')) return imageName
    let currentPath = path == '/' ? '/splash/' : `${path}`
    return currentPath.endsWith('/')
      ? currentPath + imageName
      : currentPath + '/' + imageName
  }
}
