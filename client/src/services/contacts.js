import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/contact`);
    console.log('getting contacts: ', res);
    return res.data || [];
  },

  add: async (data) => {
    let res = await axios.post(`/api/contact`, data);

    if (!res.error) {
      return res.data.contact;
    } else {
      return res
    }
  },

  delete: async (id) => {
    let res = await axios.delete(`/api/contact/${id}`);

    if (!res.error) {
      return res.data.contact;
    } else {
      return res
    }
  },

  update: async (id, data) => {
    let res = await axios.put(`/api/contact/${id}`, data);

    if (!res.error) {
      return res.data.contact;
    } else {
      return res
    }
  },
}