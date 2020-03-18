import React from "react";
import './InputContact.css';
import contactsService from '../../services/contacts';


export default class InputContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      name: null,
      phone: null,
    };
  }

  async addContact(data) {
    let res = await contactsService.add(data);
    return res;
  }

  async onSubmit() {
    const {getContacts} = this.props;
    const {name, phone, isFavorite} = this.state;

    await this.addContact({name, phone, isFavorite});
    this.resetState();
    await getContacts();
  }

  getFavoriteClassName() {
    const {isFavorite} = this.state;

    return (isFavorite ? 'contact-favorite-set' : 'contact-favorite-unset');
  }

  resetState() {
    this.setState({
      isFavorite: false,
      name: null,
      phone: null,
    })
  }

  render() {
    const {isFavorite, name, phone} = this.state;

    return (<div className="input-contact">
      <div onClick={e => this.setState({isFavorite: !isFavorite})}
           className={"contact-favorite pointed " + this.getFavoriteClassName()}>

      </div>
      <input type="text" placeholder="name"
             onChange={e => this.setState({name: e.target.value})}
             className="contact-i"
      />
      <input type="text" placeholder="phone"
             className="contact-i"
             onChange={e => this.setState({phone: e.target.value})}
      />
      <input type="submit" disabled={!name || !phone}
             className="pointed"
             value="Submit"
             onClick={this.onSubmit.bind(this)}/>
    </div>)
  }
}