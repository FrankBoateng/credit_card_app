import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function CardUpdateForm(props) {
  

    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToUpdate = {
            cardId: props.post.cardId,
            cardHolderName: props.formData.cardName,
            cardNumber: props.formData.cardNumber,
            cardType: props.formData.cardType,
            expireDate: props.formData.expireDate,
            securityCode: props.formData.securityCode,
            postalCode: props.formData.postalCode
        };

        const url = Constants.API_URL_UPDATE_CARD;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onPostUpdated(postToUpdate);
    };

    return (
        <form className="w-100 px-5">
           

            <div className="mt-5">
                <label className="h3 form-label">Cardholder name</label>
                <input value={formData.cardName} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Card number</label>
                <input value={formData.cardNumber} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Card type</label>
                <input value={formData.cardType} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Expiring date</label>
                <input value={formData.expireDate} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">CVC number</label>
                <input value={formData.securityCode} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Postal code</label>
                <input value={formData.postalCode} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Update Card</button>
            <button onClick={() => props.onPostUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
