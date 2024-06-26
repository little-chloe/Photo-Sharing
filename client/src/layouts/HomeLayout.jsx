import NavBar from "../components/navbar/NavBar";
import ViewPost from "../components/view_post/ViewPost";
import { useCreatePost } from "../contexts/CreatePostContext";
import { useViewPost } from "../contexts/ViewPostContext";

function HomeLayout({ children }) {
  const { isCreated, handleClosePopup } = useCreatePost();
  const { postId } = useViewPost();
  
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {postId && <ViewPost />}
      {isCreated && (
        <div className="w-full h-full absolute bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white rounded-lg py-4 px-8">
            <div className="text-xl mb-8">
              <p>Post is successfully created!</p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-black text-white rounded-lg py-2 px-4 active:scale-95 transition-all border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white"
                onClick={handleClosePopup}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-full flex w-full">
        <div className="w-1/6 m-4">
          <NavBar />
        </div>
        {children}
      </div>
    </div>
  );
}

export default HomeLayout;
