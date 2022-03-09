import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

export type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer, // utilizado para poder salvar dados com relacionamento com uma única chamada a API
    },
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
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750; // adiciona delay para API

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)
        
        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });
      this.post('/users');

      this.get('/users/:id');

      this.namespace = ''; // usado para dar reset no namespace e fazer com que o next possa usar o 'api' as default
      this.passthrough(); // utilizado no next para que o mirage teste uma chamada e caso não for algo dele passe adiante, sendo puxado pela next api
    }
  })

  return server;
}