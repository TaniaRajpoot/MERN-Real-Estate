import React, { useEffect, useState } from "react";

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setMessage(e.target.value);

  console.log(import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/contact/${listing.userRef}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch landlord: ${res.status} ${res.statusText}`
          );
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await res.json();

        if (data.success === false) {
          throw new Error(data.message || "Failed to fetch landlord");
        }

        setLandLord(data);
      } catch (error) {
        console.error("Failed to fetch landlord:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (listing?.userRef) fetchLandLord();
  }, [listing?.userRef]);

  const mailtoLink = () => {
    const subject = encodeURIComponent(`Regarding ${listing.name}`);
    const body = encodeURIComponent(message);
    return `mailto:${landLord.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {loading && (
        <div className="flex flex-col gap-2">
          <p className="text-center">Loading landlord information...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-2">
          <p className="text-red-600">Error: {error}</p>
          <p className="text-sm text-gray-600">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {landLord && !loading && !error && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name?.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <a
            href={mailtoLink()}
            onClick={(e) => {
              if (!message) {
                e.preventDefault();
                alert("Please enter a message before sending.");
              }
            }}
            className="bg-[#424b1e] text-white/90 text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </a>
        </div>
      )}
    </>
  );
}
