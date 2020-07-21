const imageSizeRegex = /t_[0-9a-z_]+\//i

export default {
  methods: {
    getPlatformLogoSrc(platformSlug) {
      return require(`~/assets/img/logos/platforms/${platformSlug}.svg`)
    },
    getImageRendition(igdbImageUrl = '', rendition, retina) {
      if (rendition === 'original') {
        return igdbImageUrl.replace(imageSizeRegex, '')
      }
      const size = `t_${rendition}${retina ? '_2x' : ''}`
      if (imageSizeRegex.test(igdbImageUrl)) {
        return igdbImageUrl.replace(imageSizeRegex, `${size}/`)
      }
      const position = igdbImageUrl.lastIndexOf('/')
      return [
        igdbImageUrl.slice(0, position),
        `/${size}`,
        igdbImageUrl.slice(position)
      ].join('')
    },
    getRGBColorFromPalette(palette = {}, preferredVariant) {
      let variant = null
      if (preferredVariant && palette[preferredVariant]) {
        variant = palette[preferredVariant]
      } else {
        const {
          Muted,
          DarkMuted,
          LightMuted,
          DarkVibrant,
          Vibrant,
          LightVibrant
        } = palette
        variant =
          DarkMuted || Muted || LightMuted || DarkVibrant || Vibrant || LightVibrant
      }
      return variant ? variant._rgb.join(',') : '24,24,24'
    },
    getEntityImageRGBColor(entity = {}) {
      return this.getRGBColorFromPalette(
        (entity.mainImage && entity.mainImage.palette) || {}
      )
    }
  }
}
