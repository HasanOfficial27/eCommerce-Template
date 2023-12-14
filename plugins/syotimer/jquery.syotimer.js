!(function (e) {
  var t = "day",
    i = "hour",
    n = "minute",
    o = "second",
    r = 86400,
    a = 3600,
    s = 60,
    d = { d: t, h: i, m: n, s: o },
    l = {
      list: [o, n, i, t],
      next: function (e) {
        var t = this.list.indexOf(e);
        return t < this.list.length && this.list[t + 1];
      },
      prev: function (e) {
        var t = this.list.indexOf(e);
        return t > 0 && this.list[t - 1];
      },
    },
    u = {
      year: 2014,
      month: 7,
      day: 31,
      hour: 0,
      minute: 0,
      second: 0,
      timeZone: "local",
      ignoreTransferTime: !1,
      layout: "dhms",
      periodic: !1,
      periodInterval: 7,
      periodUnit: "d",
      doubleNumbers: !0,
      effectType: "none",
      lang: "eng",
      headTitle: "",
      footTitle: "",
      afterDeadline: function (e) {
        e.bodyBlock.html(
          '<p style="font-size: 1.2em;">The countdown is finished!</p>'
        );
      },
    },
    m = { second: !1, minute: !1, hour: !1, day: !1 },
    c = {
      init: function (t) {
        var i = e.extend({}, u, t || {});
        (i.itemTypes = y.getItemTypesByLayout(i.layout)),
          (i._itemsHas = e.extend({}, m));
        for (var n = 0; n < i.itemTypes.length; n++)
          i._itemsHas[i.itemTypes[n]] = !0;
        return this.each(function () {
          var t = e(this);
          t.data("syotimer-options", i),
            c._render.apply(this, []),
            c._perSecondHandler.apply(this, []);
        });
      },
      _render: function () {
        for (
          var t = e(this),
            i = t.data("syotimer-options"),
            n = y.getTimerItem(),
            o = e("<div/>", { class: "syotimer__head" }).html(i.headTitle),
            r = e("<div/>", { class: "syotimer__body" }),
            a = e("<div/>", { class: "syotimer__footer" }).html(i.footTitle),
            s = {},
            d = 0;
          d < i.itemTypes.length;
          d++
        ) {
          var l = n.clone();
          l.addClass("syotimer-cell_type_" + i.itemTypes[d]),
            r.append(l),
            (s[i.itemTypes[d]] = l);
        }
        var u = { headBlock: o, bodyBlock: r, footBlock: a };
        t.data("syotimer-blocks", u)
          .data("syotimer-items", s)
          .addClass("syotimer")
          .append(o)
          .append(r)
          .append(a);
      },
      _perSecondHandler: function () {
        var t = e(this),
          i = t.data("syotimer-options");
        e(".syotimer-cell > .syotimer-cell__value", t).css("opacity", 1);
        var n = new Date(),
          o = new Date(i.year, i.month - 1, i.day, i.hour, i.minute, i.second),
          r = y.getDifferenceWithTimezone(n, o, i),
          a = y.getSecondsToDeadLine(r, i);
        a >= 0
          ? (c._refreshUnitsDom.apply(this, [a]),
            c._applyEffectSwitch.apply(this, [i.effectType]))
          : ((t = e.extend(t, t.data("syotimer-blocks"))), i.afterDeadline(t));
      },
      _refreshUnitsDom: function (i) {
        var n = e(this),
          o = n.data("syotimer-options"),
          r = n.data("syotimer-items"),
          a = o.itemTypes,
          s = y.getUnitsToDeadLine(i);
        o._itemsHas.day || (s.hour += 24 * s.day),
          o._itemsHas.hour || (s.minute += 60 * s.hour),
          o._itemsHas.minute || (s.second += 60 * s.minute);
        for (var d = 0; d < a.length; d++) {
          var l = a[d],
            u = s[l],
            m = r[l];
          m.data("syotimer-unit-value", u),
            e(".syotimer-cell__value", m).html(
              y.format2(u, l !== t && o.doubleNumbers)
            ),
            e(".syotimer-cell__unit", m).html(
              e.syotimerLang.getNumeral(u, o.lang, l)
            );
        }
      },
      _applyEffectSwitch: function (t, i) {
        i = i || o;
        var n = this,
          r = e(n);
        if ("none" === t)
          setTimeout(function () {
            c._perSecondHandler.apply(n, []);
          }, 1e3);
        else if ("opacity" === t) {
          var a = r.data("syotimer-items"),
            s = a[i];
          if (s) {
            var d = l.next(i),
              u = s.data("syotimer-unit-value");
            e(".syotimer-cell__value", s).animate(
              { opacity: 0.1 },
              1e3,
              "linear",
              function () {
                c._perSecondHandler.apply(n, []);
              }
            ),
              d && 0 === u && c._applyEffectSwitch.apply(n, [t, d]);
          }
        }
      },
    },
    y = {
      getTimerItem: function () {
        var t = e("<div/>", { class: "syotimer-cell__value", text: "0" }),
          i = e("<div/>", { class: "syotimer-cell__unit" }),
          n = e("<div/>", { class: "syotimer-cell" });
        return n.append(t).append(i), n;
      },
      getItemTypesByLayout: function (e) {
        for (var t = [], i = 0; i < e.length; i++) t.push(d[e[i]]);
        return t;
      },
      getSecondsToDeadLine: function (e, t) {
        var i,
          n = e / 1e3;
        if (((n = Math.floor(n)), t.periodic)) {
          var o,
            r,
            a = y.getPeriodUnit(t.periodUnit),
            s = e / (1e3 * a);
          (s = Math.ceil(s)),
            (s = Math.abs(s)),
            n >= 0
              ? ((r = s % t.periodInterval),
                (r = 0 === r ? t.periodInterval : r),
                (r -= 1))
              : (r = t.periodInterval - (s % t.periodInterval)),
            (o = n % a),
            0 === o && n < 0 && r--,
            (i = Math.abs(r * a + o));
        } else i = n;
        return i;
      },
      getUnitsToDeadLine: function (e) {
        var i = t,
          n = {};
        do {
          var o = y.getPeriodUnit(i);
          (n[i] = Math.floor(e / o)), (e %= o);
        } while ((i = l.prev(i)));
        return n;
      },
      getPeriodUnit: function (e) {
        switch (e) {
          case "d":
          case t:
            return r;
          case "h":
          case i:
            return a;
          case "m":
          case n:
            return s;
          case "s":
          case o:
            return 1;
        }
      },
      getDifferenceWithTimezone: function (e, t, o) {
        var r,
          a = t.getTime() - e.getTime(),
          s = 0,
          d = 0;
        if ("local" !== o.timeZone) {
          var l = parseFloat(o.timeZone) * y.getPeriodUnit(i),
            u = -e.getTimezoneOffset() * y.getPeriodUnit(n);
          s = 1e3 * (l - u);
        }
        if (o.ignoreTransferTime) {
          var m = -e.getTimezoneOffset() * y.getPeriodUnit(n),
            c = -t.getTimezoneOffset() * y.getPeriodUnit(n);
          d = 1e3 * (m - c);
        }
        return (r = s + d), a - r;
      },
      format2: function (e, t) {
        return (t = t !== !1), e <= 9 && t ? "0" + e : "" + e;
      },
    },
    p = {
      setOption: function (t, i) {
        var n = e(this),
          o = n.data("syotimer-options");
        o.hasOwnProperty(t) && ((o[t] = i), n.data("syotimer-options", o));
      },
    };
  (e.fn.syotimer = function (t) {
    if ("string" == typeof t && "setOption" === t) {
      var i = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        p[t].apply(this, i);
      });
    }
    return null === t || "object" == typeof t
      ? c.init.apply(this, [t])
      : void e.error("SyoTimer. Error in call methods: methods is not exist");
  }),
    (e.syotimerLang = {
      rus: {
        second: ["ÑÐµÐºÑƒÐ½Ð´Ð°", "ÑÐµÐºÑƒÐ½Ð´Ñ‹", "ÑÐµÐºÑƒÐ½Ð´"],
        minute: ["Ð¼Ð¸Ð½ÑƒÑ‚Ð°", "Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹", "Ð¼Ð¸Ð½ÑƒÑ‚"],
        hour: ["Ñ‡Ð°Ñ", "Ñ‡Ð°ÑÐ°", "Ñ‡Ð°ÑÐ¾Ð²"],
        day: ["Ð´ÐµÐ½ÑŒ", "Ð´Ð½Ñ", "Ð´Ð½ÐµÐ¹"],
        handler: "rusNumeral",
      },
      eng: {
        second: ["second", "seconds"],
        minute: ["minute", "minutes"],
        hour: ["hour", "hours"],
        day: ["day", "days"],
      },
      por: {
        second: ["segundo", "segundos"],
        minute: ["minuto", "minutos"],
        hour: ["hora", "horas"],
        day: ["dia", "dias"],
      },
      spa: {
        second: ["segundo", "segundos"],
        minute: ["minuto", "minutos"],
        hour: ["hora", "horas"],
        day: ["dÃ­a", "dÃ­as"],
      },
      heb: {
        second: ["×©× ×™×”", "×©× ×™×•×ª"],
        minute: ["×“×§×”", "×“×§×•×ª"],
        hour: ["×©×¢×”", "×©×¢×•×ª"],
        day: ["×™×•×", "×™×ž×™×"],
      },
      universal: function (e) {
        return 1 === e ? 0 : 1;
      },
      rusNumeral: function (e) {
        var t,
          i = [2, 0, 1, 1, 1, 2];
        return (t =
          e % 100 > 4 && e % 100 < 20 ? 2 : i[e % 10 < 5 ? e % 10 : 5]);
      },
      getNumeral: function (t, i, n) {
        var o = e.syotimerLang[i].handler || "universal",
          r = this[o](t);
        return e.syotimerLang[i][n][r];
      },
    });
})(jQuery);