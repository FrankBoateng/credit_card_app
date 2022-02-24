import React, { useState } from "react";
import Constants from "./utilities/Constants";
import CreditCardForm from "./components/CreditCardForm";
import CardUpdateForm from "./components/CardUpdateForm";
import { Header } from './components/Header';

export default function App() {
  const [cards, setCards] = useState([]);
  const [newCardForm, setNewCardForm] = useState(false);
  const [cardUpdated, setcardUpdated] = useState(null);


  function getCards() {
    const url = Constants.API_URL_GET_ALL_CARDS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(cardsFromServer => {
        setCards(cardsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteCard(cardId) {
    const url = `${Constants.API_URL_DELETE_CARD_BY_ID}/${cardId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onCardDeleted(cardId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div>
      <Header></Header>
      <div className="container">

        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(newCardForm === false && cardUpdated === null) && (
            <div>
             
              <div className="mt-5">
              <button onClick={() => setNewCardForm(true)} className="btn btn-secondary btn-lg w-100 ">Add new card</button>
                <button onClick={getCards} className="btn btn-dark btn-lg w-100 mt-4">Get all cards</button>
                
              </div>
            </div>
          )}

          {(cards.length > 0 && newCardForm === false && cardUpdated === null) && renderCardsTable()}

          {newCardForm && <CreditCardForm onCardAdded={onCardAdded} />}

          {cardUpdated !== null && <CardUpdateForm card={cardUpdated} onCardUpdated={onCardUpdated} />}
        </div>
      </div>
    </div>
 
    
  );

  function renderCardsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Card No. (PK)</th>
              <th scope="col">Cardholder Name</th>
              <th scope="col">Card Number</th>
              <th scope="col">Card Type</th>
              <th scope="col">Expire Date</th>
              <th scope="col">CVC Number</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
         
          {cards.map((card) => (
            <tr key={card.cardId}>
              <th scope="row">{card.cardId}</th>
              <td>{card.cardHolderName}</td>
              <td>{card.cardNumber}</td>
              <td>{card.cardType}</td>
              <td>{card.expireDate}</td>
              <td>{card.securityCode}</td>
              <td>

                  <button onClick={() => { if(window.confirm(`Are you sure you want to delete "${card.cardHolderName}"?`)) deleteCard(card.cardId) }} className="btn btn-secondary btn-lg">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <button onClick={() => setCards([])} className="btn btn-dark btn-lg w-100">Empty cards array</button>
      </div>
        
      
      
    );
    
  }

  function onCardAdded(cardAdded) {
    setNewCardForm(false);

    if (cardAdded === null) {
      return;
    }

    alert(`Card successfully created.`);

    getCards();
  }
 
  
  function onCardUpdated(updatedCard) {
    setcardUpdated(null);

    if (updatedCard === null) {
      return;
    }

    let cardsCopy = [...cards];

    const index = cardsCopy.findIndex((cardsCopies, currentIndex) => {
      if (cardsCopies.cardId === updatedCard.cardId) {
        return true;
      }
    });

    if (index !== -1) {
      cardsCopy[index] = updatedCard;
    }

    setCards(cardsCopy);

    alert(`Card successfully updated.`);
  }

  function onCardDeleted(deletedCardId) {
    let cardsCopy = [...cards];

    const index = cardsCopy.findIndex((cardsCopies, currentIndex) => {
      if (cardsCopies.cardId === deletedCardId) {
        return true;
      }
    });

    if (index !== -1) {
      cardsCopy.splice(index, 1);
    }

    setCards(cardsCopy);

    alert('Card successfully deleted.');
  }
}
