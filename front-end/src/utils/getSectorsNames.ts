const getSectorsNames = (sectors: Array<{Name: string}>) => {
  return sectors.map(sector => sector.Name)
}

export default getSectorsNames