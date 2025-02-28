import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router";

const FeaturedBlogs = () => {
  const { darkmode } = useContext(AuthContext);
  const [FeaturedBlogs, setFeaturedBlogs] = useState([]);

  const getFeaturedBlogs = async () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/featured`, {
        withCredentials: true,
      })
      .then((res) => setFeaturedBlogs(res.data))
      .catch((error) => {
        toast.error(`Error loading featured blogs: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  useEffect(() => {
    getFeaturedBlogs();
  }, []);

  const columns = [
    {
      name: "Blog",
      selector: (row) => (
        <Link
          to={`/blog/${row._id}`}
          className="hover:text-blue-600 hover:underline transition"
        >
          {row.blogName}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "PostedBy",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.publishDate,
      sortable: true,
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
        padding: "10px", // Adjusted padding for head cells
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
        padding: "10px", // Reduced padding for better compactness
      },
    },
    // Adjust column widths (optional, to ensure more compact layout)
    columns: {
      style: {
        Blog: {
          width: "35%",
        },
        Category: {
          width: "20%",
        },
        PostedBy: {
          width: "25%",
        },
        Date: {
          width: "20%",
        },
      },
    },
  };
  return (
    <div
      className={
        darkmode
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-cyan-900 via-black from-indigo-900 sm:py-20 py-12 sm:px-5 text-white"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-cyan-200 via-white from-indigo-200 sm:py-20 py-12 sm:px-5"
      }
    >
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-gray-200 flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        <p
          className={
            darkmode
              ? "text-cyan-400 italic animate__animated animate__pulse animate__infinite animate__slow"
              : "text-cyan-700 italic animate__animated animate__pulse animate__infinite animate__slow"
          }
        >
          Featured
        </p>
        Blogs
      </h2>

      <div className="mt-3 lg:w-2/3 md:w-4/5 sm:w-10/12 w-full ">
        <DataTable
          columns={columns}
          data={FeaturedBlogs}
          customStyles={customStyles}
          noDataComponent={<p>No wishlist blogs found!</p>}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;
