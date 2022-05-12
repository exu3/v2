import Layout from "../../components/Layout";
import Link from "next/link";
import { useState } from "react";

export const GuestbookNew = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addRecord = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/guestbook/new", {
      body: JSON.stringify({
        name,
        message,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setIsLoading(false);
    } else {
      setSuccess("Entry added successfully");
      setIsLoading(false);
      setName("");
      setMessage("");
      setEmail("");
    }
  };
  return (
    <Layout heading="Guestbook">
      <div>
        <p>You find yourself in the library.</p>
        <p>You see a guestbook.</p>
        <p>
          You can <Link href="/guestbook/new">write a new entry</Link> or{" "}
          <Link href="/guestbook">read the existing entries</Link>.
        </p>
      </div>
      <div className="mx-auto card max-w-min">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-96">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* <label htmlFor="email">Email</label>
                    <input className="input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
          <label htmlFor="message">Message</label>
          <textarea
            className="input"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </Layout>
  );
};
export default GuestbookNew;
