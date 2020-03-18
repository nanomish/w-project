import React from "react";
import './Contact.css';
import contactsService from '../../services/contacts';


export default class ContactElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.contact.isFavorite,
      name: props.contact.name,
      phone: props.contact.phone,
    };

    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  async onFavoriteClick() {
    let res = await this.toggleFavorite();
    this.setState({isFavorite: res.isFavorite})
  }

  async toggleFavorite() {
    const {isFavorite} = this.state;
    const {contact} = this.props;

    return await contactsService.update(contact._id, {isFavorite: !isFavorite});
  }

  getFavoriteClassName(isFavorite) {

    let className = (isFavorite ? 'contact-favorite-set' : 'contact-favorite-unset')
    console.log('className: ', className);

    return className;
  }

  async deleteContact(contactId) {
    await contactsService.delete(contactId);
    await this.props.getContacts();
  };

  render() {
    const {name, phone, isFavorite} = this.state;
    const {contact} = this.props;

    return ( <div key={contact._id} className="contact-list-item contact">
      <div className={"contact-favorite pointed " + (this.getFavoriteClassName(isFavorite))}
           onClick={this.onFavoriteClick}>
      </div>
      <div className="contact-name">{name}</div>
      <div className="contact-phone">{phone}</div>
      <div className={"contact-delete pointed"} onClick={() => this.deleteContact(contact._id)}></div>
    </div>)
  }
}