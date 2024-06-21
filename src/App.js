import { useEffect, useState } from "react"
import { getCategories } from "./connect";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function App() {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories(setCategories);
    }, [])

    return <main id="home">
        {
            categories ? categories.map(({ name, id }) => {
                return <button onClick={() => navigate(`/${id}/news?page=0`)} key={id}>{name}</button>
            }) : <Loading/>
        }
    </main>
}