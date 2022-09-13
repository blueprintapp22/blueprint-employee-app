import { Dropbox } from 'dropbox'

let reader = new FileReader()
const dbx = new Dropbox({
  accessToken: process.env.REACT_APP_DBX_TOKEN
})
export const SearchDropbox = async () => {
  dbx
    .filesSearchV2({
      query: 'brian doyle'
    })
    .then((res) => console.log(res))
}
export const GetPreview = async (filePath) => {
  dbx
    .filesGetPreview({
      path: '/NIEUWENHUIS BROS INC.xlsx'
    })
    .then((res) => {
      var downloadUrl = URL.createObjectURL(res.result.fileBlob)
      window.open(downloadUrl)
    })
}
