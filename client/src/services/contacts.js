import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/contact`);
    console.log('getting contacts: ', res);
    return res.data || [];
  }
}