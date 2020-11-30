import React from 'react';

const Page = ({ postsPerPage, totalPosts, paginate }) => {
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => {
                    return(
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#!" className="page-link">
                            {number}
                        </a>
                    </li
                    >)
                })}
            </ul>
        </nav>
    )
};

export default Page;