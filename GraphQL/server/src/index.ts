import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
    {id: "1", name: 'Pritam', age: 21, isStudent: true},
    {id: "2", name: 'Santam', age: 15, isStudent: true},
    {id: "3", name: 'Rupam', age: 15, isStudent: true},
]

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }
    type Mutation {
        createUser(name: String!, age: Int!, isStudent: Boolean): User 
    }

    type User {
        id: ID
        name: String
        age: Int
        isStudent: Boolean
    }
`;

type Args = {
    id: string,
    name: string,
    age: number,
    isStudent: boolean
}

const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        },
        getUserById: (parent: any, args: any) => {
            const id = args.id
            return users.find((user) => user.id == id)
        }
    },
    Mutation: {
        createUser: (parent: any, args: Args) => {
            const {name, age, isStudent} = args
            const newUser: Args = {
                id: (users.length + 1).toString(),
                name,
                age,
                isStudent
            }
            users.push(newUser);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server is running at : ${url}`);
