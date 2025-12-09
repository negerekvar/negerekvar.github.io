// Lightweight helpers to avoid jQuery while keeping the existing call sites working.
// @ts-nocheck

function $(selector) {
    const el = document.querySelector(selector);
    return {
        width: () => (el instanceof HTMLElement ? el.clientWidth : window.innerWidth),
        height: () => (el instanceof HTMLElement ? el.clientHeight : window.innerHeight),
        text: (value) => {
            if (el) el.textContent = String(value);
        }
    };
}

function getContainerSize() {
    const el = document.getElementById("myContainer");
    return {
        w: el?.clientWidth ?? window.innerWidth,
        h: el?.clientHeight ?? window.innerHeight
    };
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
}

// Provide a minimal QuickSettings fallback when the CDN cannot be reached,
// so sketches keep running and controls remain usable.
if (typeof window !== "undefined" && !window.QuickSettings) {
    class BasicPanel {
        constructor(x = 10, y = 10, title = "Panel") {
            this.values = {};
            this.callbacks = {};
            this.inputs = new Map();
        this.container = document.createElement("div");
        this.container.className = "qs_main qs_fallback";
        Object.assign(this.container.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
            padding: "10px",
            background: "rgba(20,20,20,0.75)",
            color: "#fff",
            font: "14px sans-serif",
            borderRadius: "6px",
            minWidth: "200px",
            zIndex: "9999"
        });
        const header = document.createElement("div");
        header.className = "qs_titlebar";
        header.textContent = title;
        header.style.fontWeight = "bold";
        header.style.marginBottom = "8px";
            this.container.appendChild(header);
            document.body.appendChild(this.container);
        }
        setSize(w, h) {
            if (w) this.container.style.width = `${w}px`;
            if (h) this.container.style.height = `${h}px`;
        }
        addHTML(key, html) {
            const div = document.createElement("div");
            div.dataset.key = key;
            div.innerHTML = html;
            div.style.marginBottom = "6px";
            this.container.appendChild(div);
            this.values[key] = html;
            return this;
        }
        addText(label, def = "", fn = () => undefined) {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
            wrapper.style.marginBottom = "6px";
            const top = document.createElement("div");
            top.textContent = label;
            const input = document.createElement("input");
            input.type = "text";
            input.value = def;
            input.oninput = () => {
                this.values[label] = input.value;
                fn(input.value);
            };
            wrapper.appendChild(top);
            wrapper.appendChild(input);
            this.container.appendChild(wrapper);
            this.values[label] = def;
            this.inputs.set(label, input);
            this.callbacks[label] = fn;
            return this;
        }
        addButton(label, fn = () => undefined) {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.onclick = () => fn();
            btn.style.marginBottom = "6px";
            this.container.appendChild(btn);
            return this;
        }
        addBoolean(label, def = false, fn = () => undefined) {
            const wrapper = document.createElement("label");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.gap = "6px";
            wrapper.style.marginBottom = "6px";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = !!def;
            input.onchange = () => {
                this.values[label] = input.checked;
                fn(input.checked);
            };
            wrapper.appendChild(input);
            const span = document.createElement("span");
            span.textContent = label;
            wrapper.appendChild(span);
            this.container.appendChild(wrapper);
            this.values[label] = !!def;
            this.inputs.set(label, input);
            this.callbacks[label] = fn;
            return this;
        }
        bindBoolean(label, def = false, obj) {
            return this.addBoolean(label, def, (val) => {
                if (obj) obj[label] = val;
            });
        }
        addRange(label, min, max, val, step = 1, fn = () => undefined) {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
            wrapper.style.marginBottom = "6px";
            const top = document.createElement("div");
            top.textContent = `${label}: ${val}`;
            const input = document.createElement("input");
            input.type = "range";
            input.min = String(min);
            input.max = String(max);
            input.step = String(step);
            input.value = String(val);
            input.oninput = () => {
                const v = Number(input.value);
                this.values[label] = v;
                top.textContent = `${label}: ${v}`;
                fn(v);
            };
            wrapper.appendChild(top);
            wrapper.appendChild(input);
            this.container.appendChild(wrapper);
            this.values[label] = val;
            this.inputs.set(label, input);
            this.callbacks[label] = fn;
            return this;
        }
        bindRange(label, min, max, val, step = 1, obj) {
            return this.addRange(label, min, max, val, step, (v) => {
                if (obj) obj[label] = v;
            });
        }
        setKey(key) {
            window.addEventListener("keydown", (e) => {
                if (e.key.toLowerCase() === String(key).toLowerCase()) {
                    const visible = this.container.style.display !== "none";
                    this.container.style.display = visible ? "none" : "block";
                }
            });
            return this;
        }
        setValue(key, val) {
            this.values[key] = val;
            const input = this.inputs.get(key);
            if (input) {
                input.value = String(val);
                if (input.type === "checkbox") input.checked = !!val;
                const cb = this.callbacks[key];
                cb && cb(val);
            }
        }
        getValue(key) {
            return this.values[key];
        }
        hideAllTitles() {
            // For parity; titles are minimal already.
            return this;
        }
        saveInLocalStorage() {
            /* no-op fallback */
        }
    }
    window.QuickSettings = {
        create: (x, y, title) => new BasicPanel(x, y, title)
    };
}
