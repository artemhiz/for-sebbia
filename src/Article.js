import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { getArticle } from "./connect";
import DateObject from "react-date-object";
import parse from 'html-react-parser';

export default function Article() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [article, setArticle] = useState(localStorage.article ? JSON.parse(localStorage.article) : undefined);

    useEffect(() => {
        if (searchParams.get('id')) {
            getArticle(searchParams.get('id'), setArticle);
        }
    }, [searchParams])

    return article && <div className={("bg") + (searchParams.get('id') ? '' : ' closed')}>
        <section className="window">
            <button className="back" onClick={() => setSearchParams({page: searchParams.get('page')})}>{'< Назад'}</button>
            <article>
                <h1>{article.title}</h1>
                <p>{article.shortDescription}</p>
                <p>{new DateObject(article.date).format('DD.MM.YYYY')}</p>
                <section>
                    {article.fullDescription ? parse(article.fullDescription) : <Loading/>}
                </section>
            </article>
        </section>
    </div>
}