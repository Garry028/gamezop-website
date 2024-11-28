'use client';
import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const getPageNumbers = () => {
    const pages = [];
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-8"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-md
          ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }
        `}
        aria-label="Previous Page"
      >
        <FaArrowLeft className="mr-2" />
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-md
            ${
              currentPage === page
                ? 'bg-indigo-800 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }
          `}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-md
          ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }
        `}
        aria-label="Next Page"
      >
        Next
        <FaArrowRight className="ml-2" />
      </button>
    </nav>
  );
};

export default Pagination;
