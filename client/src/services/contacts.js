import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/contact`);
    return res.data || [];
  }
}