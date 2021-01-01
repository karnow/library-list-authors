import React from 'react';

export default function Author({author}) {

return (
    <>
    <img src={author.photo.url} alt={author.name}/>
    <h2>{author.name}</h2>

    </>
)

}