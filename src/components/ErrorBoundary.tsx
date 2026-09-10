import { Component, type ErrorInfo, type ReactNode } from "react";

// A JS chunk fails to import when the user's tab is older than the currently
// deployed build — the browser requests a hashed filename that no longer
// exists on the server (Vite renames chunks on every build). This is common
// here since deploys happen frequently. Auto-reload once to fetch the
// current build instead of leaving the user on a blank/stuck page.
const CHUNK_ERROR_PATTERN =
  /dynamically imported module|Importing a module script failed|Failed to fetch dynamically imported module|error loading dynamically imported module/i;
const RELOAD_FLAG = "sk_chunk_reload";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (CHUNK_ERROR_PATTERN.test(error.message)) {
      let alreadyReloaded = false;
      try {
        alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
        if (!alreadyReloaded) sessionStorage.setItem(RELOAD_FLAG, "1");
      } catch {
        // sessionStorage unavailable (private mode) — fall through to manual reload UI
      }
      if (!alreadyReloaded) {
        window.location.reload();
        return;
      }
    }
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f9f7f2]">
          <div className="text-center max-w-md bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
            <div className="text-6xl mb-4">🌿</div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mb-3 font-display">
              Something went wrong
            </h1>
            <p className="text-gray-600 text-sm mb-8 font-sans leading-relaxed">
              Please refresh the page to continue. If the problem keeps happening, contact us.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#2c5530] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1e3a22] transition-colors font-sans text-sm shadow-md cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
