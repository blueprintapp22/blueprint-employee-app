import { Dropbox } from 'dropbox'
let reader = new FileReader()
const dbx = new Dropbox({
  accessToken: process.env.REACT_APP_DBX_TOKEN
})
export const SearchDropbox = async (searchQuery) => {
  dbx
    .filesSearchV2({
      query: searchQuery
    })
    .then((res) => console.log(res))
}
export const GetPreview = async (filePath) => {
  let preview = dbx
    .filesGetPreview({
      path: '/NIEUWENHUIS BROS INC.xlsx'
    })
    .then((res) => {
      let downloadUrl = URL.createObjectURL(res.result.fileBlob)
      console.log(res.result)
      window.open(downloadUrl)
    })
  return preview
}
