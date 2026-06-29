const fs = require('fs');
const path = require('path');
const mainPath = 'D:/codex-GZ/src/main.jsx';
const modulesPath = 'D:/codex-GZ/portfolio-modules.generated.json';
let code = fs.readFileSync(mainPath, 'utf8');
const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf8').replace(/^\uFEFF/, '')).map((module) => {
  const { cover, ...rest } = module;
  return rest;
});
const modulesJs = `const portfolioModules = ${JSON.stringify(modules, null, 2)};\n\nfunction getModuleCover(module) {\n  return module.works.find((item) => item.media !== "video")?.src || module.works[0]?.src || "";\n}\n\nfunction getGroupedWorks(module) {\n  return module.works.reduce((groups, item) => {\n    const key = item.tag || module.title;\n    const group = groups.find((entry) => entry.title === key);\n    if (group) {\n      group.items.push(item);\n    } else {\n      groups.push({ title: key, items: [item] });\n    }\n    return groups;\n  }, []);\n}\n\nfunction getMediaClass(item) {\n  return [item.size, item.media === "video" ? "video-card" : "", item.media === "gif" ? "gif-card" : ""]\n    .filter(Boolean)\n    .join(" ");\n}\n`;
const start = code.indexOf('const portfolioModules =');
const end = code.indexOf('const strengths =');
if (start === -1 || end === -1 || end <= start) throw new Error('Cannot locate portfolioModules block');
code = code.slice(0, start) + modulesJs + code.slice(end);
code = code.replace(/<img src=\{module\.cover\} alt="" \/>/g, '<PortfolioMedia item={{ src: getModuleCover(module), media: "image", title: module.title }} />');
code = code.replace(/<img src=\{module\.cover\} alt=\{module\.title\} \/>/g, '<PortfolioMedia item={{ src: getModuleCover(module), media: "image", title: module.title }} />');
const projectPage = `function PortfolioMedia({ item }) {
  const label = item.title || item.original || "portfolio media";

  if (item.media === "video") {
    return (
      <video className="portfolio-media" controls muted playsInline preload="metadata">
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  return <img className="portfolio-media" src={item.src} alt={label} loading="lazy" />;
}

function ProjectModulePage({ module, onBack }) {
  const groupedWorks = getGroupedWorks(module);

  return (
    <main className="project-page">
      <nav className="project-page-nav">
        <button type="button" className="project-logo" onClick={onBack}>
          <span>Z</span>
          <strong>[PORTFOLIO]</strong>
        </button>
        <div className="project-page-links">
          <button type="button" onClick={onBack}>[ALL MODULES]</button>
          <a href={\`mailto:\${contact.email}\`}>[CONTACT]</a>
        </div>
      </nav>

      <section className="project-page-hero-section">
        <div className="container">
          <button className="module-back" type="button" onClick={onBack}>
            返回作品模块
          </button>

          <div className="module-page-hero">
            <div>
              <span className="section-kicker">{module.tag}</span>
              <h2>{module.title}</h2>
            </div>
            <p>{module.desc}</p>
          </div>

          <div className="module-page-cover">
            <PortfolioMedia item={{ src: getModuleCover(module), media: "image", title: module.title }} />
          </div>
        </div>
      </section>

      <section className="project-page-works">
        <div className="container">
          <div className="module-subhead">
            <span>{module.meta}</span>
            <h3>Sub Projects</h3>
          </div>

          <div className="module-group-stack">
            {groupedWorks.map((group) => (
              <section className="work-group" key={group.title}>
                <div className="work-group-head">
                  <span>{String(group.items.length).padStart(2, "0")}</span>
                  <h4>{group.title}</h4>
                </div>
                <div className="portfolio-grid module-work-grid">
                  {group.items.map((item) => (
                    <article className={\`portfolio-card \${getMediaClass(item)}\`} key={item.src}>
                      <PortfolioMedia item={item} />
                      <div className="portfolio-card-info">
                        <span>{item.media === "video" ? "MP4 MOTION" : item.media === "gif" ? "GIF DETAIL" : item.tag}</span>
                        <h3>{item.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

`;
const pageStart = code.indexOf('function ProjectModulePage');
const pageEnd = code.indexOf('function Strengths');
if (pageStart === -1 || pageEnd === -1 || pageEnd <= pageStart) throw new Error('Cannot locate ProjectModulePage block');
code = code.slice(0, pageStart) + projectPage + code.slice(pageEnd);
fs.writeFileSync(mainPath, code, 'utf8');


