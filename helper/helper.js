const axios=require('axios');

const url="http://localhost:3000/";


exports.getBook=(id)=>{
    if(!id){
        throw new Error('You must provide an ID for me to fetch the book');
    }
    return axios.get(url+`books/${id}`).then(data=>data.data);
}


exports.addBook=({name, authorid, genreid})=>{
    if(!name){
        throw new Error("Please Enter the name of the Book");
    }
    else if(!authorid){
        throw new Error("Author not found");
    }
    else if (!genreid){
        throw new Error("Genre not found");
    }
    else {
        return axios.post(url+"books", {name, authorid, genreid}).then(res=>res.data);
    }
}

exports.deleteBook=(id)=>{
    if(!id){
        throw new Error("ID not specified");
    }
    else{
        return axios.delete(url+`books/${id}`).then(res=>res.data);
    }  
}

exports.updateBook=({id, name, authorid, genreid})=>{
    if(!id){
        throw new Error("ID not specified");
    }
    else if(!name){
        throw new Error("Author ID is not specified");
    }
    else if(!genreid){
        throw new Error("Genre ID is not specified");
    }
    else {
        return axios.patch(url+`books/${id}`, {name, authorid, genreid}).then(res=>res.data);
    }
}

exports.getAuthor=({id})=>{
    if(!id){
        throw new Error("ID of the author needs to be specified");
    }
    else{
        return axios.get(url+`books/${id}`).then(res=>res.data);
    }
}

exports.addAuthor=({name, age, country})=>{
    if(!name){
        throw new Error("Name of the Author not specified");
    }
    else if(!age){
        throw new Error("Age of the Author not specified");
    }
    else if(!country){
        throw new Error("Country of the Author not specified");
    }
    else{
        return axios.post(url+"books", {name, age, country}).then(res=>res.data);
    }
}

exports.deleteAuthor=({id})=>{
    if(!id){
        throw new Error("ID of the Author to delete not specified");
    }
    else{
        return axios.delete(url+`authors/${id}`).then(res=>res.data);
    }
}

exports.updateAuthor=({id, name, country, age})=>{
    if(!id){
        throw new Error("ID of the author not specified");
    }
    else if(!name){
        throw new Error("Name of the author not specified");
    }
    else if(!country){
        throw new Error("Country of the author not specified");
    }
    else if(!age){
        throw new Error("Age of the author not specified");
    }
    else{
        return axios.patch(url+`authors/${id}`, {name, age, country});
    }
}

exports.addGenre=({name})=>{
    if(!name){
        throw new Error("Name of the genre should be specified");
    }
    else{
        return new axios.post(url+'genres', {name}).then(res=>res.data);
    }
}

exports.getGenre=({id})=>{
    if(!id){
        throw new Error("Id of the genre not specified");
    }
    else{
        return axios.get(url+`books/${id}`)
    }
}

exports.deleteGenre=({id})=>{
    if(!id){
        throw new Error("ID of the Genre to delete is not specified");
    }
    else{
        return new axios.delete(url+`genres/${id}`).then(res=>res.data);
    }
}

exports.updateGenre=({id, name})=>{
    if(!id){
        throw new Error("ID of the Genre to update is not specified");
    }
    else if(!name){
        throw new Error("Name of the Genre to update is not specified");
    }
    else{
        return new axios.patch(url+`genres/${id}`).then(res=>res.data);
    }
}