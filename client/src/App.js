import React, { useState, useEffect } from "react";
import './App.css';
import contactsService from './services/contacts';
import InputContact from './components/InputContact/InputContact';
import ContactElement from './components/Contact/ContactElement';

function App() {
  const [contacts, setContacts] = useState(null);
  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const PAGE_SIZE = 5;

  useEffect(() => {
    if(!contacts) {
      getContacts();
    }
    setCurrentPage(1);
  });

  const getContacts = async () => {
    let res = await contactsService.getAll();
    console.log(res);
    setContacts(res);
  };

  const onPrev = () => {

  }

  const onNext = () => {

  }

  return (
    <div className="contacts-main-view">
      <InputContact getContacts={getContacts}/>

      <div className="search-contacts">
        <input type="text" placeholder="search"
               onChange={e => setSearch(e.target.value)}
               className="search-contacts-i"
        />
      </div>
      <div className="list-item">
        {(contacts && contacts.length > 0) ? (
          contacts
            .filter(contact => {
              const searchRegexp = new RegExp(search, 'i');
              return search && (contact.name.match(searchRegexp) || contact.phone.match(searchRegexp)) || !search
            })
            .map(contact => {
              return <ContactElement key={contact._id} getContacts={getContacts} contact={contact} />
            })
        ) : (
          <div className="no-contacts">
            <span className="no-contacts-msg">You have no contacts</span>
          </div>
        )}
      </div>
      <div className="contacts-pagination">
        <input type="submit"
               className="pointed page-button"
               value="<<"
               onClick={() => onPrev()}/>
        <input type="submit"
               className="pointed page-button"
               value=">>"
               onClick={() => onNext()}/>
      </div>
    </div>
  );
}

export default App;
