import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { MAILING_LIST_URL } from "../constants";

const SubscribeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSubmit = () => {
    if (email.length === 0) {
      setError("Please enter an email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const params = {
      email,
      name,
    };
    const url = new URL(MAILING_LIST_URL);
    url.search = new URLSearchParams(params).toString();

    async function postData() {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return response;
    }

    postData()
      .then((data) => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
        console.error("Error:", error);
      });
  };
  return (
    <>
      {isSuccess && (
        <p className="text-green-500">
          Thank you for subscribing! Expect to see epic updates in your inbox
          soon!
        </p>
      )}
      {!isSuccess && (
        <>
          <div className="flex gap-x-10 items-center">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className={`bg-inherit ${
                error ? "border-red-500" : "border-white"
              } border-2 rounded-md text-center outline-green-500 outline-4`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="required"
            />
          </div>
          <div className="flex gap-x-10 items-center">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              className="bg-inherit border-white border-2 rounded-md text-center outline-green-500 outline-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="optional"
            />
          </div>
          {!isLoading && (
            <button
              className="bg-neutral-700 hover:bg-green-500 ease-linear px-8 py-2 rounded-lg duration-200 outline-green-500 outline-4"
              id="submit"
              onClick={handleOnSubmit}
            >
              SIGN UP!
            </button>
          )}
          {isLoading && <LoaderCircle className="animate-spin" />}

          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </>
  );
};

export default SubscribeForm;
