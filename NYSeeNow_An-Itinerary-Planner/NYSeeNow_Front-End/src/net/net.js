import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { toast } from 'react-toastify'

const defaultError = () => toast.error('Error!')
const defaultFailure = (message) => toast.warning(message)

function post(url, data, success, failure = defaultFailure, error = defaultError) {
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    .then(({ data }) => {
      if (data.success) success(data.message, data.status)
      else failure(data.message, data.status)
    })
    .catch(console.log(error))
}

function post_itinerary(url, data, success) {
  let response_obj
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Success!')
      console.log(response)
      return response.data
    })
    .catch((error) => {
      console.log('You have an error!')
      console.log(error)
    })
}

function get(url, success, failure = defaultFailure, error = defaultError) {
  axios
    .get(url, {
      withCredentials: true
    })
    .then(({ data }) => {
      if (data.success) success(data.message, data.status)
      else failure(data.message, data.status)
    })
    .catch(error)
}

export { get, post, post_itinerary }
