module.exports = {
  stringLengthInBytes(string) {
    if (typeof string === 'string') {
      // byte size of string https://stackoverflow.com/a/23329386/586740
      let length = string.length
      for (let i = string.length - 1; i >= 0; i--) {
        const code = string.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) {
          length++
        } else if (code > 0x7ff && code <= 0xffff) {
          length += 2
        }
        if (code >= 0xdc00 && code <= 0xdfff) {
          i--
        }
      }
      return length
    }
    return `${string}`.length
  }
}
