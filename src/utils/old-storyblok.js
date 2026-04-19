export function formatLink(linkObj) {
  if (!linkObj) return "#";
  if (linkObj.linktype === "story") {
    return linkObj.cached_url.startsWith("/") ? linkObj.cached_url : `/${linkObj.cached_url}`;
  }
  return linkObj.url || "#";
}