import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="flex justify-center m-5 text-3xl font-bold">
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center font-semibold text-">
        "Track wisely, spend mindfully."
      </footer>
    </>
  );
}
