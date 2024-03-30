import "./paginate.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  currentPageNumber: number;
  currentLimit: number;
  setPage: (page: number) => void;
  count: number;
  isLoading: boolean;
  useParams?: boolean;
}

const Paginate = ({
  currentPageNumber,
  currentLimit,
  setPage,
  count,
  isLoading,
  useParams = true, 
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = currentPageNumber || 1;
  const documentsFound = count || 0;
  const limit = currentLimit || 0;
  
  const totalPages = Math.ceil(documentsFound / limit);
  
  useEffect(() => {
    if (useParams && parseInt(searchParams.get("page") || "1") !== page) {
      setPage(parseInt(searchParams.get("page") || "1"));
    }
  }, [page, searchParams, setPage, useParams]); 
  
  if (documentsFound <= limit || isLoading) return null;
  
  const array = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastPage = array[array.length - 1];

  function shouldRender(item: number) {
    return item === 1 || lastPage === item || (page - 2 <= item && page + 4 >= item);
  }

  function setPageFn(page: number) {
    setPage(page);
    if (useParams) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  }

  return (
    <div className='pagination-container'> 
      <button
        disabled={page === 1}
        onClick={() => setPageFn(page - 1)}
        className='pagination-number arrow' 
      >
        <IoIosArrowBack />
      </button>
      {array.map((item) => shouldRender(item) && (
        <button
          onClick={() => setPageFn(item)}
          key={item}
          className={`pagination-number ${item === page ? 'active' : ''}`} 
        >
          <p>{item}</p>
        </button>
      ))}
      <button
        disabled={page === lastPage}
        onClick={() => setPageFn(page + 1)}
        className='pagination-number arrow' 
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Paginate;
