import React, { ReactNode } from 'react'
import { Item } from './book-models'
import BookItem from './BookItem'

export interface BooksProps {
    books: Item[];
    favs: Item[];
    onAddFavourite(item: Item): void;
    onRemoveFavourite(item: Item): void;
    children?: ReactNode;
}

const Books = ({ books, favs,  ...rest }: BooksProps) => {
    return (
        <>
            {books.map(book => (<BookItem key={book.id} book={book}
                inFavs={!!favs.find(b => b.id === book.id)} {...rest} />))}
            {/* <ul> */}
            {/* {React.Children.toArray(children).filter(child => (child as HTMLElement).tagName === 'div') */}
            {/* {React.Children.map(children, ch => (<li>{ch}</li>))} */}
            {/* {React.Children.toArray(children)
                    .filter(child => !(typeof child === "string") && (child as JSX.Element).type === 'div')
                    .map((child, index) => (<li key={index}>{index}: {child}: {(child as JSX.Element).type}</li>))
                } */}
            {/* </ul> */}
        </>
    )
}

export default Books


