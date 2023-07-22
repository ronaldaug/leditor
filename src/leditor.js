class VToast { constructor(t) { this.defaultOption = { duration: 2e3, delay: 0 }, this.toastBottom = 0, this.defaultStyle = "transition:all ease 0.4s; padding:10px; border-radius:4px; position:fixed; z-index:999; box-shadow:0 1px 10px #ddd;", this.options = Object.assign(this.defaultOption, t) } success(t, o) { this.showToast("success", t, o) } error(t, o) { this.showToast("error", t, o) } info(t, o) { this.showToast("info", t, o) } warning(t, o) { this.showToast("warning", t, o) } randomId() { let t = "", o = "abcdefghijklmnopqrstuvwxyz", s = o.length; for (let i = 0; i < 5; i++)t += o.charAt(Math.floor(Math.random() * s)); return t } caculateToastsHeight() { let t = document.querySelectorAll(".v-toast"), o = 0; t.forEach(t => { o += t.offsetHeight + 20 }), this.toastBottom = `bottom:${o + 20}px` } getToastColor(t) { return ({ success: { color: "#fff", background: "#17bc6d" }, error: { color: "#fff", background: "#e94f75" }, warning: { color: "#232323", background: "#ffe16c" }, info: { color: "#232323", background: "#b7c1ff;" } })[t] } showToast(t, o, s = null) { s && (this.options = Object.assign(this.defaultOption, s)), this.msg = o, this.toastColor = this.getToastColor(t), this.caculateToastsHeight(), this.initToast() } initToast() { this.showStyle = `${this.defaultStyle} ${this.toastBottom}; right:10px; color:${this.toastColor.color}; background:${this.toastColor.background};`, this.hideStyle = `${this.defaultStyle} bottom:-200px; right:10px; color:${this.toastColor.color}; background:${this.toastColor.background};`; let t = document.createElement("div"), o = this.randomId(); t.id = o, t.className = "v-toast", t.setAttribute("style", this.hideStyle), t.innerText = this.msg, document.body.append(t); let s = document.querySelector(`#${o}`); setTimeout(() => { s.setAttribute("style", this.showStyle) }, this.options.delay), setTimeout(() => { s.setAttribute("style", this.hideStyle) }, this.options.duration), setTimeout(() => { s.remove() }, this.options.duration + 100) } }
const Msg = new VToast();

class LEHooks {
    constructor() {
        this.hooks = {};
    }

    callHook(hookName, ...args) {
        if (this.hooks[hookName]) {
            this.hooks[hookName].forEach((callback) => {
                callback(...args);
            });
        }
    }

    addHook(hookName, callback) {
        if (!this.hooks[hookName]) {
            this.hooks[hookName] = [];
        }
        this.hooks[hookName].push(callback);
    }
}

