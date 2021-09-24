import Jumbo from "../../components/Jumbo/Jumbo";
import MovieList from "../../components/MovieList/MovieList";
import CategoryList from "../../components/CategoryList/CategoryList";

const Home = () => {
    return (
        <div>
            <Jumbo name="Now Playing" />
            <MovieList />
            <CategoryList />
        </div>
    );
};

export default Home;
