// Tiny SVG string helpers for dashboard.mjs. GitHub strips CSS/JS from Markdown but renders SVG
// images, so the dashboard's visuals are plain SVG files — one per theme, swapped by <picture>.

export const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`

// GitHub Primer colours, so the images sit naturally on github.com in either theme.
export const THEMES = {
    light: {
        surface: '#f6f8fa', border: '#d0d7de', text: '#1f2328', muted: '#656d76', track: '#e6eaef',
        accent: '#0969da', good: '#1a7f37', warn: '#9a6700', bad: '#cf222e',
        series: ['#0969da', '#8250df', '#1a7f37', '#bf8700', '#1b7c83', '#bc4c00', '#6e7781', '#cf222e']
    },
    dark: {
        surface: '#161b22', border: '#30363d', text: '#e6edf3', muted: '#9198a1', track: '#262c36',
        accent: '#4493f8', good: '#3fb950', warn: '#d29922', bad: '#f85149',
        series: ['#4493f8', '#a371f7', '#3fb950', '#d29922', '#39c5cf', '#db6d28', '#9198a1', '#f85149']
    }
}

export function esc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// No font metrics without a renderer — an average glyph width is close enough to keep text in bounds.
export function fit(value, size, maxWidth) {
    const s = String(value ?? '')
    const max = Math.floor(maxWidth / (size * 0.56))
    return s.length <= max ? s : s.slice(0, Math.max(0, max - 1)).trimEnd() + '…'
}

export function svg(width, height, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${FONT}">\n${body}\n</svg>\n`
}

export function rect(x, y, w, h, fill, {r = 0, stroke = null, dash = null, opacity = null} = {}) {
    return `<rect x="${x}" y="${y}" width="${Math.max(0, w)}" height="${h}" rx="${r}" fill="${fill}"`
        + (stroke ? ` stroke="${stroke}"` : '')
        + (dash ? ` stroke-dasharray="${dash}"` : '')
        + (opacity !== null ? ` fill-opacity="${opacity}"` : '')
        + '/>'
}

export function text(x, y, value, fill, {size = 13, weight = 400, anchor = 'start', spacing = null} = {}) {
    return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"`
        + (spacing !== null ? ` letter-spacing="${spacing}"` : '')
        + `>${esc(value)}</text>`
}

export function card(x, y, w, h, t) {
    return rect(x + 0.5, y + 0.5, w - 1, h - 1, t.surface, {r: 10, stroke: t.border})
}

// Progress ring: `ratio` of the circumference drawn from 12 o'clock.
export function ring(cx, cy, radius, ratio, color, track, width = 8) {
    const c = 2 * Math.PI * radius
    const on = Math.max(0, Math.min(1, ratio)) * c
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${track}" stroke-width="${width}"/>`
        + (on > 0 ? `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${color}" stroke-width="${width}"`
            + ` stroke-linecap="round" stroke-dasharray="${on.toFixed(2)} ${c.toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>` : '')
}

// One segment per item, `colorOf(item)` picks its fill.
export function segments(x, y, w, h, items, colorOf, gap = 3) {
    if (items.length === 0) return rect(x, y, w, h, 'none', {r: h / 2})
    const seg = (w - gap * (items.length - 1)) / items.length
    return items.map((item, i) => rect((x + i * (seg + gap)).toFixed(1), y, seg.toFixed(1), h, colorOf(item), {r: h / 2})).join('')
}
