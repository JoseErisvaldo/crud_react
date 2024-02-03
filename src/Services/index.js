import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ummrcakwdaeufujhnvrv.supabase.co/rest/v1'
})

export default api
