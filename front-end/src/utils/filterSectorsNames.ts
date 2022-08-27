const filterSectorsNames = (sectors: Array<{Name: string}>) => {
  return sectors.map(sector => sector.Name)
}

export default filterSectorsNames