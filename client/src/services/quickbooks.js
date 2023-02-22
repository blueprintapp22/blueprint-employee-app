import axios from 'axios'
import { BASE_URL } from './api'

export const refreshToken = async () => {
  axios.get(`${BASE_URL}/bea/quickbooks/refresh`)
}

const getData = async (id) => {
  let res = await axios.get(`${BASE_URL}/bea/quickbooks/invoice/${id}`)
  return res.data
}

export const checkQuickbooksInvoice = async (invoiceNumber) => {
  let reg = /[a-zA-Z]+/g
  try {
    if (!reg.test(invoiceNumber)) {
      let res = await axios.get(
        `${BASE_URL}/bea/quickbooks/business/${invoiceNumber}`
      )
      if (res.data) {
        let invoiceData = await axios.get(
          `${BASE_URL}/bea/quickbooks/invoice/${res.data}`
        )
        return invoiceData.data
      } else {
        return 'No data found'
      }
      // if (res === 'No invoice found') {
      //   return res
      // } else {
      //   let invoiceData = await axios.get(
      //     `${BASE_URL}/bea/quickbooks/invoice/${res}`
      //   )
      //   return invoiceData
      // }
    }
  } catch (error) {
    throw error
  }
}
