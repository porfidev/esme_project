//const base = "https://image.tmdb.org/t/p/original/"

const Pelicula = ({ peli }) => {
    return (
        <div className="pelicula">
            <img alt={peli.title} className="poster"
                 src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`}/>
            <h3 className="titulo">${peli.title}</h3>
            <h3 className="titulo">${peli.overview}</h3>
        </div>)
};

// la cosa de {pagina} es como decir props.pagina
const PeliculasView = ({pagina}) => {
    const [peliculas, setPeliculas] = React.useState([]);

    React.useEffect(() => {
        cargarPeliculas();
    }, [pagina]);

    const cargarPeliculas = async () => {
        try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d8f9049d4aae5f26bb9e2c233fe45fc5&language=es-MX&page=${pagina}`);

            // si la consola da el  status 200 es correcto y si es 500 es error
            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                setPeliculas(datos.results);
            } else {
                console.log('Error');
                setPeliculas([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (<div className="contenedor" id="contenedor">
        {
            peliculas.map((pelicula, index) => {
                return (<Pelicula peli={pelicula} key={index}/>);
            })
        }
    </div>);
};


const Esme = ({ apellido, paterno }) => {
    /*
    const props = {
        apellido: "Carrillo"
    };
     */
    return (<div>hola {apellido} {paterno}</div>)
}

/**
 * Esta es la aplicacion principal
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [page, setPage] = React.useState(1);

    // Como definir variables de estado
    // const [nombreDeTuVariable, setNombreDeTuVariable] = React.useState("valor inicial")

    // Ocurre al presionar los botones
    const handleChangePage = (type) => {
        if (type === 'back') {
            if (page === 1) {
                return false;
            }

            return setPage(page - 1);
        }

        // forward
        if (page > 1000) {
            return false;
        }

        return setPage(page + 1);
    };

    return (<div>
        <Esme apellido="Carrillo" paterno="Chavez"/>
        <h1>PELÍCULAS</h1>

        <PeliculasView pagina={page} />

        <div className="paginacion">
            <button id="btnAnterior" onClick={() => handleChangePage('back')}>Anterior</button>
            <button id="btnSiguiente" onClick={() => handleChangePage('forward')} >Siguiente</button>
        </div>
    </div>);
};


// Inicia la aplicacion aqui
const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);
