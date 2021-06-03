!(function(o) {
    var a = function(a) {
            o(a.modalForm).on("submit", function(o) {
                    if (void 0 !== o.originalEvent && !1 === a.isDeleteForm)
                        return o.preventDefault(), n(a, t), !1;
                }),
                o(a.modalID).on("hidden.bs.modal", function(n) {
                    o(a.modalForm).remove();
                });
        },
        n = function(n, t) {
            o.ajax({
                type: o(n.modalForm).attr("method"),
                url: o(n.modalForm).attr("action"),
                data: new FormData(o(n.modalForm)[0]),
                contentType: !1,
                processData: !1,
                beforeSend: function() {
                    o(n.submitBtn).prop("disabled", !0);
                },
                success: function(e) {
                    o(e).find(n.errorClass).length > 0 ?
                        (o(n.modalID)
                            .find(n.modalContent)
                            .html(e),
                            o(n.modalForm).attr("action", n.formURL),
                            a(n)) :
                        t(n);
                },
            });
        },
        t = function(n) {
            if (n.asyncUpdate) {
                if (e(n.asyncSettings)) {
                    var t = n.asyncSettings,
                        s = new FormData(o(n.modalForm)[0]);
                    s.append("asyncUpdate", "True"),
                        o.ajax({
                            type: o(n.modalForm).attr("method"),
                            url: o(n.modalForm).attr("action"),
                            data: s,
                            contentType: !1,
                            processData: !1,
                            success: function(e) {
                                var s = o("body");
                                0 === s.length &&
                                    console.error(
                                        "django-bootstrap-modal-forms: <body> element missing in your html."
                                    ),
                                    s.prepend(t.successMessage),
                                    o.ajax({
                                        type: "GET",
                                        url: t.dataUrl,
                                        dataType: "json",
                                        success: function(e) {
                                            o(t.dataElementId).html(e[t.dataKey]),
                                                t.addModalFormFunction && t.addModalFormFunction(),
                                                t.closeOnSubmit ?
                                                o(n.modalID).modal("hide") :
                                                o(n.modalID)
                                                .find(n.modalContent)
                                                .load(n.formURL, function() {
                                                    o(n.modalForm).attr("action", n.formURL), a(n);
                                                });
                                        },
                                    });
                            },
                        });
                }
            } else o(n.modalForm).submit();
        },
        e = function(o) {
            var a = [];
            return (
                o.successMessage ||
                (a.push("successMessage"),
                    console.error(
                        "django-bootstrap-modal-forms: 'successMessage' in asyncSettings is missing."
                    )),
                o.dataUrl ||
                (a.push("dataUrl"),
                    console.error(
                        "django-bootstrap-modal-forms: 'dataUrl' in asyncSettings is missing."
                    )),
                o.dataElementId ||
                (a.push("dataElementId"),
                    console.error(
                        "django-bootstrap-modal-forms: 'dataElementId' in asyncSettings is missing."
                    )),
                o.dataKey ||
                (a.push("dataKey"),
                    console.error(
                        "django-bootstrap-modal-forms: 'dataKey' in asyncSettings is missing."
                    )),
                o.addModalFormFunction ||
                (a.push("addModalFormFunction"),
                    console.error(
                        "django-bootstrap-modal-forms: 'addModalFormFunction' in asyncSettings is missing."
                    )), !(a.length > 0)
            );
        };
    o.fn.modalForm = function(n) {
        var t = o.extend({
                modalID: "#modal",
                modalContent: ".modal-content",
                modalForm: ".modal-content form",
                formURL: null,
                isDeleteForm: !1,
                errorClass: ".invalid",
                asyncUpdate: !1,
                asyncSettings: {
                    closeOnSubmit: !1,
                    successMessage: null,
                    dataUrl: null,
                    dataElementId: null,
                    dataKey: null,
                    addModalFormFunction: null,
                },
            },
            n
        );
        return (
            this.each(function() {
                o(this).click(function(n) {
                    !(function(n) {
                        o(n.modalID)
                            .find(n.modalContent)
                            .load(n.formURL, function() {
                                o(n.modalID).modal("show"),
                                    o(n.modalForm).attr("action", n.formURL),
                                    a(n);
                            });
                    })(t);
                });
            }),
            this
        );
    };
})(jQuery);