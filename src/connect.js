import axios from "axios";

export function getCategories(setCategories) {
    axios.get('http://testtask.sebbia.com/v1/news/categories')
    .then(({ data }) => {
        setCategories(data.list);
    })
}

export function getNews(categoryId, pageNo, setNews) {
    axios.get(`http://testtask.sebbia.com/v1/news/categories/${categoryId}/news?page=${pageNo}`)
    .then(({ data }) => {
        setNews(data.list);
    })
}

export function getArticle(articleId, setArticle) {
    axios.get(`http://testtask.sebbia.com/v1/news/details?id=${articleId}`)
    .then(({ data }) => {
        setArticle(data.news);
    })
}