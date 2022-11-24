import { Header } from "../../components/Header";
import { CardRead } from "../../components/CardRead";
import style from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function HomeRead() {
  const [list, setList] = useState({});

  const params = useParams();
 const navigate= useNavigate()

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/testeProjeto2/${params.id}`
        );
      
        console.log(response.data);

        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilmes();
  }, []);

  console.log(list);

  async function handleDelete(id) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/testeProjeto2/${id}`);
     navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const filmes = list.listMovies;
  console.log(filmes);
  return (
    <div>
      <Header
        headerTitle={list.listTitle}
        listAutor={list.name}
        listDescription={list.listDescription}
      />

      <div className={style.container}>
        {filmes &&
          filmes.map((currentMovie) => {
            return (
              <CardRead
                nameList={currentMovie.title}
                description={currentMovie.overview}
                year={new Date(currentMovie.release_date).getFullYear()}
                img={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              />
            );
          })}
      </div>

      <Link to="/edit">
        <button className={style.button}>Editar lista</button>
      </Link>

      {/* <Link to="/"> */}
        <button
          className={style.button}
          onClick={() => {
            handleDelete(list._id);
          }}
        >
          Excluir lista
        </button>
      {/* </Link> */}
    </div>
  );
}
