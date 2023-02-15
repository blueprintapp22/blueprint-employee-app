import { Dropbox } from 'dropbox'
// import { QuickBooks } from 'node-quickbooks'
let reader = new FileReader()
const dbx = new Dropbox({
  accessToken: process.env.REACT_APP_DBX_TOKEN
})
export const SearchDropbox = (searchQuery) => {
  const value = dbx
    .filesSearchV2({
      query: searchQuery
    })
    .then((res) => {
      return res
    })
  return value
}

export const GetPreview = (filePath) => {
  dbx
    .filesGetPreview({
      path: filePath
    })
    .then((res) => {
      let downloadUrl = URL.createObjectURL(res.result.fileBlob)
      reader.readAsDataURL(res.result.blob)
      console.log(reader.result)
      window.open(downloadUrl)
    })
}
export const GetThumbnail = () => {
  dbx
    .filesGetThumbnail({
      path: '/NIEUWENHUIS BROS INC.xlsx'
    })
    .then((res) => {
      let downloadUrl = URL.createObjectURL(res.result.fileBlob)
      console.log(downloadUrl)
    })
}
