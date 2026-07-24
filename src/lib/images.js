// Real, keyword-relevant stock photography (via LoremFlickr's tagged Flickr
// search) instead of random placeholder photos, so every image on the site
// actually matches what it's captioned as.

export function travelImage(keywords, w = 1600, h = 1000, seed) {
  const tags = Array.isArray(keywords) ? keywords.join(",") : keywords;
  const lock = seed ? `?lock=${encodeURIComponent(seed)}` : "";
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}${lock}`;
}

export function avatarImage(seed, gender = "men") {
  // Deterministic real human portraits (randomuser.me photo set via pravatar).
  const n = (Math.abs(hashCode(String(seed))) % 70) + 1;
  return `https://i.pravatar.cc/300?img=${n}`;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
