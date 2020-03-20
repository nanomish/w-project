import React from "react";
import './Contact.css';
import contactsService from '../../services/contacts';
import InputContact from '../InputContact/InputContact';

export default class ContactElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.contact.isFavorite,
      name: props.contact.name,
      phone: props.contact.phone,
      contactIdForEdit: null,
    };

    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  async onFavoriteClick() {
    await this.toggleFavorite();
  }

  async toggleFavorite() {
    const {isFavorite} = this.state;
    const {contact} = this.props;

    let res = await contactsService.update(contact._id, {isFavorite: !isFavorite});
    this.setState({isFavorite: !isFavorite});

    return res;
  }

  getFavoriteClassName(isFavorite) {

    let _className = (isFavorite ? 'contact-favorite-set' : 'contact-favorite-unset')

    return _className;
  }

  async deleteContact() {
    const {onAfterSubmit} = this.props;
    await contactsService.delete(this.props.contact._id);
    await onAfterSubmit();
  };

  editContact(contact) {

    this.setState({contactIdForEdit: contact._id}, () => {
    });
  }

  async onFinishEditing() {
    const {onAfterSubmit} = this.props;
    this.setState({contactIdForEdit: false});
    await onAfterSubmit();
  }

  render() {
    const {name, phone, isFavorite, contactIdForEdit} = this.state;
    const {contact} = this.props;

    return (
      (contact && contact._id && contactIdForEdit) ?
        <InputContact contact={contact} onAfterSubmit={this.onFinishEditing.bind(this)}/>
        :
        <div key={contact._id} className="contact-list-item contact">
          <div className={"contact-favorite pointed " + this.getFavoriteClassName(isFavorite)}
               onClick={this.onFavoriteClick}>
          </div>
          <div className="contact-name">{name}</div>
          <div className="contact-phone">{phone}</div>
          <div className={"contact-edit pointed"} onClick={this.editContact.bind(this, contact)}></div>
          <div className={"contact-delete pointed"} onClick={this.deleteContact.bind(this, contact)}></div>
        </div>
    )
  }
}