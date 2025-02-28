import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../HomeLayout/Home";
import PrivateRoute from "./PrivateRoute";
import AddBlog from "../Components/AddBlog";
import Blogs from "../Components/Blogs";
import FeaturedBlogs from "../Components/FeaturedBlogs";
import Wishlist from "../Components/Wishlist";
import App from "../App";
import BlogDetails from "../Components/BlogDetails";
import UpdateBlog from "../Components/UpdateBlog";
import Login from "../AuthLayout/Login";
import Register from "../AuthLayout/Register";
import ErrorPage from "./ErrorPage";
import Career from "../OptionalComponents/Career";
import Terms from "../OptionalComponents/Terms";
import Details from "../OptionalComponents/Details";

const PagesRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/" element={<App></App>}>
          <Route index element={<Home></Home>}></Route>
          <Route
            path="/add-blog"
            element={
              <PrivateRoute>
                <AddBlog></AddBlog>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/blog/:id" element={<BlogDetails></BlogDetails>}></Route>
          <Route
            path="/blog/update/:id"
            element={<UpdateBlog></UpdateBlog>}
          ></Route>
          <Route
            path="/featured-blogs"
            element={<FeaturedBlogs></FeaturedBlogs>}
          ></Route>
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist></Wishlist>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/career" element={<Career></Career>}></Route>
          <Route path="/terms" element={<Terms></Terms>}></Route>
          <Route path="/details" element={<Details></Details>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PagesRouter;
