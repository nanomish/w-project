import React, { useState, useEffect } from "react";
import './App.css';
import contactsService from './services/contacts';

function App() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    if(!contacts) {
      getContacts();
    }
  });

  const getContacts = async () => {
    let res = await contactsService.getAll();
    console.log(res);
    setContacts(res);
  };

  const renderContact = contact => {
    return (
      <div key={contact._id} className="contact-list-item contact">
        <div className="contact-favorite">{contact.isFavorite ? 'F' : ' '}</div>
        <div className="contact-name">{contact.name}</div>
        <div className="contact-phone">{contact.phone}</div>
      </div>
    );
  };

  return (
    <div className="contacts-main-view">
      <div className="list-item">
        {(contacts && contacts.length > 0) ? (
          contacts.map(contact => renderContact(contact))
        ) : (
          <p>You have no contacts</p>
        )}
      </div>
    </div>
  );
}

export default App;
