import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    food: Model
  },

  seeds(server) {
    server.db.loadData({
      foods: [
        {
          id: 1,
          name: "Ao molho",
          description: "Macarrão ao molho branco, fughi e cheiro verde das montanhas",
          price: "19.90",
          available: true,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png"
        },
        {
          id: 2,
          name: "Veggie",
          description: "Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.",
          price: "21.90",
          available: true,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png"
        },
        {
          id: 3,
          name: "A la Camarón",
          description: "Macarrão com vegetais de primeira linha e camarão dos 7 mares.",
          price: "25.90",
          available: false,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food3.png"
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/foods', () => {
      return this.schema.all('food');
    });

    this.post('/foods', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('food', data);
    });

    this.del('/foods/:id');

    this.patch('/foods/:id');

    this.put("/foods/:id", async function (schema, request) {
      let id = request.params.id;
      const data = JSON.parse(request.requestBody);
      
      return schema.find('food', id)?.update({data})
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
