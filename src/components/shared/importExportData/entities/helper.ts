export const addCsvRow = (row: Record<string, any>, csvContent:string)=>{
  if (csvContent === '') csvContent += Object.keys(row).join(',') + '\n'

  const rowValues = Object.values(row)
  const rowString = rowValues.join(',')
  csvContent += rowString + '\n'
  return csvContent
}

export const addCsvRows = (rows: Record<string, any>[], csvContent:string)=>{
  for (const row of rows) {
    csvContent = addCsvRow(row, csvContent)
  }
  return csvContent
}

export const downloadCsv = (csvContent:string, fileName:string) => {
  const element = document.createElement('a')
  const file = new Blob([csvContent], {type: 'text/csv'})
  element.href = URL.createObjectURL(file)
  element.download = fileName
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const convertToCsv = (data: Record<string, any>[], fileName:string) => {
  let csv = ''
  csv = addCsvRows(data, csv)
  downloadCsv(csv, fileName)
}


