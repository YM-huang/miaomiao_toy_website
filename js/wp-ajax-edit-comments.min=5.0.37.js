jQuery(document).ready(function () {
    function m(b) {
        a("body").append("<span class='aec-dropdown-container' id='aec-dropdown-container-" + b + "'>" + a("#aec-dropdown-" + b).html() + "</span>");
        a("#aec-dropdown-container-" + b).css("top", parseInt(a("#aec-dropdownlink-" + b).offset().top) + parseInt(a("#aec-dropdownlink-" + b).outerHeight()) + 5 + "px");
        a("#aec-dropdown-container-" + b).css("left", a("#aec-dropdownlink-" + b).offset().left);
        a("#aec-dropdownlink-text-" + b).text(wpajaxeditcomments.AEC_LessOptions);
        a("#aec-dropdownlink-" +
            b).removeAttr("onclick");
        !1 != a.support.noCloneEvent && (a("#aec-dropdownlink-" + b).removeClass("aec-dropdownlink"), a("#aec-dropdownlink-" + b).addClass("aec-dropdownlink-less"));
        a("#aec-dropdownlink-" + b).bind("click", function () {
            return !1
        });
        a("#aec-dropdown-container-" + b).slideDown("", function () {
            !1 == a.support.noCloneEvent && (a("#aec-dropdownlink-" + b).removeClass("aec-dropdownlink"), a("#aec-dropdownlink-" + b).addClass("aec-dropdownlink-less"));
            a("#aec-dropdown-container-" + b).focus();
            a("#aec-dropdownlink-" +
                b).unbind("mouseup");
            a("#aec-dropdownlink-" + b).bind("mouseup", function () {
                h(b);
                return !1
            });
            a("#aec-dropdown-container-" + b).focus()
        })
    }

    function h(b) {
        if (0 == a(".aec-dropdown-container").length) return !1;
        a("#aec-dropdownlink-text-" + b).text(wpajaxeditcomments.AEC_MoreOptions);
        a("#aec-dropdown-" + b).html(a("#aec-dropdown-container-" + b).html());
        a("#aec-dropdown-container-" + b).slideUp("", function () {
            a("#aec-dropdown-container-" + b).remove();
            a("#aec-dropdownlink-" + b).removeClass("aec-dropdownlink-less");
            a("#aec-dropdownlink-" +
                b).addClass("aec-dropdownlink");
            a("#aec-dropdownlink-" + b).unbind("blur");
            a("#aec-dropdown-container-" + b).unbind("blur");
            a("#aec-dropdown-container-" + b).unbind("mouseleave");
            a("#aec-dropdownlink-" + b).unbind("mouseup");
            a("#aec-dropdownlink-" + b).bind("mouseup", function () {
                m(b);
                return !1
            })
        })
    }

    function f(a) {
        var c = {};
        a = n(a.attr("href"));
        c.aecurl = a;
        c._ajax_nonce = a._wpnonce;
        c.cid = a.cid;
        c.pid = a.pid;
        c.action = a.action;
        return c
    }

    function j(b) {
        b = a(b);
        try {
            if (uagent = navigator.userAgent.toLowerCase(), -1 < uagent.search("iphone") ||
            -1 < uagent.search("ipod") || -1 < uagent.search("webkit") && -1 < uagent.search("series60") && -1 < uagent.search("symbian") || -1 < uagent.search("android") || -1 < uagent.search("windows ce") || -1 < uagent.search("blackberry") || -1 < uagent.search("palm")) return !0
        } catch (c) {
        }
        var d = f(b);
        h(d.cid);
        a("a#" + b.attr("id")).colorbox({
            iframe: !0,
            scrolling: !1,
            width: wpajaxeditcomments.AEC_colorbox_width,
            height: wpajaxeditcomments.AEC_colorbox_height,
            opacity: 0.6
        });
        return !1
    }

    function k(b, c) {
        "undefined" != typeof b.error ? alert(b.error) : (a("#edit-comment-admin-links" +
            c).html(b.comment_links), a("#comment-" + c + " .comment-count").html(b.approve_count), a(".spam-count").html(b.spam_count), a(".pending-count").html(b.moderation_count), a(".trash-count").html(b.trash_count), jQuery.ajaxeditcomments.undo_message(c, b.undo, !0))
    }

    function n(a) {
        var c = {}, d, e;
        if (!a) return c;
        d = a.split("?");
        d[1] && (a = d[1]);
        a = a.split("&");
        for (e in a) if (!jQuery.isFunction(a.hasOwnProperty) || a.hasOwnProperty(e)) d = a[e].split("="), c[d[0]] = d[1];
        return c
    }

    var a = jQuery;
    a.ajaxeditcomments = {
        init: function () {
            a.extend(a.ajaxeditcomments.vars,
                {timers: {}, timerObjs: {}});
            a(".edit-comment-admin-links").css("display", "block");
            a(".edit-comment-user-link").css("display", "block");
            a(".hidden").hide();
            a(".edit-comment-admin-links").show();
            a(".edit-comment-user-link").show();
            if ("1" == wpajaxeditcomments.AEC_CanScroll) {
                var b = "" + window.location;
                /(#[^-]*\-[^&]*)/.test(b) && (b = a("" + window.location.hash), b = b.offset().top, a("html,body").animate({scrollTop: b}, 1E3))
            }
            var c = a(".ajax-edit-time-left").length, d = [], e = 0;
            a(".ajax-edit-time-left").each(function () {
                data =
                    f(a(this).prev());
                data = a.extend(data, {
                    action: "getthetimeleft",
                    cid: data.cid,
                    pid: data.pid,
                    _ajax_nonce: data.nonce
                });
                data.action = "getthetimeleft";
                jQuery.post(ajaxurl, data, function (b) {
                    e += 1;
                    var g = b.cid;
                    if (!("undefined" != typeof b.error || "undefined" != typeof b.success)) {
                        var f = parseInt(b.minutes), h = parseInt(b.seconds);
                        b = a("#ajax-edit-time-left-" + b.cid);
                        g = {minutes: f, seconds: h, cid: g, element: b};
                        d[a(d).length] = g;
                        e == c && (l.timers = setInterval(function () {
                            jQuery.ajaxeditcomments.get_timer(d)
                        }, 1E3))
                    }
                }, "json")
            })
        }, delink: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_delinking, !1);
            jQuery.post(ajaxurl, c, function (b) {
                "undefined" != typeof b.error ? alert(b.error) : (a.ajaxeditcomments.update_comment("edit-comment" + c.cid, b.content), "" == b.comment_author_url && (a("#the-comment-list #comment-" + c.cid + " A:first").html(""), a(".aec-delink-" + c.cid + ",#delink-" + c.cid).hide(), a("#edit-author" + c.cid).html(a("#edit-author" + c.cid + " A").html()), jQuery.ajaxeditcomments.undo_message(c.cid, b.undo,
                    !0)))
            }, "json")
        }, move: function (b) {
            a(".aec-undo-span").html("");
            return j(a(b))
        }, edit: function (b) {
            a(".aec-undo-span").html("");
            return j(a(b))
        }, request_deletion: function (b) {
            a(".aec-undo-span").html("");
            return j(a(b))
        }, request_delete: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_Sure + " <a href='#' id='aecconfirmyes" + c.cid + "'>" + wpajaxeditcomments.AEC_Yes + "</a> - <a href='#' id='aecconfirmno" + c.cid + "'>" + wpajaxeditcomments.AEC_No +
                "</a>", !1);
            a("#aecconfirmyes" + c.cid).bind("click", function () {
                jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_deleting, !1);
                jQuery.post(ajaxurl, c, function (b) {
                    "undefined" != typeof b.error ? (a("#comment-undo-" + b.cid).html(""), alert(b.error)) : (a("#comment-undo-" + b.cid).html(wpajaxeditcomments.AEC_permdelete), a("#edit" + b.cid).unbind(), a("#edit-comment-user-link-" + b.cid).remove())
                }, "json");
                return !1
            });
            a("#aecconfirmno" + c.cid).bind("click", function () {
                jQuery.ajaxeditcomments.undo_message(c.cid,
                    "", !1);
                return !1
            });
            return !1
        }, email: function (b) {
            a(".aec-undo-span").html("");
            return j(a(b))
        }, blacklist_comment: function (b) {
            a(".aec-undo-span").html("");
            return j(a(b))
        }, approve: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_approving, !1);
            jQuery.post(ajaxurl, c, function (a) {
                k(a, c.cid)
            }, "json")
        }, spam: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_spamming,
                !1);
            jQuery.post(ajaxurl, c, function (a) {
                k(a, c.cid)
            }, "json")
        }, moderate: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_moderating, !1);
            jQuery.post(ajaxurl, c, function (a) {
                k(a, c.cid)
            }, "json")
        }, delete_comment: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_deleting, !1);
            jQuery.post(ajaxurl, c, function (b) {
                a(".aec-delete-" + c.cid).hide();
                a("#delete-" + c.cid).hide();
                k(b, c.cid);
                a("#edit-comment-admin-links" + c.cid).html("")
            }, "json")
        }, deleteperm_comment: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            h(c.cid);
            jQuery.ajaxeditcomments.undo_message(c.cid, wpajaxeditcomments.AEC_deleting, !1);
            jQuery.post(ajaxurl, c, function () {
                a("#comment-undo-" + c.cid).remove();
                a("#edit-comment-admin-links" + c.cid).html(wpajaxeditcomments.AEC_permdelete)
            }, "json")
        }, restore_comment: function (b) {
            a(".aec-undo-span").html("");
            b = a(b);
            var c = f(a(b));
            jQuery.ajaxeditcomments.undo_message(c.cid,
                wpajaxeditcomments.AEC_restoring, !1);
            jQuery.post(ajaxurl, c, function () {
                a("#comment-undo-" + c.cid).remove();
                a("#edit-comment-admin-links" + c.cid).html(wpajaxeditcomments.AEC_restored)
            }, "json")
        }, remove_comment: function (b) {
            var c = a("#comment-" + b);
            if (c.is("li") || c.is("div")) c.addClass("ajax-delete"), c.slideUp(1E3, function () {
                c.remove()
            })
        }, retrieve_element: function (b) {
            return a("#" + b)
        }, update_comment: function (b, c) {
            a("#" + b).html(c)
        }, update_author: function (b, c, d) {
            delinkid = b.match(/\d+$/)[0];
            "" == d || "http://" ==
            d ? (a(".aec-delink-" + delinkid + ",#delink-comment-" + delinkid).hide(), "" == c ? a("#" + b).html(wpajaxeditcomments.AEC_Anon) : a("#" + b).html(c)) : "" == c ? a("#" + b).html(wpajaxeditcomments.AEC_Anon) : (a("#" + b).html("<a href='" + d + "'>" + c + "</a>"), a(".aec-delink-" + delinkid + ",#delink-comment-" + delinkid).show())
        }, update_date_or_time: function (b, c) {
            a("#" + b).html(c)
        }, remove_element: function (b) {
            var c = a(b);
            if (c.is("li") || c.is("div")) c.addClass("ajax-unapprove"), c.slideUp(1E3, function () {
                c.remove()
            })
        }, undo_message: function (b, c,
                                   d) {
            a("#comment-undo-" + b).html(c);
            !0 == d && (a(".aec-undo-link").unbind("click"), a(".aec-undo-link").bind("click", function () {
                a("#comment-undo-" + b).html(wpajaxeditcomments.AEC_undoing);
                var c = a(this), d = f(a(c));
                a(".undo" + d.cid).parent().html("");
                d.action = "undo";
                jQuery.post(ajaxurl, d, function (b) {
                    if ("undefined" != typeof b.error) alert(b.error); else {
                        a("#comment-undo-" + d.cid).html(wpajaxeditcomments.AEC_undosuccess);
                        var c = b.comment_author, e = b.comment_author_url, f = b.comment_date;
                        jQuery.ajaxeditcomments.update_comment("edit-comment" +
                            d.cid, b.content);
                        jQuery.ajaxeditcomments.update_author("edit-author" + d.cid, c, e);
                        jQuery.ajaxeditcomments.update_date_or_time("aecdate" + d.cid, f);
                        a("#edit-comment-admin-links" + d.cid).html(b.comment_links);
                        a("#comment-" + d.cid + " .comment-count").html(b.approve_count);
                        a(".spam-count").html(b.spam_count);
                        a(".pending-count").html(b.moderation_count)
                    }
                }, "json");
                return !1
            }))
        }, dropdown: function (b) {
            b = a(b);
            b = n(b.attr("href"));
            m(b.cid);
            return !1
        }, vars: {}, get_timer: function (b) {
            var c = [];
            0 == a(b).length ? clearTimeout(l.timers) :
                (a(b).each(function () {
                    seconds = this.seconds - 1;
                    minutes = this.minutes;
                    element = this.element;
                    if (0 >= minutes && 0 >= seconds) {
                        a("#edit" + this.cid).unbind();
                        element.remove();
                        a("#edit-comment-user-link-" + this.cid).remove();
                        try {
                            if (void 0 != document.getElementById("cboxIframe")) {
                                var b = document.getElementById("cboxIframe"), e = b.contentWindow || b.contentDocument;
                                e.document && (e = e.document);
                                0 < a("#timer" + this.cid, e).length && jQuery.fn.colorbox.close()
                            }
                        } catch (f) {
                        }
                    } else {
                        c[a(c).length] = this;
                        0 > seconds && (minutes -= 1, seconds = 59);
                        var g = "";
                        1 <= minutes && (g = 2 <= minutes ? minutes + " " + wpajaxeditcomments.AEC_Minutes : minutes + " " + wpajaxeditcomments.AEC_Minute, 0 < seconds && (g += " " + wpajaxeditcomments.AEC_And + " "));
                        0 < seconds && (g = 2 <= seconds ? g + (seconds + " " + wpajaxeditcomments.AEC_Seconds) : g + (seconds + " " + wpajaxeditcomments.AEC_Second));
                        try {
                            void 0 != document.getElementById("cboxIframe") && (b = document.getElementById("cboxIframe"), e = b.contentWindow || b.contentDocument, e.document && (e = e.document), a("#timer" + this.cid, e).html("&nbsp;(" + g + ")"))
                        } catch (h) {
                        }
                        a("#ajax-edit-time-left-" +
                            this.cid).html("&nbsp;(" + g + ")");
                        this.seconds = seconds;
                        this.minutes = minutes
                    }
                }), clearTimeout(l.timers), l.timers = setInterval(function () {
                    jQuery.ajaxeditcomments.get_timer(c)
                }, 1E3))
        }
    };
    var l = a.ajaxeditcomments.vars;
    a.ajaxeditcomments.init()
});