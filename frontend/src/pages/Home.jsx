import React from "react"
import { Spinner } from "reactstrap"
import "../assets/css/home.css"
import PostItem from "../components/PostItem"

const Home = () => {
  const posts = [
    1,2,3,4,5

  ]
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="leftcolumn">
          <form className="form justify-content-between mt-4">
            <input
              className="form-control "
              type="search"
              placeholder="Search Posts"
              aria-label="Search"
              name="q"
              id="id_q"
            />
            <div className="mt-2 text-right">
              <button
                className="btn btn-warning btn-sm shadow-none"
                type="button"
              >
                Search
              </button>
            </div>
          </form>

          <div className="card shadow-none">
            <h5 className="">Create a post</h5>
            <p style={{fontSize: "small"}}>
              Write what you want to know and share what you know to the
              community!
            </p>
            <a href="{% url 'post:create' %}" className="card-link">
              Create Now
            </a>
          </div>
        </div> 
        {/* leftcolumn end */}

        <div className="rightcolumn">
          {posts.map((post)=> <PostItem key={post}/>)}
        </div>

      </div>
    </div>
  )
}

export default Home
