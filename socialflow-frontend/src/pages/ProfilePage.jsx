import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { userApi, postApi } from "../services/api";

function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const targetUserId = userId || user?._id;
  const isOwnProfile = !userId || userId === user?._id;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileResponse = await userApi.getUserProfile(targetUserId);
        setProfile(profileResponse.data.data);
        setEditName(profileResponse.data.data.name);

        const postsResponse = await postApi.getMyPosts();
        setPosts(postsResponse.data.data);
        // console.log(posts)
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetUserId, user, navigate]);

  const handleEditProfile = async () => {
    try {
      const response = await userApi.updateProfile({ name: editName });
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async (e) => {
    try {
      await postApi.deletePost(e.target.id)
    } catch (error) {
      console.error("Error while deleting post:", error)
    }
  }

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-20">Profile not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 px-5">
        {/* Profile Header */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
            {profile.name?.[0] || "U"}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleEditProfile}
                    className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1 bg-gray-200 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  {isOwnProfile && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-1 border border-gray-300 rounded text-sm"
                    >
                      Edit Profile
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-6 text-sm">
              <span>
                <strong>{posts.length}</strong> posts
              </span>
              <span>
                <strong>0</strong> followers
              </span>
              <span>
                <strong>0</strong> following
              </span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 gap-y-2">
          {posts.map((post) => (
            <div key={post._id} className="aspect-square relative">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.text}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Text Only</span>
                </div>
              )}
              <button onClick={handleDelete} id = {post._id} >Delete</button>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-500 mt-20">No posts yet</div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
