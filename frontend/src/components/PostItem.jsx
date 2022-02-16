import UserImage from "../assets/png/user.png"
import CommentImage from "../assets/png/image.png"
import "../assets/css/post_item.css"

const PostItem = () => {
  const author = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
    first_name: "Abul",
    last_name: "hyat",
    designation: "assistant",
    batch: "59",
    department: "cse",
    role: "Student",
  }

  const post = {
    date_updated: "today",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, placeat obcaecati praesentium magnam ab voluptas at delectus suscipit accusamus cupiditate nemo sint, dicta reiciendis nobis quo sed, enim ipsam a veritatis tenetur dolor vero. Corrupti possimus cumque sunt quam, consequuntur aliquid ratione magni aut itaque. Explicabo laboriosam provident fuga dolorem!",
    comments: 5,
  }

  return (
    <div >
      <div className="card shadow-none mt-5">
        <div className="card-content">
          <div className="card-body p-0">
            {author.role === "Teacher" && <>{/*  edit delete option*/}</>}
            <div className="profile">
              {author.image ? (
                <img src={author.image} />
              ) : (
                <img src={UserImage} />
              )}
            </div>
            <span className="float-right text-muted fs-6">
              <small>{post.date_updated}</small>
            </span>
            <div className="class-title">
              {author.role === "Teacher" ? (
                <>
                  <strong>
                    {author.first_name} {author.last_name}
                  </strong>{" "}
                  <sup>
                    <span className="badge rounded-pill bg-dark text-white">
                      {" "}
                      Teacher
                    </span>
                  </sup>
                  <br />
                  {author.designation && <small> {author.designation}</small>}
                </>
              ) : (
                <>
                  <strong>
                    {author.first_name} {author.last_name}
                  </strong>
                  <br />
                  {author.batch && <small> {author.batch}</small>}
                  {author.department && <small> {author.department}</small>}
                </>
              )}
            </div>
            <p> {post.text}</p>
          </div>

          <div className="card-footer bg-transparent">
            <p>
              <i className="fa fa-comment mr-1"></i>
              {post.comments} Comment
            </p>

            <div className=" flex-row align-items-start">
              <form>
                <div className="flexContainer">
                  <input
                    type="text"
                    style={{ width: "100%", height: "40px" }}
                    id="commentBody"
                    placeholder="Comment here"
                    required
                  />
                </div>
                <div className="text-right">
                  <button
                    className="comment_button"
                    type="submit"
                    value="Comment"
                  >
                    Post comment
                  </button>
                </div>
              </form>
              <h6>Recent comments</h6>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
