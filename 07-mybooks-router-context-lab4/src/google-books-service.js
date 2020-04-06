const GOOLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

class GoogleBooks {
    async searchBooks(searchText) {
    const booksResp = await fetch(
      GOOLE_BOOKS_API_BASE + encodeURIComponent(searchText)
    );
    const booksFound = await booksResp.json();
    console.log(booksFound.items);
    return booksFound.items.map(gbook => ({
        id: gbook.id,
        title: gbook.volumeInfo.title,
        subtitle: gbook.volumeInfo.subtitle,
        frontPage:
            gbook.volumeInfo.imageLinks && gbook.volumeInfo.imageLinks.thumbnail
    }));
  }
}

export default GoogleBooks;
