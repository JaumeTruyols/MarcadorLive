import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_BVI5uupt.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_viEnG-Uv.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/visual%20proyectos/partidos/","cacheDir":"file:///C:/visual%20proyectos/partidos/node_modules/.astro/","outDir":"file:///C:/visual%20proyectos/partidos/dist/","srcDir":"file:///C:/visual%20proyectos/partidos/src/","publicDir":"file:///C:/visual%20proyectos/partidos/public/","buildClientDir":"file:///C:/visual%20proyectos/partidos/dist/client/","buildServerDir":"file:///C:/visual%20proyectos/partidos/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/fixture/[id]/detail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/fixture\\/([^/]+?)\\/detail\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"fixture","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"detail","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/fixture/[id]/detail.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/fixture/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/fixture\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"fixture","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/fixture/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/match/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/match\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"match","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/match/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/clasificacion/[code]/goleadores","isIndex":false,"type":"page","pattern":"^\\/clasificacion\\/([^/]+?)\\/goleadores\\/?$","segments":[[{"content":"clasificacion","dynamic":false,"spread":false}],[{"content":"code","dynamic":true,"spread":false}],[{"content":"goleadores","dynamic":false,"spread":false}]],"params":["code"],"component":"src/pages/clasificacion/[code]/goleadores.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/clasificacion/[code]/jornada/[day]","isIndex":false,"type":"page","pattern":"^\\/clasificacion\\/([^/]+?)\\/jornada\\/([^/]+?)\\/?$","segments":[[{"content":"clasificacion","dynamic":false,"spread":false}],[{"content":"code","dynamic":true,"spread":false}],[{"content":"jornada","dynamic":false,"spread":false}],[{"content":"day","dynamic":true,"spread":false}]],"params":["code","day"],"component":"src/pages/clasificacion/[code]/jornada/[day].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/clasificacion/[code]","isIndex":false,"type":"page","pattern":"^\\/clasificacion\\/([^/]+?)\\/?$","segments":[[{"content":"clasificacion","dynamic":false,"spread":false}],[{"content":"code","dynamic":true,"spread":false}]],"params":["code"],"component":"src/pages/clasificacion/[code].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{background:#0a0f1a;color:#e5e7eb;font-family:monospace;padding:2rem;font-size:.82rem}h1[data-astro-cid-6tqurwfq],h2[data-astro-cid-6tqurwfq]{color:#22c55e}table[data-astro-cid-6tqurwfq]{border-collapse:collapse;width:100%;margin-top:.5rem;margin-bottom:2rem}th[data-astro-cid-6tqurwfq],td[data-astro-cid-6tqurwfq]{padding:.4rem .8rem;border:1px solid #374151;text-align:left}th[data-astro-cid-6tqurwfq]{background:#1f2937;color:#9ca3af}.ok[data-astro-cid-6tqurwfq]{color:#22c55e}.fail[data-astro-cid-6tqurwfq]{color:#ef4444}.warn[data-astro-cid-6tqurwfq]{color:#f59e0b}\n"}],"routeData":{"route":"/debug","isIndex":false,"type":"page","pattern":"^\\/debug\\/?$","segments":[[{"content":"debug","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/debug.astro","pathname":"/debug","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/equipo/[id]","isIndex":false,"type":"page","pattern":"^\\/equipo\\/([^/]+?)\\/?$","segments":[[{"content":"equipo","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/equipo/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/explorador.jw_N62m9.css"}],"routeData":{"route":"/explorador","isIndex":false,"type":"page","pattern":"^\\/explorador\\/?$","segments":[[{"content":"explorador","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/explorador.astro","pathname":"/explorador","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/jugador/[id]","isIndex":false,"type":"page","pattern":"^\\/jugador\\/([^/]+?)\\/?$","segments":[[{"content":"jugador","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/jugador/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_code_.QYfWGC8j.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/visual proyectos/partidos/src/pages/debug.astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/explorador.astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/clasificacion/[code].astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/clasificacion/[code]/goleadores.astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/clasificacion/[code]/jornada/[day].astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/equipo/[id].astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/visual proyectos/partidos/src/pages/jugador/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/fixture/[id]/detail@_@ts":"pages/api/fixture/_id_/detail.astro.mjs","\u0000@astro-page:src/pages/api/fixture/[id]@_@ts":"pages/api/fixture/_id_.astro.mjs","\u0000@astro-page:src/pages/api/match/[id]@_@ts":"pages/api/match/_id_.astro.mjs","\u0000@astro-page:src/pages/clasificacion/[code]/goleadores@_@astro":"pages/clasificacion/_code_/goleadores.astro.mjs","\u0000@astro-page:src/pages/clasificacion/[code]/jornada/[day]@_@astro":"pages/clasificacion/_code_/jornada/_day_.astro.mjs","\u0000@astro-page:src/pages/clasificacion/[code]@_@astro":"pages/clasificacion/_code_.astro.mjs","\u0000@astro-page:src/pages/debug@_@astro":"pages/debug.astro.mjs","\u0000@astro-page:src/pages/equipo/[id]@_@astro":"pages/equipo/_id_.astro.mjs","\u0000@astro-page:src/pages/explorador@_@astro":"pages/explorador.astro.mjs","\u0000@astro-page:src/pages/jugador/[id]@_@astro":"pages/jugador/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_vxWdML9A.mjs","C:/visual proyectos/partidos/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CJ6vYkmh.mjs","C:/visual proyectos/partidos/src/pages/explorador.astro?astro&type=script&index=0&lang.ts":"_astro/explorador.astro_astro_type_script_index_0_lang.BNY12AD9.js","C:/visual proyectos/partidos/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.hjHBkG-m.js","C:/visual proyectos/partidos/src/components/MatchesSection":"_astro/MatchesSection.rhbA4esS.js","@astrojs/react/client.js":"_astro/client.nc8uITnr.js","C:/visual proyectos/partidos/src/components/MatchCard":"_astro/MatchCard.B21oNnV2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/visual proyectos/partidos/src/pages/explorador.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"json-out\");s&&(s.innerHTML=s.textContent.replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/(\"(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\\"])*\"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g,e=>{let t=\"json-num\";return/^\"/.test(e)?t=/:$/.test(e)?\"json-key\":\"json-str\":/true|false/.test(e)?t=\"json-bool\":/null/.test(e)&&(t=\"json-null\"),`<span class=\"${t}\">${e}</span>`}));"],["C:/visual proyectos/partidos/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"sidebar-toggle\"),e=document.getElementById(\"sidebar\"),t=document.getElementById(\"sidebar-overlay\");function l(){e?.classList.remove(\"-translate-x-full\"),t?.classList.remove(\"hidden\"),document.body.style.overflow=\"hidden\"}function d(){e?.classList.add(\"-translate-x-full\"),t?.classList.add(\"hidden\"),document.body.style.overflow=\"\"}n?.addEventListener(\"click\",()=>{e?.classList.contains(\"-translate-x-full\")?l():d()});t?.addEventListener(\"click\",d);document.querySelectorAll(\"#sidebar a\").forEach(s=>s.addEventListener(\"click\",d));"]],"assets":["/_astro/_code_.QYfWGC8j.css","/_astro/explorador.jw_N62m9.css","/_astro/client.nc8uITnr.js","/_astro/index.DK-fsZOb.js","/_astro/MatchCard.B21oNnV2.js","/_astro/MatchCard.U0Dn3qNd.js","/_astro/MatchesSection.rhbA4esS.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"llon46xnN94a1tJeJ/3OY5Hy6DzpSHCVD+GpnPC+HTE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
