const expressGraphQL = require('express-graphql');
const graphql = require('graphql');
const axios = require('axios');
const { getAuthor, addAuthor, deleteAuthor, updateAuthor, getBook, addBook, deleteBook, updateBook, addGenre, deleteGenre, updateGenre, getGenre } = require('../helper/helper');


const parentUrl = 'http://localhost:3000/'

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
} = require('graphql');


const BookType = new GraphQLObjectType({
    name: "BookType",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //Resolve the Author
                return axios.get(parentUrl + `authors/${parent.authorid}`).then(res => res.data);
            }
        },
        genre: {
            type: GenreType,
            resolve(parent, args) {
                //Resolve the genre
                return axios.get(parentUrl + `genre/${parent.genreid}`).then(res => res.data);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        country: { type: GraphQLString }
    })
});

const GenreType = new GraphQLObjectType({
    name: "GenreType",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorid: { type: new GraphQLNonNull(GraphQLInt) },
                genreid: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, { name, authorid, genreid }) {
                return addBook({ name, authorid, genreid });
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, { id }) {
                return deleteBook(id);
            }
        },
        updateBook:{
            type:BookType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                authorid:{type:new GraphQLNonNull(GraphQLInt)},
                genreid:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return updateBook(args);
            }
        },
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                authorid:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return addAuthor(args);
            }
        },
        deleteAuthor:{
            type:AuthorType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return deleteAuthor(args);
            }
        },
        updateAuthor:{
            type:AuthorType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                country:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return updateAuthor(args);
            }
        },
        addGenre:{
            type:GenreType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return addGenre(args);
            }
        },
        deleteGenre:{
            type:GenreType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)}
            }, 
            resolve(parent, args){
                return deleteGenre(id);
            }
        },
        updateGenre:{
            type:GenreType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)},
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return updateGenre(args);
            }
        }
    }
})


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args, request) {
                console.log(request);
                // return axios.get(parentUrl+`books/${args.id}`).then(res=>res.data);
                return getBook(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return axios.get(parentUrl + 'books/').then(res => res.data);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args, request) {
                console.log(request);
                return axios.get(parent + `authors/${args.id}`).then(res => res.data);
            }
        },
        genre: {
            type: GenreType,
            args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args) {
                return axios.get(parent + `genres/${args.id}`).then(res => res.data);
            }
        },
        genres: {
            type: GenreType,
            resolve(parent, args) {
                return axios.get(parent + `genres/${args.id}`).then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery , mutation:Mutations})