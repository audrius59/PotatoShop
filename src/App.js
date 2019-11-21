import React, { useState } from 'react';
import { take } from 'lodash';

import ApiFactory from './mock';
import Editor from './Editor';

export default function App() {
  const [value, setValue ] = useState('');
  return (
    <div className="flexContainer">
      <div className="flexChild rowParent">
        <div className="flexChild columnParent" >
          <div className="buttonsPanel">
            <button onClick={ getIsAdmin }>Test `GET` /api/is-admin</button>
            <button onClick={ getAllProducts }>Test `GET` /api/products</button>
            <button onClick={ (_evt) => { getProduct(7) } }>
              Test `GET` /api/products/7 for product with id equal to 7
            </button>
            <button onClick={ (_evt) => { deleteProduct(1) } }>
              Test `DELETE` /api/products/1 for product with id equal to 1
            </button>
            <button onClick={ 
              (_evt) => { 
                updateProduct(2, {
                  "id": 2,
                  "name": "Foo bar",
                  "description": "Foo bar foo bar foo bar",
                  "price": 3.75,
                  "new": false
                });
              }}>
                Test `PUT` /api/products/2 for product with id equal to 2
              </button>
              <button onClick={ (_evt) => { 
                buyItems([{
                  "id": 2,
                  "name": "Foo bar",
                  "description": "Foo bar foo bar foo bar",
                  "price": 3.75,
                  "new": false
                }])
              } }>
                Test `POST` /api/buy for given items
              </button>
          </div>
          <div className="flexChild rowParent">
            <Editor value={value} />
          </div>
        </div>
      </div>
    </div>
  );

  function getIsAdmin() {
    ApiFactory.getInstance().get('/api/is-admin')
      .then(({ data }) => {
        setValue(beautify(data));
      })
      .catch((error) => {
        console.log(error.response);
      }).catch((error) => {
        // TODO: Display nice error message.
        console.log(error.response);
      });
  }

  function getAllProducts() {
    ApiFactory.getInstance().get('/api/products')
      .then(({ data }) => {
        setValue(beautify({ products: take(data, 3) }));
      })
      .catch((error) => {
        console.log(error.response);
      }).catch((error) => {
        // TODO: Display nice error message.
        console.log(error.response);
      });
  }

  function getProduct(id) {
    ApiFactory.getInstance().get(`/api/products/${id}`)
      .then(({ data }) => {
        setValue(beautify({ products: data }));
      })
      .catch((error) => {
        console.log(error.response);
      }).catch((error) => {
        // TODO: Display nice error message.
        console.log(error.response);
      });
  }

  function deleteProduct(id) {
    ApiFactory.getInstance().delete(`/api/products/${id}`).then(
      () => { getAllProducts() }
    ).catch((error) => {
      // TODO: Display nice error message.
      console.log(error.response);
    });
  }

  function updateProduct(id, data) {
    ApiFactory.getInstance().put(`/api/products/${id}`, data).then(
      () => { getAllProducts() }
    ).catch((error) => {
      // TODO: Display nice error message.
      console.log(error.response);
    });
  }

  function buyItems(items) {
    ApiFactory.getInstance().post('/api/buy', { itemsToBuy: items }).then(function() {
      alert('Bought Items. This is fake API that do nothing.');
    }).catch((error) => {
      // TODO: Display nice error message.
      console.log(error.response);
    });
  }

  function beautify(val) {
    return JSON.stringify(val, null, 2);
  }
}
