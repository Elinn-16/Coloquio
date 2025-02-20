import { useState, useRef } from "react";
import axios from "axios";
//import App from "../App.css";

function Usuario() {
    
const [posts, setPosts] = useState([]);
const refInput = useRef(null);

const obtenerPost = () => {
    const cantidad = refInput.current.value;
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => {
            setPosts(response.data.slice(0, cantidad));
        })
        .catch((error) => console.error("Error al obtener publicaciones:", error));
};


const eliminarPost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then( () => {
        setPosts(posts.filter((post) => post.id !== id));
    })
    .catch((error) => console.error("Error al eliminar:", error));
};


    return (
        <div className="usuario">
            <h1>Bienvenido</h1>,
            <h2>¿Que cantidad de publicaciones quiere?</h2>,
            <input type="number" ref={refInput} />, 
            <button onClick={obtenerPost}>Obtener publicaciones</button>
        </div>,

        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                    <button onClick={() => eliminarPost(post.id)}>Eliminar Post</button>
                </li>
            ))}
        </ul>
    );
}

export default Usuario;