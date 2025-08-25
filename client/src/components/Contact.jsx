import React, { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.error('Failed to fetch landlord:', error);
      }
    };

    if (listing?.userRef) fetchLandLord();
  }, [listing?.userRef]);

  // Generate mailto link
  const mailtoLink = () => {
    if (!landLord?.email || !message) return '#';
    const subject = encodeURIComponent(`Regarding ${listing.name}`);
    const body = encodeURIComponent(message);
    return `mailto:${landLord.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span> for{' '}
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
                alert('Please enter a message before sending.');
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
