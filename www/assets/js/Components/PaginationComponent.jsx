import React from 'react'

const PaginationComponent = ({currentPage, itemsPerPage, length, onPageChange}) => {

    const pageCount = Math.ceil(length / itemsPerPage);
    
    const pages = [];
    
    for (let i = 0; i <= pageCount; i++) {
        pages.push(i);
    }
    
    return (
        <div>
            <ul className="pagination pagination-sm justify-content-center">
                <li className={"page-item" + (currentPage === 0 && " disabled")}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                </li>
                { pages.map(page =>
                    <li key={ page } className={"page-item" + (currentPage === page && " active")}>
                        <button className="page-link" onClick={() => onPageChange(page)}>{ page + 1 }</button>
                    </li>
                )}
                <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 2)}>&raquo;</button>
                </li>
            </ul>
        </div>
    )
}

PaginationComponent.getData = (items, currentPage, itemsPerPage) => {
    let start = currentPage * itemsPerPage - currentPage;
    let end = start + itemsPerPage;

    return items.slice(start, end);
}

export default PaginationComponent;