export default function isProduction(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname !== "localhost";
}
