import { startCase } from 'lodash'
import entities from '@/components/shared/importExportData/entities'
import { apolloClientSingleton } from '@/utils/singletons/apolloClient'
import Modal from '@/components/shared/modal'
import { TfiDownload, TfiUpload } from "react-icons/tfi";

type ImportExportProps = {
  type: 'import' | 'export'
  entity: 'employee'
}

const ImportExportButton = (props: ImportExportProps) => {
  const { type } = props
  const Icon = type === 'import' ? TfiUpload : TfiDownload
  const entityType = entities[props.entity]
  const client = apolloClientSingleton.getInstance()


  return <span className='flex flex-row items-center cursor-pointer' onClick={() => entityType[type] && entityType[type](client)}>

    <span className="ml-2 flex items-center justify-center gap-2"><Icon />{startCase(type)}</span>
  </span>
}

const ImportExport = (props: ImportExportProps) => {
  const { type } = props
  const Export = <ImportExportButton {...props} />
  const Import = <Modal trigger={Export} title="Import" content={<div>Import</div>} />

  return type === 'export' ? Export : Import
}

export default ImportExport