class Leditor extends LEHooks {
    constructor(selector) {
        super();
        let fimage = `<svg class="ticon imgicon" width="476pt" height="476pt" data-com="image" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-com="image" fill="#fff" d="M0 0h24v24H0z"/><path data-com="image" d="M21 16v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2m18-2V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14m18-2-5.517-3.678a1 1 0 0 0-1.002-.063L3 18" stroke="#000" stroke-linejoin="round"/><circle data-com="image" cx="8" cy="9" r="2" stroke="#000" stroke-linejoin="round"/></svg>`;
        let fimage2 = `<svg class="ticon imgicon le-keep-tooltip" width="476pt" height="476pt" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="le-keep-tooltip" fill="#fff" d="M0 0h24v24H0z"/><path class="le-keep-tooltip" d="M21 16v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2m18-2V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14m18-2-5.517-3.678a1 1 0 0 0-1.002-.063L3 18" stroke="#000" stroke-linejoin="round"/><circle class="le-keep-tooltip" cx="8" cy="9" r="2" stroke="#000" stroke-linejoin="round"/></svg>`;
        let flink = `<svg class="ticon" width="476pt" height="476pt"  data-com="link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.974 52.974"><path data-com="link" d="M49.467 3.51c-4.677-4.679-12.291-4.681-16.97 0l-9.192 9.192c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l9.192-9.192c1.88-1.88 4.391-2.915 7.07-2.915 2.681 0 5.191 1.036 7.071 2.916s2.916 4.391 2.916 7.071c0 2.68-1.036 5.19-2.916 7.07L36.033 31.088c-3.898 3.898-10.244 3.898-14.143 0-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414c2.34 2.339 5.412 3.509 8.485 3.509s6.146-1.17 8.485-3.509L49.467 20.48c2.258-2.258 3.502-5.271 3.502-8.485 0-3.214-1.244-6.227-3.502-8.485z"/><path d="M26.84 40.279l-7.778 7.778c-1.88 1.88-4.391 2.916-7.071 2.916-2.68 0-5.19-1.036-7.071-2.916-3.898-3.898-3.898-10.243 0-14.142l11.314-11.314c3.899-3.898 10.244-3.896 14.142 0 .391.391 1.023.391 1.414 0s.391-1.023 0-1.414c-4.677-4.679-12.291-4.681-16.97 0L3.505 32.502C1.247 34.76.004 37.773.004 40.987c0 3.214 1.244 6.227 3.502 8.484s5.271 3.502 8.484 3.502c3.215 0 6.228-1.244 8.485-3.502l7.778-7.778c.391-.391.391-1.023 0-1.414s-1.022-.39-1.413 0z"/></svg>`;
        let flink2 = `<svg class="ticon" width="476pt" height="476pt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.974 52.974"><path d="M49.467 3.51c-4.677-4.679-12.291-4.681-16.97 0l-9.192 9.192c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l9.192-9.192c1.88-1.88 4.391-2.915 7.07-2.915 2.681 0 5.191 1.036 7.071 2.916s2.916 4.391 2.916 7.071c0 2.68-1.036 5.19-2.916 7.07L36.033 31.088c-3.898 3.898-10.244 3.898-14.143 0-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414c2.34 2.339 5.412 3.509 8.485 3.509s6.146-1.17 8.485-3.509L49.467 20.48c2.258-2.258 3.502-5.271 3.502-8.485 0-3.214-1.244-6.227-3.502-8.485z"/><path d="M26.84 40.279l-7.778 7.778c-1.88 1.88-4.391 2.916-7.071 2.916-2.68 0-5.19-1.036-7.071-2.916-3.898-3.898-3.898-10.243 0-14.142l11.314-11.314c3.899-3.898 10.244-3.896 14.142 0 .391.391 1.023.391 1.414 0s.391-1.023 0-1.414c-4.677-4.679-12.291-4.681-16.97 0L3.505 32.502C1.247 34.76.004 37.773.004 40.987c0 3.214 1.244 6.227 3.502 8.484s5.271 3.502 8.484 3.502c3.215 0 6.228-1.244 8.485-3.502l7.778-7.778c.391-.391.391-1.023 0-1.414s-1.022-.39-1.413 0z"/></svg>`;
        let funlink = `<svg class="ticon" width="476pt" height="476pt"  data-com="unlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.974 52.974"><path data-com="unlink" d="M49.467 3.51c-4.677-4.679-12.291-4.681-16.97 0l-9.192 9.192c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l9.192-9.192c1.88-1.88 4.391-2.915 7.07-2.915 2.681 0 5.191 1.036 7.071 2.916s2.916 4.391 2.916 7.071c0 2.68-1.036 5.19-2.916 7.07L36.033 31.088c-3.898 3.898-10.244 3.898-14.143 0-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414c2.34 2.339 5.412 3.509 8.485 3.509s6.146-1.17 8.485-3.509L49.467 20.48c2.258-2.258 3.502-5.271 3.502-8.485 0-3.214-1.244-6.227-3.502-8.485z"/><path d="M26.84 40.279l-7.778 7.778c-1.88 1.88-4.391 2.916-7.071 2.916-2.68 0-5.19-1.036-7.071-2.916-3.898-3.898-3.898-10.243 0-14.142l11.314-11.314c3.899-3.898 10.244-3.896 14.142 0 .391.391 1.023.391 1.414 0s.391-1.023 0-1.414c-4.677-4.679-12.291-4.681-16.97 0L3.505 32.502C1.247 34.76.004 37.773.004 40.987c0 3.214 1.244 6.227 3.502 8.484s5.271 3.502 8.484 3.502c3.215 0 6.228-1.244 8.485-3.502l7.778-7.778c.391-.391.391-1.023 0-1.414s-1.022-.39-1.413 0zM33.969 44.009c-.553 0-1 .447-1 1v6c0 .553.447 1 1 1s1-.447 1-1v-6c0-.553-.447-1-1-1zM38.433 42.302c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l4.243 4.242c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-4.243-4.242zM44.969 38.009h-6c-.553 0-1 .447-1 1s.447 1 1 1h6c.553 0 1-.447 1-1s-.447-1-1-1zM15.969 11.009c.553 0 1-.447 1-1v-6c0-.553-.447-1-1-1s-1 .447-1 1v6c0 .553.448 1 1 1zM11.504 12.716c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L8.676 7.06c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l4.242 4.242zM4.969 17.009h6c.553 0 1-.447 1-1s-.447-1-1-1h-6c-.553 0-1 .447-1 1s.448 1 1 1z"/></svg>`;
        let fquote = `<svg class="ticon" width="476pt" height="476pt"  data-com="blockquote" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path data-com="blockquote" d="M50.6292648 26.225668c-.1288986-1.3934994-.0303001-5.1816006 3.5985985-10.4492006.2745018-.3975.2247009-.9335995-.1161957-1.2743998-1.4795036-1.4794998-2.395504-2.4131002-3.0379982-3.0663996-.8448029-.8614006-1.2305031-1.2539005-1.795002-1.7657003-.3769035-.3388004-.9472008-.3446999-1.3281021-.0125999-6.3251991 5.5038996-13.3505974 16.8768997-12.3339958 30.8105011.5956955 8.1815987 6.5634956 14.1200981 14.1894951 14.1200981 7.8260994 0 14.1932983-6.3661995 14.1932983-14.1923981 0-7.5498009-5.9256935-13.7412015-13.3700981-14.1699009zm-.8232002 26.3622989c-6.5489006 0-11.6767998-5.1581993-12.1953011-12.2645988v-.0009995c-1.1435966-15.6709003 8.1718025-25.8496017 10.9863014-28.5449009.2743988.2705002.5878983.5887995 1.0498009 1.0594997.5565987.5664005 1.3183975 1.3417997 2.4706993 2.4981003-4.4053001 6.7870998-3.5741997 11.6229992-3.2099991 12.3164005.1728973.3290997.5273972.5508003.8984985.5508003 6.7236023 0 12.1932983 5.469698 12.1932983 12.1933002 1e-7 6.7226984-5.4696959 12.1923982-12.1932982 12.1923982zM15.1136675 26.225668c-.1299-1.3896008-.0341997-5.1748009 3.5985994-10.4492006.2735004-.3975.2245998-.9335995-.1161995-1.2743998-1.4766006-1.4765997-2.3915997-2.4091997-3.0332003-3.0625-.8476-.8633003-1.2343998-1.2568998-1.7987995-1.7695999-.3769999-.3388004-.9473-.3437004-1.3281002-.0136003-6.3251996 5.5039005-13.3515997 16.875-12.3369999 30.8115005v.0009995c.5977 8.1805992 6.5664001 14.1190987 14.1924 14.1190987 7.8261995 0 14.1934004-6.3661995 14.1934004-14.1923981 0-7.5507003-5.9258003-13.7431003-13.3711004-14.1699zm-.8223 26.3622989c-6.5478001 0-11.6786995-5.1581993-12.1982002-12.2655983v.0009995c-1.1406-15.6748009 8.1747999-25.8516006 10.9892006-28.5459003.2754002.2705002.5899.5908003 1.0528002 1.0625.5555992.5663996 1.3163996 1.3408003 2.4667988 2.4951-4.4052992 6.7880993-3.5741997 11.6229992-3.2099991 12.3153992.1729002.3291016.5283003.5518017.8993998.5518017 6.7237005 0 12.1934004 5.469698 12.1934004 12.1933002-1e-7 6.7226982-5.4696999 12.192398-12.1934005 12.192398z"/></svg>`;
        let fleft = `<svg class="ticon" width="476pt" height="476pt"  data-com="justifyLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.916 22.916"><path data-com="justifyLeft" d="M11.458 22.828H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10.958c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 15.582H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 8.335H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 1.088H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5z"/></svg>`;
        let fcenter = `<svg class="ticon" width="476pt" height="476pt"  data-com="justifyCenter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.914 22.914"><path data-com="justifyCenter" d="M17.719 22.827H5.195c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12.523c.276 0 .5.224.5.5s-.223.5-.499.5zM22.414 15.581H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.914c.276 0 .5.224.5.5s-.224.5-.5.5zM17.719 8.334H5.195c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12.523c.276 0 .5.224.5.5s-.223.5-.499.5zM22.414 1.087H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.914c.276 0 .5.224.5.5s-.224.5-.5.5z"/></svg>`;
        let fright = `<svg class="ticon" width="476pt" height="476pt"  data-com="justifyRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.916 22.916"><path data-com="justifyRight" d="M22.059 22.828H11.101c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10.958c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 15.582H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 8.335H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5zM22.416 1.088H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h21.916c.276 0 .5.224.5.5s-.224.5-.5.5z"/></svg>`;

        this.currentSelection;
        this.tooltip;
        this.formatBlock = ['h1', 'h2', 'p', 'blockquote'];
        if(typeof selector === 'object'){
            this.leditor = selector;
        }
        if(typeof selector === 'string'){
            this.leditor = document.querySelector(selector);
        }
        this.menus = `<div class="link-box"><input class="le-keep-tooltip" /><button class="add-link-btn">${flink2}</button></div>
        <div class="image-box"><input class="le-keep-tooltip" /><button class="add-image-url-btn">${flink2}</button>
        <label class="le-keep-tooltip">
        ${fimage2}
        <input type="file" class="le-keep-tooltip le-upload-image" style="display:none">
       </label></div>
        <div class="tool-wrap"><button data-com="bold"><b data-com="bold">B</b></button><button data-com="underline"><u data-com="underline">U</u></button><button data-com="italic"><i data-com="italic">I</i></button><button data-com="link">${flink}</button><button data-com="unlink">${funlink}</button><button data-com="image">${fimage}</button><button data-com="h1">H1</button><button data-com="h2">H2</button><button data-com="p"><small data-com="p">P</small></button><button data-com="blockquote">${fquote}</button><button data-com="justifyLeft">${fleft}</button><button data-com="justifyCenter">${fcenter}</button><button data-com="justifyRight">${fright}</button>`;
        this.init();
    }

