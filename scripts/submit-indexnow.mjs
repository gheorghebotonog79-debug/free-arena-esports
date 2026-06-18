const host = "play.free-arena.ro";
const key = process.env.INDEXNOW_KEY || "e37b8e7c49984cd6a79702c169a42d32";
const siteUrl = `https://${host}`;
const keyLocation = `${siteUrl}/${key}.txt`;
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

const priorityPaths = [
  "/ro",
  "/en",
  "/ro/servers",
  "/en/servers",
  "/ro/cs-1-6-servers",
  "/en/cs-1-6-servers",
  "/en/cs-1-6-servers-balkans",
  "/en/cs-1-6-servers-eastern-europe",
  "/en/cs-1-6-servers-brazil",
  "/en/counter-strike-servers-europe",
  "/fivem",
  "/ro/fivem-server",
  "/en/fivem-server",
  "/ro/server/fivem",
  "/en/server/fivem",
  "/ro/rankings",
  "/en/rankings",
  "/ro/shop",
  "/en/shop",
  "/ro/join-staff",
  "/en/join-staff",
];

function toAbsoluteUrl(path) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

async function fetchSitemapUrls() {
  const response = await fetch(`${siteUrl}/sitemap.xml`);

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap.xml: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap.xml.");
  }

  return urls;
}

async function submitUrls(urlList) {
  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `IndexNow submit failed: ${response.status} ${response.statusText}${responseText ? `\n${responseText}` : ""}`,
    );
  }

  return { response, responseText };
}

async function main() {
  const submitAllSitemap = process.argv.includes("--all-sitemap");
  const explicitUrlsArg = process.argv.find((arg) => arg.startsWith("--urls="));
  const explicitUrls = explicitUrlsArg
    ? explicitUrlsArg
        .slice("--urls=".length)
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    : [];

  const urlList = explicitUrls.length > 0
    ? explicitUrls.map(toAbsoluteUrl)
    : submitAllSitemap
      ? await fetchSitemapUrls()
      : priorityPaths.map(toAbsoluteUrl);

  const uniqueUrls = [...new Set(urlList)];
  const { responseText } = await submitUrls(uniqueUrls);

  console.log(`IndexNow submitted ${uniqueUrls.length} URLs.`);
  console.log(`Key location: ${keyLocation}`);
  if (responseText) {
    console.log(responseText);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
