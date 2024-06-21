import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getNews } from "./connect";
import DateObject from "react-date-object";
import Loading from "./Loading";
import Article from "./Article";

export default function NewsList() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [news, setNews] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getNews(params.id, searchParams.get('page'), setNews);
    }, [params.id, searchParams])

    function prepareForRedirect(item) {
        localStorage.setItem('article', JSON.stringify(item));
        navigate(`.?page=${searchParams.get('page')}&id=${item.id}`);
    }

    return <main id="news">
        <button className="back" onClick={() => navigate('..')}>{'< Назад'}</button>
        {
            news ? news.map(item => {
                return <div className="article" key={item.id} onClick={() => prepareForRedirect(item)}>
                    <h3>{item.title}</h3>
                    <p>{item.shortDescription}</p>
                    <p className="date">{new DateObject(item.date).format('DD.MM.YYYY')}</p>
                </div>
            }) : <Loading/>
        }
        {
            news && !(searchParams.get('page') === '0' && news.length < 10) &&
            <div className="page-selector">
                <button onClick={() => {
                    setSearchParams({ page: searchParams.get('page') > 0 ? Number(searchParams.get('page')) - 1 : 0 })
                }}>{'< '}</button>
                { Number(searchParams.get('page')) + 1 }
                {
                    news.length === 10 &&
                    <button onClick={() => {
                        setSearchParams({ page: Number(searchParams.get('page')) + 1 })
                    }}>{' >'}</button>
                }
            </div>
        }
        {
            news && !news.length && <div>
                <h1>Кажется, новостей в этой категории нет</h1>
            </div>
        }
        <Article/>
    </main>
}