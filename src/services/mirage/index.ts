import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

export type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) { 
          return `user ${i}`
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        }
      })
    },

    seeds(server) {
      server.createList('user', 20);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750; // adiciona delay para API

      this.get('/users');
      this.post('/users');

      this.namespace = ''; // usado para dar reset no namespace e fazer com que o next possa usar o 'api' as default
      this.passthrough(); // utilizado no next para que o mirage teste uma chamada e caso não for algo dele passe adiante, sendo puxado pela next api
    }
  })

  return server;
}