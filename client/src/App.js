import React, { useState, useEffect } from "react";
import './App.css';
import contactsService from './services/contacts';
import InputContact from './components/InputContact/InputContact';
import ContactElement from './components/Contact/ContactElement';

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

  return (
    <div className="contacts-main-view">
      <InputContact getContacts={getContacts}/>
      <div className="list-item">
        {(contacts && contacts.length > 0) ? (
          contacts.map(contact => {
            return <ContactElement key={contact._id} getContacts={getContacts} contact={contact} />
          })
        ) : (
          <div className="no-contacts">
            <span className="no-contacts-msg">You have no contacts</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
