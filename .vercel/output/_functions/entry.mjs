import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_5p7bKJIl.mjs';
import { manifest } from './manifest_vxWdML9A.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/fixture/_id_/detail.astro.mjs');
const _page2 = () => import('./pages/api/fixture/_id_.astro.mjs');
const _page3 = () => import('./pages/api/match/_id_.astro.mjs');
const _page4 = () => import('./pages/clasificacion/_code_/goleadores.astro.mjs');
const _page5 = () => import('./pages/clasificacion/_code_/jornada/_day_.astro.mjs');
const _page6 = () => import('./pages/clasificacion/_code_.astro.mjs');
const _page7 = () => import('./pages/debug.astro.mjs');
const _page8 = () => import('./pages/equipo/_id_.astro.mjs');
const _page9 = () => import('./pages/explorador.astro.mjs');
const _page10 = () => import('./pages/jugador/_id_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/fixture/[id]/detail.ts", _page1],
    ["src/pages/api/fixture/[id].ts", _page2],
    ["src/pages/api/match/[id].ts", _page3],
    ["src/pages/clasificacion/[code]/goleadores.astro", _page4],
    ["src/pages/clasificacion/[code]/jornada/[day].astro", _page5],
    ["src/pages/clasificacion/[code].astro", _page6],
    ["src/pages/debug.astro", _page7],
    ["src/pages/equipo/[id].astro", _page8],
    ["src/pages/explorador.astro", _page9],
    ["src/pages/jugador/[id].astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "14932249-3fad-42ac-8757-9283bb5ce65c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
