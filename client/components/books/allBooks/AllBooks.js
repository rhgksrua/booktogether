import React from 'react';

import AllBookList from './AllBookList';

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getAllBooks();
    }
    render() {
        const books = this.props.books;
        return (
            <div>
                <h5>ALL BOOKS</h5>
                <BookList 
                    bookList={books} 
                    add={false} 
                    remove={false} 
                    detail={true} 
                    link={'allbooks'}
                />
            </div>
        );
    }
}

export default AllBooks;