    // Pase html at specific caret
    // https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
    pasteHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }

    // Get text width
    getTextWidthAndHeight = () => {
        let sel = document.selection, range;
        let width = 0, height = 0;
        if (sel) {
            if (sel.type != "Control") {
                range = sel.createRange();
                width = range.boundingWidth;
                height = range.boundingHeight;
            }
        } else if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                if (range.getBoundingClientRect) {
                    const rect = range.getBoundingClientRect();
                    width = rect.right - rect.left;
                    height = rect.bottom - rect.top;
                }
            }
        }
        return { textWidth: width, textHeight: height };
    }

    // Get cursor position
    // https://stackoverflow.com/questions/41140118/how-to-split-contenteditable-contents-based-on-the-caret-position/41142439
    getCursorPos = (T) => {
        var sel = document.selection, range, rect;
        var x = 0, y = 0;
        if (sel) {
            if (sel.type != "Control") {
                range = sel.createRange();
                range.collapse(true);
                x = range.boundingLeft;
                y = range.boundingTop;
            }
        } else if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                if (range.getClientRects) {
                    range.collapse(true);
                    if (range.getClientRects().length > 0) {
                        rect = range.getClientRects()[0];
                        x = rect.left;
                        y = rect.top;
                    }
                }
                // Fall back to inserting a temporary element
                if (x == 0 && y == 0) {
                    var span = document.createElement("span");
                    if (span.getClientRects) {
                        // Ensure span has dimensions and position by
                        // adding a zero-width space character
                        span.appendChild(document.createTextNode("\u200b"));
                        range.insertNode(span);
                        rect = span.getClientRects()[0];
                        x = rect.left;
                        y = rect.top;
                        var spanParent = span.parentNode;
                        spanParent.removeChild(span);

                        // Glue any broken text nodes back together
                        spanParent.normalize();
                    }
                }
            }
        }
        return { x, y };
    }


    // Remove Popup Modal
    removeModal = () => {
        let MD = document.querySelector('.popup-modal');
        if (MD) { MD.remove() }
    }

    removeToolTip = () => {
        if (!this.tooltip) return;
        this.tooltip.remove();
        const allTemps = this.leditor.querySelectorAll('.le-tmp-element');
        if (allTemps.length > 0) {
            allTemps.forEach(tmp => tmp.outerHTML = tmp.innerHTML)
        }
        this.callHook('tooltip:close');
    }

    // Append tooltip
    appendToolTip = () => {
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = this.menus;
        document.body.append(tooltip);
        let { x, y } = this.getCursorPos(tooltip);
        let originalX = x;
        let originalY = y;

        // current selecting text width
        const { textWidth, textHeight } = this.getTextWidthAndHeight();

        const textHalf = textWidth / 2;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHalf = tooltipWidth / 2;
        const tooltipHeight = tooltip.offsetHeight;
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;


        // horizontal offset
        x = x - tooltipHalf;
        // reAdd text width
        x = x + textHalf;

        // vertical offset
        y = y - (tooltipHeight + 10); // keep 10px margin


        // Check Left
        // reset if tooltip exits from viewport
        if (tooltipHalf >= originalX) {
            x = 0;
        }

        // Check Top
        // reset if tooltip exits from viewport
        if (tooltipHeight >= originalY) {
            y = textHeight + 10;
        }


        // Check Right
        // reset if tooltip exits from viewport
        if ((originalX + tooltipHalf) >= viewportWidth) {
            if (x !== 0) {
                x = viewportWidth - (tooltipWidth + 18);
            }
        }

        // if (topcor) {
        //     tooltip.childNodes[0].classList.add('trangle-up');
        // }
        tooltip.setAttribute('style', `animation:bounceIn 0.4s;top:${y}px;left:${x}px`);
        this.tooltip = tooltip;
    }

    showLinkBox() {
        if (!this.currentSelection.toString()) {
            Msg.error('Please select text!')
            return;
        }

        this.tooltip.classList.add('add-link');
        const linkInput = this.tooltip.querySelector('.link-box input');
        const addBtn = this.tooltip.querySelector('.link-box .add-link-btn');

        document.execCommand('createLink', false, '#');
        this.currentSelection.anchorNode.parentElement.className = "le-tmp-element";
        addBtn.addEventListener('click', () => {
            let tempElement = document.querySelector('.le-tmp-element');
            if (!linkInput.value) {
                Msg.error('Please add url!')
                return;
            }
            tempElement.href = linkInput.value;
            tempElement.removeAttribute("class");
            this.removeToolTip();
        })
    }

    insertImage = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            let hiddenPlace = document.querySelector('.le-temp-place');
            hiddenPlace.outerHTML = `<img src="${reader.result}">`;
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    showImageBox() {
        this.tooltip.classList.add('add-image');
        this.pasteHtmlAtCaret('<span class="le-temp-place" style="opacity:0;visibility:hidden"></span>');
        const addImgUrlBtn = this.tooltip.querySelector('.add-image-url-btn');

        addImgUrlBtn.addEventListener('click', e => {
            const inputbox = this.tooltip.querySelector('.image-box input');
            if (!inputbox.value) {
                Msg.error('Please add image url');
                return;
            }
            let hiddenPlace = document.querySelector('.le-temp-place');
            hiddenPlace.outerHTML = `<img src="${inputbox.value}">`;
        })

        const uploadInput = this.tooltip.querySelector('input.le-upload-image');
        uploadInput.addEventListener('change', (e) => {
            this.insertImage(e);
        })
    }

    highlightText() {
        if (!this.currentSelection.toString()) {
            Msg.error('Please select text!')
            return;
        }


        this.removeToolTip();
    }

    runCommand(command) {
        if (!command) { return }
        if (this.formatBlock.includes(command)) {
            document.execCommand('formatBlock', false, command);
            return;
        }

        if (command == 'link') {

            this.showLinkBox();

        }

        if (command == 'image') {
            this.showImageBox();
        }

        document.execCommand(command, false, null);
    }


    init() {


        this.leditor.setAttribute('contenteditable', 'true');
        this.leditor.classList.add('active-edit');
        this.leditor.focus();

        // Listen click event of tooltip buttons (call from body to be sure)
        document.body.addEventListener("click", e => {

            const command = e.target.dataset.com;
            if (this.tooltip && this.tooltip.contains(e.target) && e.target.classList.contains('le-keep-tooltip')) {
                return;
            }
            if (command) {
                this.runCommand(command);
                return;
            }

            this.removeToolTip();

            // checkClickImage(e, LE);
            this.currentSelection = window.getSelection();
            if (this.currentSelection.toString()) {
                this.appendToolTip();
                return;
            }
            if (e.detail == 2) {
                this.appendToolTip();
            }

            let isClickInside = this.leditor.contains(e.target);
            if (isClickInside) {
                return;
            }
            if (!this.tooltip.contains(e.target)) {
                this.removeToolTip()
            }

            // Listen everytime user hit backspace and enter
            this.leditor.addEventListener('keydown', e => {
                if (this.leditor.innerHTML == 0) {
                    this.leditor.innerHTML = '<p>&nbsp;</p>'
                }
                if (e.keyCode == 8) {
                    this.removeAllhidden();
                }
            })


        })

    }
}