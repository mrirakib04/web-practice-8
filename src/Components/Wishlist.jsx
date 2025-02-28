import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const Wishlist = () => {
  const { darkmode, user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  const getWishlistByUser = async () => {
    axios
      .get(
        `https://mrirakib04-server-2.vercel.app/wishlist/user?query=${user?.email}`,
        { withCredentials: true }
      )
      .then((res) => setWishlist(res.data))
      .catch((error) => {
        toast.error(`Error loading wishlist blogs: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  useEffect(() => {
    getWishlistByUser();
  }, []);

  const handleDeleteBlogFromWishlist = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "red",
      confirmButtonColor: "#c22717",
      cancelButtonColor: "#038a07",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://mrirakib04-server-2.vercel.app/wishlist/blog?query=${id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "This blog has been deleted from your wishlist.",
                icon: "success",
              });
              getWishlistByUser();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Blog",
      selector: (row) => (
        <Link
          to={`/blog/${row.blogId}`}
          className="hover:text-blue-600 hover:underline transition"
        >
          {row.blogName}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.blogCategory,
      sortable: true,
    },
    {
      name: "PostedBy",
      selector: (row) => row.postedBy,
      sortable: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          onClick={() => handleDeleteBlogFromWishlist(row._id)}
          className="px-3 py-1 bg-red-400 text-black hover:text-white rounded hover:bg-red-600 transition text-base"
        >
          <FaRegTrashAlt></FaRegTrashAlt>
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "black",
        fontWeight: "bold",
        fontSize: "12px",
        color: "white",
      },
    },
    headCells: {
      style: {
        color: "white",
        fontWeight: "bold",
        fontSize: "12px",
        padding: "4px", // Adjusted padding for head cells
      },
    },
    rows: {
      style: {
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
      },
    },
    cells: {
      style: {
        color: "gray",
        fontWeight: "600",
        fontSize: "12px", // Adjusted font size for cells
        padding: "4px", // Reduced padding for better compactness
      },
    },
    // Adjust column widths (optional, to ensure more compact layout)
    columns: {
      style: {
        Blog: {
          width: "30%",
        },
        Category: {
          width: "20%",
        },
        PostedBy: {
          width: "25%",
        },
        Delete: {
          width: "20%",
        },
      },
    },
  };

  return (
    <div
      className={
        darkmode
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-yellow-900 via-black from-violet-900 sm:py-20 py-12 sm:px-5 text-white"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-yellow-200 via-white from-violet-200 sm:py-20 py-12 sm:px-5"
      }
    >
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-gray-200 flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        Your
        <p
          className={
            darkmode
              ? "text-cyan-400 italic animate__animated animate__pulse animate__infinite animate__slow"
              : "text-cyan-700 italic animate__animated animate__pulse animate__infinite animate__slow"
          }
        >
          Wishlist
        </p>
      </h2>

      <div className="mt-3 lg:w-2/3 md:w-4/5 sm:w-10/12 w-full ">
        <DataTable
          columns={columns}
          data={wishlist}
          customStyles={customStyles}
          noDataComponent={<p>No wishlist blogs found!</p>}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Wishlist;
