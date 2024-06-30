import { startCase } from 'lodash'
import { FileUp, FileDown } from 'lucide-react'
import entities from '@/components/shared/importExportData/entities'

type ImportExportProps = {
  type: 'import' | 'export'
  entity: 'employee'
}

const ImportExport = async (props: ImportExportProps) => {
  const { type } = props
  const Icon = type === 'import' ? FileUp : FileDown
  const entity = entities[props.entity]

  return (
    < span className='flex-row cursor-pointer' >
      <span>{startCase(type)}</span>
      <Icon className="ml-2 h-4 w-4 inline" />
    </ span>
  )
}

export default ImportExport