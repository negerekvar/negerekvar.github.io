/*! jQuery UI - v1.12.1 - 2016-09-15
 * http://jqueryui.com
 * Copyright jQuery Foundation and other contributors; Licensed  */
! function(a) { "function" == typeof define && define.amd ? define(["jquery", "./version"], a) : a(jQuery) }(function(a) {
    return function() {
        function b(a, b, c) {
            return [parseFloat(a[0]) * (l.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (l.test(a[1]) ? c / 100 : 1)] }

        function c(b, c) {
            return parseInt(a.css(b, c), 10) || 0 }

        function d(b) {
            var c = b[0];
            return 9 === c.nodeType ? { width: b.width(), height: b.height(), offset: { top: 0, left: 0 } } : a.isWindow(c) ? { width: b.width(), height: b.height(), offset: { top: b.scrollTop(), left: b.scrollLeft() } } : c.preventDefault ? { width: 0, height: 0, offset: { top: c.pageY, left: c.pageX } } : { width: b.outerWidth(), height: b.outerHeight(), offset: b.offset() } }
        var e, f = Math.max,
            g = Math.abs,
            h = /left|center|right/,
            i = /top|center|bottom/,
            j = /[\+\-]\d+(\.[\d]+)?%?/,
            k = /^\w+/,
            l = /%$/,
            m = a.fn.position;
        a.position = { scrollbarWidth: function() {
                if (void 0 !== e) return e;
                var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    f = d.children()[0];
                return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c }, getScrollInfo: function(b) {
                var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                    d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                    e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                    f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
                return { width: f ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0 } }, getWithinInfo: function(b) {
                var c = a(b || window),
                    d = a.isWindow(c[0]),
                    e = !!c[0] && 9 === c[0].nodeType,
                    f = !d && !e;
                return { element: c, isWindow: d, isDocument: e, offset: f ? a(b).offset() : { left: 0, top: 0 }, scrollLeft: c.scrollLeft(), scrollTop: c.scrollTop(), width: c.outerWidth(), height: c.outerHeight() } } }, a.fn.position = function(e) {
            if (!e || !e.of) return m.apply(this, arguments);
            e = a.extend({}, e);
            var l, n, o, p, q, r, s = a(e.of),
                t = a.position.getWithinInfo(e.within),
                u = a.position.getScrollInfo(t),
                v = (e.collision || "flip").split(" "),
                w = {};
            return r = d(s), s[0].preventDefault && (e.at = "left top"), n = r.width, o = r.height, p = r.offset, q = a.extend({}, p), a.each(["my", "at"], function() {
                var a, b, c = (e[this] || "").split(" ");
                1 === c.length && (c = h.test(c[0]) ? c.concat(["center"]) : i.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = h.test(c[0]) ? c[0] : "center", c[1] = i.test(c[1]) ? c[1] : "center", a = j.exec(c[0]), b = j.exec(c[1]), w[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [k.exec(c[0])[0], k.exec(c[1])[0]] }), 1 === v.length && (v[1] = v[0]), "right" === e.at[0] ? q.left += n : "center" === e.at[0] && (q.left += n / 2), "bottom" === e.at[1] ? q.top += o : "center" === e.at[1] && (q.top += o / 2), l = b(w.at, n, o), q.left += l[0], q.top += l[1], this.each(function() {
                var d, h, i = a(this),
                    j = i.outerWidth(),
                    k = i.outerHeight(),
                    m = c(this, "marginLeft"),
                    r = c(this, "marginTop"),
                    x = j + m + c(this, "marginRight") + u.width,
                    y = k + r + c(this, "marginBottom") + u.height,
                    z = a.extend({}, q),
                    A = b(w.my, i.outerWidth(), i.outerHeight()); "right" === e.my[0] ? z.left -= j : "center" === e.my[0] && (z.left -= j / 2), "bottom" === e.my[1] ? z.top -= k : "center" === e.my[1] && (z.top -= k / 2), z.left += A[0], z.top += A[1], d = { marginLeft: m, marginTop: r }, a.each(["left", "top"], function(b, c) { a.ui.position[v[b]] && a.ui.position[v[b]][c](z, { targetWidth: n, targetHeight: o, elemWidth: j, elemHeight: k, collisionPosition: d, collisionWidth: x, collisionHeight: y, offset: [l[0] + A[0], l[1] + A[1]], my: e.my, at: e.at, within: t, elem: i }) }), e.using && (h = function(a) {
                    var b = p.left - z.left,
                        c = b + n - j,
                        d = p.top - z.top,
                        h = d + o - k,
                        l = { target: { element: s, left: p.left, top: p.top, width: n, height: o }, element: { element: i, left: z.left, top: z.top, width: j, height: k }, horizontal: c < 0 ? "left" : b > 0 ? "right" : "center", vertical: h < 0 ? "top" : d > 0 ? "bottom" : "middle" };
                    n < j && g(b + c) < n && (l.horizontal = "center"), o < k && g(d + h) < o && (l.vertical = "middle"), f(g(b), g(c)) > f(g(d), g(h)) ? l.important = "horizontal" : l.important = "vertical", e.using.call(this, a, l) }), i.offset(a.extend(z, { using: h })) }) }, a.ui.position = { fit: { left: function(a, b) {
                    var c, d = b.within,
                        e = d.isWindow ? d.scrollLeft : d.offset.left,
                        g = d.width,
                        h = a.left - b.collisionPosition.marginLeft,
                        i = e - h,
                        j = h + b.collisionWidth - g - e;
                    b.collisionWidth > g ? i > 0 && j <= 0 ? (c = a.left + i + b.collisionWidth - g - e, a.left += i - c) : j > 0 && i <= 0 ? a.left = e : i > j ? a.left = e + g - b.collisionWidth : a.left = e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = f(a.left - h, a.left) }, top: function(a, b) {
                    var c, d = b.within,
                        e = d.isWindow ? d.scrollTop : d.offset.top,
                        g = b.within.height,
                        h = a.top - b.collisionPosition.marginTop,
                        i = e - h,
                        j = h + b.collisionHeight - g - e;
                    b.collisionHeight > g ? i > 0 && j <= 0 ? (c = a.top + i + b.collisionHeight - g - e, a.top += i - c) : j > 0 && i <= 0 ? a.top = e : i > j ? a.top = e + g - b.collisionHeight : a.top = e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = f(a.top - h, a.top) } }, flip: { left: function(a, b) {
                    var c, d, e = b.within,
                        f = e.offset.left + e.scrollLeft,
                        h = e.width,
                        i = e.isWindow ? e.scrollLeft : e.offset.left,
                        j = a.left - b.collisionPosition.marginLeft,
                        k = j - i,
                        l = j + b.collisionWidth - h - i,
                        m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                        n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                        o = -2 * b.offset[0];
                    k < 0 ? (c = a.left + m + n + o + b.collisionWidth - h - f, (c < 0 || c < g(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || g(d) < l) && (a.left += m + n + o)) }, top: function(a, b) {
                    var c, d, e = b.within,
                        f = e.offset.top + e.scrollTop,
                        h = e.height,
                        i = e.isWindow ? e.scrollTop : e.offset.top,
                        j = a.top - b.collisionPosition.marginTop,
                        k = j - i,
                        l = j + b.collisionHeight - h - i,
                        m = "top" === b.my[1],
                        n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                        o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                        p = -2 * b.offset[1];
                    k < 0 ? (d = a.top + n + o + p + b.collisionHeight - h - f, (d < 0 || d < g(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, (c > 0 || g(c) < l) && (a.top += n + o + p)) } }, flipfit: { left: function() { a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments) }, top: function() { a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments) } } } }(), a.ui.position });
