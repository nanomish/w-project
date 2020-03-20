import React, { useState, useEffect } from "react";
import './App.css';
import contactsService from './services/contacts';
import InputContact from './components/InputContact/InputContact';
import ContactElement from './components/Contact/ContactElement';

function App() {
  const [contacts, setContacts] = useState(null);
  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(null);

  const PAGE_SIZE = 4;

  useEffect(() => {
    if(!contacts) {
      getContacts();
    }
    if (typeof currentPage !== 'number') {
      setCurrentPage(1);
    }
    if (isOnlyFavorite !== true && isOnlyFavorite !== false) {
      setIsOnlyFavorite(false)
    }
  });

  const getContacts = async () => {
    let res = await contactsService.getAll();
    setContacts(res);
  };

  const getFilteredContacts = () => {
    let filtered = contacts
      .filter(contact => {
        if (isOnlyFavorite) {
          return contact.isFavorite
        } else {
          return true;
        }
      })
      .filter(contact => {
        const searchRegexp = new RegExp(search, 'i');
        if (search) {
          return (contact.name.match(searchRegexp) || contact.phone.match(searchRegexp))
        } else {
          return true;
        }
      });

    return filtered;
  };

  const onPrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const onNext = () => {
    const _filteredContacts = getFilteredContacts();
    const maxPageNum = Math.ceil(_filteredContacts.length / PAGE_SIZE);
    setCurrentPage(Math.min(currentPage + 1, maxPageNum));
  };

  const onlyFavoritesChanged = () => {
    setIsOnlyFavorite(!isOnlyFavorite);
    setCurrentPage(1);
  };

  const searchFieldChanged = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const onAfterEditContact = async () => {
    const _search = search;
    setSearch('__RESET_SEARCH__')
    await getContacts()
    setSearch(_search)
  }

  return (
    <div className="contacts-main-view">
      <InputContact onAfterSubmit={getContacts}/>

      <div className="search-contacts">
        <div>
          Only Favorite <input type="checkbox" onChange={onlyFavoritesChanged} />
        </div>
        <input type="text" placeholder="search by name or phone"
               onChange={searchFieldChanged}
               className="search-contacts-i"
        />
      </div>
      <div className="list-item" style={{height: (2 * PAGE_SIZE) + 'em'}}>
        {(contacts && contacts.length > 0) ? (
          getFilteredContacts()
            .slice(currentPage === 1 ? 0 : ((currentPage - 1) * PAGE_SIZE), currentPage * PAGE_SIZE)
            .map(contact => {
              return <ContactElement key={contact._id}
                                     onAfterSubmit={onAfterEditContact}
                                     contact={contact} />
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
        <div className="page-num">Page {currentPage}</div>
        <input type="submit"
               className="pointed page-button"
               value=">>"
               onClick={() => onNext()}/>
      </div>
    </div>
);
}

export default App;
