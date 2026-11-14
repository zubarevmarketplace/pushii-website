import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const code = await readFile('public/analytics.js', 'utf8');
const key = 'pushii-analytics-consent-v1';
function scenario(saved, { blocked = false, origin = 'https://mypushii.ru' } = {}) {
  const nodes = new Map();
  const requests = [], calls = [], cookies = [];
  const docListeners = {}, windowListeners = {};
  const store = new Map(saved ? [[key, JSON.stringify(saved)]] : []);
  class Element {
    constructor() { this.handlers = {}; this.dataset = {}; this.hidden = true; }
    addEventListener(name, callback) { this.handlers[name] = callback; }
    focus() {}
    remove() {}
    closest(selector) { return this.parents?.[selector] || null; }
    getAttribute(name) { return this[name]; }
  }
  class HTMLDetailsElement extends Element {}
  const node = id => { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); };
  node('analytics-controls').dataset = { counter: '114252778', origin: 'https://mypushii.ru' };
  const document = {
    referrer: 'https://example.com/source?private=value',
    documentElement: { scrollHeight: 2000 },
    getElementById: node,
    createElement: () => new Element(),
    head: { append: script => requests.push(script) },
    addEventListener: (name, fn) => { docListeners[name] = fn; },
    get cookie() { return '_ym_uid=test; ordinary_cookie=keep'; },
    set cookie(value) { cookies.push(value); },
  };
  const localStorage = {
    getItem: name => { if (blocked) throw Error('blocked'); return store.get(name) || null; },
    setItem: (name, value) => { if (blocked) throw Error('blocked'); store.set(name, value); },
    removeItem: name => store.delete(name), key: i => [...store.keys()][i], get length() { return store.size; },
  };
  const window = { addEventListener: (name, fn) => { windowListeners[name] = fn; }, innerHeight: 800, scrollY: 1000 };
  runInNewContext(code, { document, window, localStorage, location: { origin, hostname: 'mypushii.ru', href: origin + '/?private=value' }, Element, HTMLDetailsElement, URL });
  return {
    requests, calls, cookies, store, nodes,
    click: id => node(id).handlers.click(),
    loaded() { window.ym = (...args) => calls.push(args); requests.at(-1).onload(); },
    scroll: () => windowListeners.scroll(),
    storage: saved => windowListeners.storage({ key, newValue: saved ? JSON.stringify(saved) : null }),
    details(parent, open) { const el = new HTMLDetailsElement(); el.open = open; el.parents = { [parent]: true }; docListeners.toggle({ target: el }); },
    contact() { const el = new Element(); el.href = 'mailto:test@example.com'; el.parents = { a: el }; docListeners.click({ target: el }); },
  };
}
const valid = value => ({ value, expires: Date.now() + 60000 });
let s = scenario();
assert.equal(s.requests.length, 0, 'No third-party request before consent');
assert.equal(s.nodes.get('analytics-consent').hidden, false);
s.click('analytics-reject'); s.scroll(); s.contact();
assert.equal(s.requests.length, 0, 'Reject does not load a tracker');
assert.equal(s.calls.length, 0);
assert.equal(JSON.parse(s.store.get(key)).value, 'rejected');
s.click('analytics-settings'); s.click('analytics-accept');
assert.equal(s.requests.length, 1);
s.loaded();
assert.equal(s.calls[0][1], 'init');
assert.equal(s.calls[0][2].url, 'https://mypushii.ru/');
assert.equal(s.calls[0][2].referrer, 'https://example.com/source');
s.scroll(); s.scroll(); s.details('#questions', false); s.details('#questions', true); s.details('#care', true); s.contact();
assert.deepEqual(s.calls.filter(c => c[1] === 'reachGoal').map(c => c[2]), ['scroll_75', 'view_faq', 'open_product_details', 'click_contact']);
s.click('analytics-reject');
assert.equal(s.calls.at(-1)[1], 'destruct');
const count = s.calls.length; s.scroll(); s.contact();
assert.equal(s.calls.length, count, 'No goals after withdrawal');
assert.ok(s.cookies.length && s.cookies.every(c => c.startsWith('_ym_uid=')), 'Only analytics cookies removed');
s = scenario(); s.click('analytics-accept'); s.click('analytics-reject'); s.loaded();
assert.equal(s.calls.length, 0, 'Revoke while tag is in flight must not initialize');
assert.equal(scenario(valid('rejected')).requests.length, 0);
s = scenario(valid('accepted')); assert.equal(s.requests.length, 1); s.loaded(); assert.equal(s.calls.length, 1);
s.storage(valid('rejected')); assert.equal(s.calls.at(-1)[1], 'destruct');
assert.equal(scenario({ value: 'accepted', expires: 1 }).requests.length, 0, 'Expired consent does not start tracking');
s = scenario(null, { blocked: true }); s.click('analytics-accept'); s.loaded(); s.click('analytics-reject'); assert.equal(s.calls.at(-1)[1], 'destruct');
s = scenario(valid('accepted'), { origin: 'http://127.0.0.1:3001' }); assert.equal(s.requests.length, 0, 'Preview does not pollute production analytics');
console.log('PASS: consent, rejection, persistence, expiration, blocked storage, withdrawal race, cross-tab withdrawal, goals and preview isolation.');
