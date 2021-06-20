const environmentUrls = new Map();

environmentUrls.set("localhost", "http://localhost:8080");
environmentUrls.set(
  "book-store-web.herokuapp.com",
  "https://book-demo-store.herokuapp.com"
);

export default environmentUrls.get(window.location.hostname);
