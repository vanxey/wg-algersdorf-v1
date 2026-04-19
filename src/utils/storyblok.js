import { renderRichText } from "@storyblok/astro";
export function formatLink(linkObj, fieldName = "unknown link") {
  if (!linkObj) {
    console.warn(`⚠️ [Storyblok Service]: Link object is missing for "${fieldName}".`);
    return "#";
  }

  // 1. Extract potential values
  const storyPath = linkObj.cached_url || linkObj.slug;
  const manualUrl = linkObj.url;
  const anchor = linkObj.anchor ? `#${linkObj.anchor}` : "";

  // 2. Determine which one to use
  // If it's a "story" type but has no path, check if a manual URL was provided instead
  if (linkObj.linktype === "story" && storyPath) {
    const base = storyPath.startsWith("/") ? storyPath : `/${storyPath}`;
    return `${base}${anchor}`;
  }

  if (linkObj.linktype === "url" && manualUrl) {
    return manualUrl;
  }

  // 3. Fallback: If the type is set wrong but there's a URL/path anyway, use it!
  const fallback = storyPath || manualUrl;
  
  if (!fallback || fallback === "") {
    console.warn(`⚠️ [Storyblok Service]: No destination found for "${fieldName}".`);
    return "#";
  }

  // Ensure leading slash for fallback paths
  return fallback.startsWith("http") || fallback.startsWith("/") || fallback.startsWith("#") || fallback.startsWith("tel:") || fallback.startsWith("mailto:")
    ? fallback 
    : `/${fallback}`;
}

/**
 * 2. SAFE IMAGE OPTIMIZATION
 * Handles string/object types and adds protocol for CSS reliability.
 */
export function getImageUrl(imgObj, transform = "", fieldName = "unknown image") {
  const rawUrl = typeof imgObj === "string" ? imgObj : imgObj?.filename;
  
  if (!rawUrl) {
    console.warn(`⚠️ [Storyblok Service]: Image source is missing for "${fieldName}".`);
    return null;
  }

  // Ensure protocol (important for CSS url() and MacBook Safari)
//   const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
//   console.log(`${url}${transform}`)
//   return `${url}${transform}`;
//   console.log(rawUrl)
  return rawUrl;
}

/**
 * 3. SAFE RICH TEXT RENDERING
 */
export function renderSafeRichText(textField, fieldName = "unknown text") {
  if (!textField || (Array.isArray(textField.content) && textField.content.length === 0)) {
    console.warn(`⚠️ [Storyblok Service]: Rich Text field "${fieldName}" is empty.`);
    return "";
  }
  
  try {
    return renderRichText(textField);
  } catch (err) {
    console.error(`❌ [Storyblok Service]: Failed to render Rich Text for "${fieldName}":`, err);
    return "";
  }
}

/**
 * 4. SAFE ALT TEXT
 */
export function getAltText(imgObj, fallback = "WG Algersdorfer Straße") {
  return imgObj?.alt || fallback;
}

/**
 * 5. BLOK VALIDATION
 */
export function isBlokValid(blok, componentName = "Unknown Component") {
  if (!blok || Object.keys(blok).length === 0) {
    console.error(`❌ [Storyblok Service]: Component "${componentName}" received no data.`);
    return false;
  }
  return true;
}