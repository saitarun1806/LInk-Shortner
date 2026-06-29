import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const handleShorten = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/shorten",
                {
                    url
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(`Short URL Created\n${data.shortUrl}`);

            setUrl("");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <h1>
                Welcome {user?.fullName}
            </h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            <hr />

            <h2>Create Short URL</h2>

            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) =>
                    setUrl(e.target.value)
                }
            />

            <button
                onClick={handleShorten}
                disabled={loading}
            >
                {
                    loading
                        ? "Creating..."
                        : "Shorten"
                }
            </button>

        </div>
    );
}

export default Dashboard;