import { useEffect, useState } from "react";
import {
  createAuthor,
  updateAuthor,
} from "../api/authors";

function AuthorForm({ author, onClose, onSuccess }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.name);
    }
  }, [author]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (author) {
        await updateAuthor(author.id, { name });
      } else {
        await createAuthor({ name });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save author.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">
          {author ? "Edit Author" : "Add Author"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="border rounded w-full p-2 mb-4"
            placeholder="Author Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex gap-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthorForm;