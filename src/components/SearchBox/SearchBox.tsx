import css from "./SearchBox.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBarNotes({ onSubmit }: SearchBarProps) {
  async function handleSubmit(formData: FormData) {
    const query = (formData.get("query") as string)?.trim() || "";
    if (!query) {
      toast.error("Please enter your search query.");

      return;
    }
    onSubmit(query);
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search notes..."
            autoFocus
          />

          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
