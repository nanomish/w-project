import React from "react";
import './InputContact.css';
import contactsService from '../../services/contacts';


export default class InputContact extends React.Component {
  constructor(props) {
    super(props);
    if (props.contact) {
      this.state = {
        isFavorite: props.contact.isFavorite,
        name: props.contact.name,
        phone: props.contact.phone,
        isEdit: true,
      };
    }
    else {
      this.state = {
        isFavorite: false,
        name: '',
        phone: '',
        isEdit: false,
      };
    }
  }

  async addContact(data) {
    let res = await contactsService.add(data);
    return res;
  }

  async editContact(id, data) {
    const {onAfterSubmit} = this.props;
    let res = await contactsService.update(id, data);
    try {
      onAfterSubmit();
    } catch (e) {

    }
    return res;
  }

  async onSubmit() {
    const {onAfterSubmit, contact} = this.props;
    const {name, phone, isFavorite} = this.state;

    const data = {name, phone, isFavorite};
    const id = contact && contact._id;
    if (id) {
      await this.editContact(id, data);

    } else {
      await this.addContact(data);
      this.resetState();
    }

    try {
      await onAfterSubmit();
    } catch (e) {

    }

  }

  getFavoriteClassName() {
    const {isFavorite} = this.state;

    return (isFavorite ? 'contact-favorite-set' : 'contact-favorite-unset');
  }

  resetState() {
    this.setState({
      isFavorite: false,
      name: '',
      phone: '',
    })
  }

  render() {
    const {isFavorite, name, phone, isEdit} = this.state;

    return (<div className={isEdit ? "edit-contact-component" : "input-contact"}>
      <div onClick={() => this.setState({isFavorite: !isFavorite})}
           className={"contact-favorite pointed " + this.getFavoriteClassName()}>

      </div>
      <input type="text" placeholder="name"
             onChange={e => this.setState({name: e.target.value})}
             value={name}
             className="contact-i"
      />
      <input type="text" placeholder="phone"
             className="contact-i"
             value={phone}
             onChange={e => this.setState({phone: e.target.value})}
      />
      <input type="submit" disabled={!name || !phone}
             className="pointed"
             value="Submit"
             onClick={this.onSubmit.bind(this)}/>
    </div>)
  }
}