import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FunctionComponent } from "react";

interface Props {
  pageCount: number;
  handleChangePage: (selected: { selected: number }) => void;
}

const Pagination: FunctionComponent<Props> = ({
  pageCount = 0,
  handleChangePage,
}) => {
  return (
    <ReactPaginate
      previousLabel={<AiOutlineArrowLeft />}
      nextLabel={<AiOutlineArrowRight />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handleChangePage}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
