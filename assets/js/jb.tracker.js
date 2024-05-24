
function CheckField_68M8J(fldName, frm) {
    var fldObj = document.getElementsByName(fldName);
    if (fldObj.length > 1) {
        for (var i = 0, l = fldObj.length; i < l; i++) {
            if (fldObj[0].type == 'select-one') {
                if (fldObj[i].selected && i == 0 && fldObj[i].value == '') {
                    return false;
                }
                if (fldObj[i].selected) {
                    return true;
                }
            } else {
                if (fldObj[i].checked) {
                    return true;
                }
            };
        }
        return false;
    } else {
        if (fldObj[0].type == "checkbox") {
            return (fldObj[0].checked);
        } else if (fldObj[0].type == "radio") {
            return (fldObj[0].checked);
        } else {
            fldObj[0].focus();
            return (fldObj[0].value.length > 0);
        }
    }
}

function rmspaces(x) {
    var leftx = 0;
    var rightx = x.length - 1;
    while (x.charAt(leftx) == ' ') {
        leftx++;
    }
    while (x.charAt(rightx) == ' ') {
        --rightx;
    }
    var q = x.substr(leftx, rightx - leftx + 1);
    if ((leftx == x.length) && (rightx == -1)) {
        q = '';
    }
    return (q);
}

function checkfield(data) {
    if (rmspaces(data) == "") {
        return false;
    } else {
        return true;
    }
}

function isemail(data) {
    var flag = false;
    if (data.indexOf("@", 0) == -1 || data.indexOf("\\", 0) != -1 || data.indexOf("/", 0) != -1 || !checkfield(data) || data.indexOf(".", 0) == -1 || data.indexOf("@") == 0 || data.lastIndexOf(".") < data.lastIndexOf("@") || data.lastIndexOf(".") == (data.length - 1) || data.lastIndexOf("@") != data.indexOf("@") || data.indexOf(",", 0) != -1 || data.indexOf(":", 0) != -1 || data.indexOf(";", 0) != -1) {
        return flag;
    } else {
        var temp = rmspaces(data);
        if (temp.indexOf(' ', 0) != -1) {
            flag = true;
        }
        var d3 = temp.lastIndexOf('.') + 4;
        var d4 = temp.substring(0, d3);
        var e2 = temp.length - temp.lastIndexOf('.') - 1;
        var i1 = temp.indexOf('@');
        if ((temp.charAt(i1 + 1) == '.') || (e2 < 1)) {
            flag = true;
        }
        return !flag;
    }
}

function focusPlaceHolder(obj) {
    obj.className = "formbox-field_68M8J";
}

function blurPlaceHolder(obj) {
    if (obj.value == '') {
        obj.className = "formbox-field_68M8J text-placeholder";
    }
}

function isValidDate(year, month, day) {
    if (year.toString() == '' || month.toString() == '' || day.toString() == '') {
        return false;
    }
    try {
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);
    } catch (e) {
        return false;
    }
    var d = new Date(year, month - 1, day, 0, 0, 0, 0);
    return (!isNaN(d) && (d.getDate() == day && d.getMonth() + 1 == month && d.getFullYear() == year));
}
var submitButton_68M8J = document.getElementById("btnSubmit_68M8J");
var subscribeScreen_68M8J = document.getElementById("formbox_screen_subscribe_68M8J");
var signupFormContainer_68M8J = document.getElementById("signupFormContainer_68M8J");
var signupFormLoader_68M8J = document.getElementById("popupFormLoader_68M8J");

function submit_68M8JClick() {
    var retVal = true;
    var contentdata = "";
    var frm = document.getElementById("formbox_screen_subscribe_68M8J");
    if (!isemail(document.getElementsByName("fldemail_68M8J")[0].value)) {
        alert("\u6700\u65B0\u60C5\u5831\u306E\u307B\u304B\u3001\u3054\u8CFC\u8AAD\u8005\u69D8\u9650\u5B9A\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u30E1\u30FC\u30EB\u306B\u3066\u304A\u5C4A\u3051\u3044\u305F\u3057\u307E\u3059 \u3092\u3054\u8A18\u5165\u304F\u3060\u3055\u3044\u3002");
        document.getElementById("fldemail_68M8J").focus();
        retVal = false;
    }
    if (retVal == true) {
        var frm = "_68M8J";
        var f = document.createElement("form");
        f.setAttribute('accept-charset', "UTF-8");
        f.setAttribute('method', "post");
        f.setAttribute('action', "https://lb.benchmarkemail.com//code/lbform");
        var elms = document.getElementsByName("frmLB" + frm)[0].getElementsByTagName("*");
        var ty = "";
        for (var ei = 0; ei < elms.length; ei++) {
            ty = elms[ei].type;
            if (ty == "hidden" || ty == "text" || (ty == "checkbox" && elms[ei].checked) || (ty == "radio" && elms[ei].checked) || ty == "textarea" || ty == "select-one" || ty == "button") {
                elm = elms[ei];
                if (elm.id != "") {
                    var i = document.createElement("input");
                    i.type = "hidden";
                    i.name = elm.name.replace("_68M8J", "");
                    i.id = elm.id;
                    i.value = elm.value;
                    f.appendChild(i);
                }
            }
        }
        document.getElementsByTagName('body')[0].appendChild(f);
        f.submit();
    }
    if (isemail(document.getElementById("fldemail_68M8J").value) && window && window.JB_TRACKER && typeof window.JB_TRACKER.jbSubmitForm === 'function') {
        window.JB_TRACKER.jbSubmitForm({
            email: document.getElementById("fldemail_68M8J").value,
            didSubmit: true
        });
    }

    return retVal;
}
var bmePopupFormViewed_68M8J = localStorage.getItem('bmePopupFormSignedUp1759232');
if (bmePopupFormViewed_68M8J != 'true') {}

function debounce_68M8J(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
var hasVerticalCenter_68M8J = document.getElementsByClassName('position-centered');

function verticalCenter_68M8J(element) {
    if (element) {
        element.style.opacity = 0;
        element.style.display = 'block';
    }
    setTimeout(function() {
        if (hasVerticalCenter_68M8J.length > 0) {
            var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var formElement_68M8J = document.getElementsByClassName('formbox-editor_68M8J')[0];
            var formHeight_68M8J = formElement_68M8J.clientHeight;
            if (formHeight_68M8J < windowHeight) {
                var newPosition = 0;
                newPosition = (windowHeight - formHeight_68M8J) / 2;
                formElement_68M8J.style.top = newPosition + 'px';
            } else {
                formElement_68M8J.style.top = '0px';
            }
        }
        if (element) {
            element.style.opacity = 1;
        }
    }, 100);
}
if (hasVerticalCenter_68M8J.length > 0) {
    var resizeEvent_68M8J = debounce_68M8J(function() {
        verticalCenter_68M8J();
    }, 250);
    window.addEventListener('resize', resizeEvent_68M8J);
}