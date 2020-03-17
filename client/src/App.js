import React, { useState, useEffect } from "react";

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
      <li key={contact._id} className="list__item contact">
        <span>{contact.isFavorite ? 'F' : '&nbsp;'}</span>
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">{contact.phone}</p>
      </li>
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
