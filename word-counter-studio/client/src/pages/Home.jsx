var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlignLeft, BookOpen, Check, Clipboard, Copy, Download, FileDown, FileText, Gauge, Globe, Hash, Link2, Loader2, Mic2, Moon, NotebookPen, Quote, RotateCcw, Settings, Trash2, Upload, Waves, } from "lucide-react";
import { useMemo, useRef, useState } from "react";
var SAMPLE_COPY = "Write freely, then make every word count. This quiet workspace keeps the useful numbers close without getting in the way of the thought itself.";
function getStats(text) {
    var _a;
    var trimmed = text.trim();
    var words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    var characters = text.length;
    var charactersNoSpaces = text.replace(/\s/g, "").length;
    var sentences = trimmed ? ((_a = trimmed.match(/[.!?]+(?=\s|$)/g)) !== null && _a !== void 0 ? _a : []).length || 1 : 0;
    var paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
    var lines = text ? text.split(/\r?\n/).length : 0;
    return {
        words: words.length,
        characters: characters,
        charactersNoSpaces: charactersNoSpaces,
        sentences: sentences,
        paragraphs: paragraphs,
        lines: lines,
        readingTime: words.length ? Math.max(1, Math.ceil(words.length / 200)) : 0,
        speakingTime: words.length ? Math.max(1, Math.ceil(words.length / 130)) : 0,
        averageWords: sentences ? (words.length / sentences).toFixed(1) : "0.0",
        averageCharacters: words.length ? (charactersNoSpaces / words.length).toFixed(1) : "0.0",
    };
}
function getMinutes(words, wordsPerMinute) {
    return words ? Math.max(1, Math.ceil(words / Math.max(1, wordsPerMinute))) : 0;
}
function Metric(_a) {
    var label = _a.label, value = _a.value, detail = _a.detail, Icon = _a.icon, _b = _a.accent, accent = _b === void 0 ? false : _b;
    return (<div className={"metric-tile ".concat(accent ? "metric-tile-accent" : "")}>
      <div className="metric-topline">
        <span className="metric-label">{label}</span>
        <Icon size={15} strokeWidth={1.8}/>
      </div>
      <div className="metric-value">{value}</div>
      {detail && <div className="metric-detail">{detail}</div>}
    </div>);
}
export default function Home() {
    var _this = this;
    var _a = useState(""), text = _a[0], setText = _a[1];
    var mode = "Essay";
    var _b = useState(false), copied = _b[0], setCopied = _b[1];
    var _c = useState(false), dragging = _c[0], setDragging = _c[1];
    var _d = useState(function () { var stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null; return stored ? stored === "dark" : typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }), darkMode = _d[0], setDarkMode = _d[1];
    var _e = useState(false), settingsOpen = _e[0], setSettingsOpen = _e[1];
    var _f = useState(200), readingWpm = _f[0], setReadingWpm = _f[1];
    var _g = useState(130), speakingWpm = _g[0], setSpeakingWpm = _g[1];
    var _h = useState(""), pageUrl = _h[0], setPageUrl = _h[1];
    var _i = useState(false), analyzingPage = _i[0], setAnalyzingPage = _i[1];
    var fileInputRef = useRef(null);
    var stats = useMemo(function () { return getStats(text); }, [text]);
    var readingTime = getMinutes(stats.words, readingWpm);
    var speakingTime = getMinutes(stats.words, speakingWpm);
    var copyText = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!text) {
                        toast("There is nothing to copy yet.");
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 2:
                    _b.sent();
                    setCopied(true);
                    toast.success("Copied to clipboard");
                    window.setTimeout(function () { return setCopied(false); }, 1600);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    toast.error("Clipboard access is unavailable in this browser.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var pasteText = function () { return __awaiter(_this, void 0, void 0, function () {
        var clipboardText_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.readText()];
                case 1:
                    clipboardText_1 = _b.sent();
                    setText(function (current) { return (current ? "".concat(current, "\n").concat(clipboardText_1) : clipboardText_1); });
                    toast.success("Pasted into your draft");
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    toast.error("Please allow clipboard access to paste here.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var downloadText = function () {
        if (!text) {
            toast("Write something first, then download your draft.");
            return;
        }
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "word-counter-".concat(mode.toLowerCase().replace(/\s+/g, "-"), ".txt");
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Text file downloaded");
    };
    var analyzePage = function () { return __awaiter(_this, void 0, void 0, function () {
        var normalized, readerUrl, response, content, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!pageUrl.trim()) {
                        toast("Paste a webpage link first.");
                        return [2 /*return*/];
                    }
                    normalized = pageUrl.trim();
                    if (!/^https?:\/\//i.test(normalized))
                        normalized = "https://".concat(normalized);
                    setAnalyzingPage(true);
                    readerUrl = "https://r.jina.ai/http://".concat(normalized.replace(/^https?:\/\//i, ""));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(readerUrl)];
                case 2:
                    response = _b.sent();
                    if (!response.ok)
                        throw new Error("Page could not be read");
                    return [4 /*yield*/, response.text()];
                case 3:
                    content = _b.sent();
                    if (!content.trim())
                        throw new Error("No readable content found");
                    setText(content.trim());
                    toast.success("Webpage content loaded into your draft");
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    toast.error("This webpage could not be read. Try a public article or page link.");
                    return [3 /*break*/, 5];
                case 5:
                    setAnalyzingPage(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var downloadDocx = async function () {
        if (!text.trim()) {
            toast("Write something first, then download your Word document.");
            return;
        }
        try {
            var docx = await import("docx");
            var paragraphs = text.split(/\r?\n/).map(function (line) {
                return new docx.Paragraph({
                    children: [new docx.TextRun({ text: line || " " })],
                    spacing: { after: 180, line: 300 },
                });
            });
            var doc = new docx.Document({
                creator: "Word Counter Studio",
                title: "".concat(mode, " draft"),
                description: "A Word document exported from Word Counter Studio.",
                sections: [{
                    properties: {},
                    children: [
                        new docx.Paragraph({ text: "".concat(mode, " draft"), heading: docx.HeadingLevel.TITLE, spacing: { after: 260 } }),
                        new docx.Paragraph({
                            children: [new docx.TextRun({ text: "Word Counter Studio · ".concat(stats.words, " words"), italics: true, color: "6D7F7B", size: 20 })],
                            spacing: { after: 340 },
                        }),
                    ].concat(paragraphs),
                }],
            });
            var blob = await docx.Packer.toBlob(doc);
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.href = url;
            link.download = "word-counter-".concat(mode.toLowerCase().replace(/\s+/g, "-"), ".docx");
            link.click();
            URL.revokeObjectURL(url);
            toast.success("Word document downloaded");
        }
        catch (_a) {
            toast.error("The Word document could not be generated.");
        }
    };
    var loadFile = function (file) {
        if (!file)
            return;
        var fileName = file.name.toLowerCase();
        var isDocx = fileName.endsWith(".docx");
        var isTxt = file.type === "text/plain" || fileName.endsWith(".txt");
        if (!isTxt && !isDocx) {
            toast.error("Please choose a .txt or .docx file.");
            return;
        }
        if (isDocx) {
            file.arrayBuffer()
                .then(function (arrayBuffer) { return import("mammoth").then(function (module) { return (module.default || module).extractRawText({ arrayBuffer: arrayBuffer }); }); })
                .then(function (result) {
                setText(result.value);
                toast.success("".concat(file.name, " loaded into your draft"));
            })
                .catch(function () { return toast.error("This Word document could not be read."); });
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            var _a;
            setText(String((_a = reader.result) !== null && _a !== void 0 ? _a : ""));
            toast.success("".concat(file.name, " loaded into your draft"));
        };
        reader.onerror = function () { return toast.error("This file could not be read."); };
        reader.readAsText(file);
    };
    var handleFileInput = function (event) {
        var _a;
        loadFile((_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]);
        event.target.value = "";
    };
    var handleDrop = function (event) {
        var _a;
        event.preventDefault();
        setDragging(false);
        loadFile((_a = event.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0]);
    };
    var clearText = function () {
        setText("");
        toast("Draft cleared");
    };
    var toggleTheme = function () {
        var next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle("dark", next);
        window.localStorage.setItem("theme", next ? "dark" : "light");
    };
    return (<div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Word Counter Studio home">
          <span className="brand-mark"><Waves size={18} strokeWidth={2.5}/></span>
          <span>word<span>count</span><b>studio</b></span>
        </a>
        <div className="header-actions">
          <span className="saved-state"><span className="saved-dot"/> Autosaves locally</span>
          <button className="icon-button" aria-label="Toggle dark mode" aria-pressed={darkMode} title="Toggle dark mode" onClick={toggleTheme}><Moon size={17}/></button>
        </div>
      </header>

      <main className="main-content">
        <section className="intro-row">
          <div className="intro-copy">
            <h1>Make every<br /><em>word</em> count.</h1>
            <p>Draft without distraction. Keep an eye on the details that matter, from your first sentence to your final full stop.</p>
          </div>
          <div className="intro-note">
            <div className="note-pin"/>
            <p>“The difference between the right word and the almost right word is the difference between lightning and a lightning bug.”</p>
            <span>— Mark Twain</span>
          </div>
        </section>

        <section className="workspace-grid">
          <div className="editor-card">
            <div className="card-heading">
              <div>
                <h2>Your words, in focus.</h2>
              </div>
              <span className="live-pill"><span /> Live</span>
            </div>
            <div className={"editor-wrap ".concat(dragging ? "is-dragging" : "")} onDragOver={function (event) { event.preventDefault(); setDragging(true); }} onDragLeave={function () { return setDragging(false); }} onDrop={handleDrop}>
              {dragging && <div className="drop-overlay"><Upload size={22}/><strong>Drop your .txt or .docx file here</strong><span>We’ll place it right into your draft</span></div>}
              <textarea value={text} onChange={function (event) { return setText(event.target.value); }} onClick={function (event) { if (event.detail >= 3) event.currentTarget.select(); }} placeholder={SAMPLE_COPY} aria-label="Writing editor" spellCheck="true"/>
              <div className="editor-footer">
                <span className="editor-hint"><AlignLeft size={14}/> Start typing or drop a .txt or .docx file</span>
                <span>{stats.characters.toLocaleString()} characters</span>
              </div>
            </div>
            <div className="toolbar">
              <div className="toolbar-group">
                <Button variant="ghost" size="sm" onClick={clearText}><Trash2 size={15}/> Clear</Button>
                <Button variant="ghost" size="sm" onClick={copyText}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Copied" : "Copy"}</Button>
                <Button variant="ghost" size="sm" onClick={pasteText}><Clipboard size={15}/> Paste</Button>
              </div>
              <div className="toolbar-group">
                <input ref={fileInputRef} className="sr-only" type="file" accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileInput}/>
                <Button variant="ghost" size="sm" onClick={function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }}><Upload size={15}/> Upload .txt</Button>
                <Button variant="ghost" size="sm" onClick={function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }}><FileText size={15}/> Upload .docx</Button>
                <Button variant="default" size="sm" onClick={downloadText}><Download size={15}/> Download .txt</Button>
                <Button variant="default" size="sm" onClick={downloadDocx}><FileDown size={15}/> Download .docx</Button>
              </div>
            </div>
          </div>

          <aside className="insight-column">
            <div className="stats-card">
              <div className="stats-heading"><div><span className="section-kicker">AT A GLANCE</span><h3>Writing stats</h3></div><button className={"settings-trigger ".concat(settingsOpen ? "is-active" : "")} onClick={function () { return setSettingsOpen(function (open) { return !open; }); }} aria-expanded={settingsOpen} aria-controls="speed-settings"><Settings size={17}/></button></div>
              {settingsOpen && (<div className="settings-panel" id="speed-settings" role="dialog" aria-label="Time estimate settings">
                  <div className="settings-panel-heading"><div><span className="section-kicker">PERSONALIZE</span><strong>Time estimate speeds</strong></div><button className="settings-reset" onClick={function () { setReadingWpm(200); setSpeakingWpm(130); }} title="Reset speeds"><RotateCcw size={14}/></button></div>
                  <p>Set the pace that feels closest to your real reading and speaking voice.</p>
                  <label className="speed-setting"><span><b>Reading</b><small>words per minute</small></span><div className="speed-control"><input type="range" min="80" max="600" step="5" value={readingWpm} onChange={function (event) { return setReadingWpm(Number(event.target.value)); }}/><input className="speed-number" type="number" min="1" max="2000" value={readingWpm} onChange={function (event) { return setReadingWpm(Math.max(1, Number(event.target.value) || 1)); }}/></div></label>
                  <label className="speed-setting"><span><b>Speaking</b><small>words per minute</small></span><div className="speed-control"><input type="range" min="60" max="400" step="5" value={speakingWpm} onChange={function (event) { return setSpeakingWpm(Number(event.target.value)); }}/><input className="speed-number" type="number" min="1" max="2000" value={speakingWpm} onChange={function (event) { return setSpeakingWpm(Math.max(1, Number(event.target.value) || 1)); }}/></div></label>
                </div>)}
              <div className="metrics-grid">
                <Metric label="Words" value={stats.words.toLocaleString()} detail="total words" icon={FileText} accent/>
                <Metric label="Characters" value={stats.characters.toLocaleString()} detail="with spaces" icon={Hash}/>
                <Metric label="No spaces" value={stats.charactersNoSpaces.toLocaleString()} detail="characters" icon={AlignLeft}/>
                <Metric label="Sentences" value={stats.sentences} detail="full stops & more" icon={Quote}/>
                <Metric label="Paragraphs" value={stats.paragraphs} detail="blocks of thought" icon={NotebookPen}/>
                <Metric label="Lines" value={stats.lines} detail="line breaks" icon={AlignLeft}/>
                <Metric label="Reading time" value={"".concat(readingTime, " min")} detail={"at ".concat(readingWpm, " wpm")} icon={BookOpen}/>
                <Metric label="Speaking time" value={"".concat(speakingTime, " min")} detail={"at ".concat(speakingWpm, " wpm")} icon={Mic2}/>
                <Metric label="Avg. words" value={stats.averageWords} detail="per sentence" icon={Waves}/>
                <Metric label="Avg. chars" value={stats.averageCharacters} detail="per word" icon={Gauge}/>
              </div>
            </div>
          </aside>
        </section>

        <section className="page-analyzer" aria-labelledby="page-analyzer-title">
          <div className="analyzer-heading">
            <div className="analyzer-icon"><Globe size={19}/></div>
            <div><span className="section-kicker">PAGE ANALYZER</span><h2 id="page-analyzer-title">Analyze a webpage</h2></div>
          </div>
          <p className="analyzer-description">Paste a public webpage link and we’ll bring its readable content into the editor so you can inspect every word, character, sentence, paragraph, and time estimate.</p>
          <div className="analyzer-form">
            <div className="url-field"><Link2 size={16}/><input type="url" value={pageUrl} onChange={function (event) { return setPageUrl(event.target.value); }} onKeyDown={function (event) { if (event.key === "Enter") analyzePage(); }} placeholder="https://example.com/article" aria-label="Webpage URL" /></div>
            <Button variant="default" size="sm" onClick={analyzePage} disabled={analyzingPage}>{analyzingPage ? <><Loader2 size={15} className="spin"/> Reading page…</> : <><Globe size={15}/> Analyze page</>}</Button>
          </div>
          <span className="analyzer-note">Works best with public articles, blog posts, and pages without sign-in walls.</span>
        </section>

        <section className="about-section" aria-labelledby="about-wordcount-studio">
          <div className="about-copy">
            <span className="section-kicker">WHY WORDCOUNT STUDIO</span>
            <h2 id="about-wordcount-studio">A quiet home for<br /><em>better writing.</em></h2>
          </div>
          <div className="about-body">
            <p>Wordcount Studio is a focused writing workspace that helps you understand and refine your draft as you write. It keeps the useful signal - words, sentences, paragraphs, time, and rhythm - close at hand without interrupting your flow.</p>
            <p>Everything happens in your browser. Bring in a text or Word document, write at your own pace, tune the estimates to your voice, and export a polished draft when you are ready.</p>
          </div>
        </section>

        <footer className="page-footer">
          <span><span className="footer-dot"/> Your writing stays in this browser.</span>
          <span>Built for thoughts that need room.</span>
        </footer>
      </main>
    </div>);
}
