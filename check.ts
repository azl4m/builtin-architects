async function check() {
  const htmlRes = await fetch("http://localhost:3000/");
  const html = await htmlRes.text();
  
  const cssMatch = html.match(/href="([^"]*\.css)"/);
  if (!cssMatch) {
    console.log("No CSS link found in HTML.");
    return;
  }
  
  const cssUrl = "http://localhost:3000" + cssMatch[1];
  console.log("Fetching CSS from:", cssUrl);
  
  const cssRes = await fetch(cssUrl);
  const css = await cssRes.text();
  
  console.log("reveal-left in CSS:", css.includes("reveal-left"));
  console.log("animate-reveal-left in CSS:", css.includes("animate-reveal-left"));
}

check().catch(console.error);
