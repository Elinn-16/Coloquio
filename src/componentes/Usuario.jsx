import { useState, useRef } from "react";
import axios from "axios";

function Usuario() {
    
    const [posts, setPosts] = useState([]);
    const refInput = useRef(null);

    // Obtengo un post desde la API y los guardo en JSON-Server
    const obtenerPost = () => {
        const cantidad = parseInt(refInput.current.value) || 1; // Asegurar que sea número
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                const selectedPosts = response.data.slice(0, cantidad);

                // Guardar en JSON-Server cada post
                selectedPosts.forEach((post) => {
                    axios.post("http://localhost:3001/posts", post)
                        .catch((error) => console.error("Error al guardar en JSON-Server:", error));
                });

                setPosts(selectedPosts);
            })
            .catch((error) => console.error("Error al obtener publicaciones:", error));
    };

    // Elimino un post desde JSON-Server
    const eliminarPost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            })
            .catch((error) => console.error("Error al eliminar:", error));
            console.log("Post eliminado", id);
    };

    return (
        <div className="usuario">
            <h1>Bienvenido</h1>
            <h2>¿Qué cantidad de publicaciones quiere?</h2>
            <input type="number" ref={refInput} />
            <button onClick={obtenerPost}>Obtener publicaciones</button>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                        <button onClick={() => eliminarPost(post.id)}>Eliminar Post</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Usuario;
