import { useState, useMemo, useEffect, useRef } from "react";

function applyThemeVars(el, tema, accent, font) {
  const light = tema === "light";
  const vars = {
    "--bg": light ? "#eef0f2" : "#0a0a0a",
    "--surface": light ? "#ffffff" : "#111111",
    "--surface2": light ? "#f4f5f7" : "#1a1a1a",
    "--surface3": light ? "#e6e8eb" : "#222222",
    "--text": light ? "#111827" : "#f1f1f1",
    "--muted": light ? "#6b7280" : "#6b6b6b",
    "--muted2": light ? "#374151" : "#9a9a9a",
    "--border": light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)",
    "--border2": light ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.1)",
    "--shadow-card": light
      ? "0 2px 12px rgba(0,0,0,0.08)"
      : "0 2px 12px rgba(0,0,0,0.4)",
    "--accent": accent,
    "--accent2": light ? "#16a34a" : "#22c55e",
    "--accent3": light ? "#dc2626" : "#ff4444",
    "--accent4": light ? "#d97706" : "#f59e0b",
    "--accent5": light ? "#6366f1" : "#818cf8",
  };
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  el.style.fontSize = font + "px";
  el.style.background = vars["--bg"];
  el.style.color = vars["--text"];
}

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0a;--surface:#111111;--surface2:#1a1a1a;--surface3:#222222;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);
  --accent:#e52222;--accent2:#22c55e;--accent3:#ff4444;--accent4:#f59e0b;--accent5:#818cf8;
  --text:#f1f1f1;--muted:#6b6b6b;--muted2:#9a9a9a;
  --font:'Inter',sans-serif;--font-mono:'Inter',sans-serif;
  --radius:16px;--radius-sm:10px;
  --shadow:0 4px 24px rgba(229,34,34,0.12);--shadow-card:0 2px 12px rgba(0,0,0,0.4)
}
.app{color:var(--text)}
html,body,#root{height:100%}
body{font-family:var(--font);background:var(--bg);color:var(--text);overflow:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
.app{display:flex;height:100vh;overflow:hidden}
.sidebar{width:232px;min-width:232px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:20px 12px;gap:2px;overflow-y:auto}
.logo{font-size:18px;font-weight:900;color:var(--text);padding:4px 10px 20px;letter-spacing:-1px;display:flex;align-items:center;gap:10px}
.logo-icon{font-size:22px;background:var(--accent);border-radius:8px;width:34px;height:34px;display:flex;align-items:center;justify-content:center}
.nav-section-label{font-size:9px;font-weight:700;letter-spacing:2px;color:var(--muted);text-transform:uppercase;padding:12px 10px 4px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--radius-sm);cursor:pointer;font-size:13px;font-weight:600;color:var(--muted);transition:all .15s;position:relative}
.nav-item:hover{background:var(--surface2);color:var(--text)}
.nav-item.active{background:rgba(229,34,34,0.12);color:var(--accent);border-left:2px solid var(--accent)}
.nav-item .icon{font-size:15px;width:20px;text-align:center}
.nav-badge{position:absolute;right:10px;background:var(--accent);color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px}
.sidebar-footer{margin-top:auto;padding-top:12px;border-top:1px solid var(--border)}
.user-chip{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--radius-sm);background:var(--surface2)}
.avatar{width:32px;height:32px;border-radius:8px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
.user-info{flex:1;overflow:hidden}
.user-name{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.user-role{font-size:11px;color:var(--muted)}
.logout-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:15px;padding:4px;border-radius:6px;transition:color .15s}
.logout-btn:hover{color:var(--accent)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{padding:14px 28px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--surface)}
.page-title{font-size:18px;font-weight:800;letter-spacing:-.5px}
.page-subtitle{font-size:11px;color:var(--muted);margin-top:2px}
.content{flex:1;overflow-y:auto;padding:24px 28px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px;box-shadow:var(--shadow-card);color:var(--text)}
.section-title{font-size:14px;font-weight:800;letter-spacing:-.3px;color:var(--text)}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 18px;position:relative;overflow:hidden;box-shadow:var(--shadow-card);color:var(--text)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent-color,var(--accent))}
.stat-label{font-size:10px;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase}
.stat-value{font-family:var(--font-mono);font-size:20px;font-weight:700;margin:8px 0 4px;color:var(--accent-color,var(--text))}
.stat-icon{position:absolute;top:16px;right:16px;font-size:18px;opacity:.25}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--radius-sm);font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all .15s;font-family:var(--font);white-space:nowrap}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 3px 12px rgba(229,34,34,0.35)}
.btn-primary:hover{background:#cc1a1a}
.btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border2)}
.btn-secondary:hover{background:var(--surface3)}
.btn-pay{background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;box-shadow:0 3px 12px rgba(22,163,74,0.4);animation:pulse-pay 1.5s ease-in-out infinite}
.btn-pay:hover{background:linear-gradient(135deg,#15803d,#166534)}
@keyframes pulse-pay{0%,100%{box-shadow:0 3px 12px rgba(22,163,74,0.4)}50%{box-shadow:0 4px 20px rgba(22,163,74,0.7)}}
.btn-ghost{background:none;color:var(--muted);border:1px solid transparent}
.btn-ghost:hover{background:var(--surface2);color:var(--text)}
.btn-sm{padding:5px 10px;font-size:11px}
.w-full{width:100%}
.form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
label{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.5px;text-transform:uppercase}
input,select,textarea{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:9px 12px;font-size:13px;color:var(--text);font-family:var(--font);outline:none;transition:border-color .15s,box-shadow .15s;width:100%}
input[type=color]{padding:2px;height:36px}
input:focus,select:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(229,34,34,0.15)}
input::placeholder,textarea::placeholder{color:var(--muted)}
textarea{resize:vertical;min-height:80px}
option{background:var(--surface);color:var(--text)}
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(6px);animation:fadeIn .15s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius);padding:24px;width:500px;max-width:95vw;max-height:85vh;overflow-y:auto;animation:slideUp .2s ease;box-shadow:0 24px 60px rgba(0,0,0,0.6);color:var(--text)}
.modal-lg{width:650px}
@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.modal-title{font-size:16px;font-weight:800}
.modal-close{background:none;border:none;color:var(--muted);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:6px}
.modal-close:hover{color:var(--text);background:var(--surface2)}
.modal-footer{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:10px 12px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border2)}
td{padding:11px 12px;font-size:13px;border-bottom:1px solid var(--border);color:var(--text)}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--surface2)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;font-size:10px;font-weight:700}
.badge-green{background:rgba(34,197,94,0.15);color:#22c55e}
.badge-red{background:rgba(229,34,34,0.15);color:var(--accent)}
.badge-blue{background:rgba(129,140,248,0.15);color:var(--accent5)}
.badge-yellow{background:rgba(245,158,11,0.15);color:var(--accent4)}
.badge-gray{background:var(--surface3);color:var(--muted)}
.progress-bar{height:6px;background:var(--surface3);border-radius:4px;overflow:hidden}
.progress-fill{height:100%;border-radius:4px;transition:width .5s ease}
.tabs{display:flex;gap:3px;background:var(--surface2);border-radius:var(--radius-sm);padding:3px;margin-bottom:16px;border:1px solid var(--border)}
.tab{flex:1;padding:7px 8px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:none;background:none;color:var(--muted);transition:all .15s;text-align:center}
.tab.active{background:var(--accent);color:#fff;box-shadow:0 2px 8px rgba(229,34,34,0.4)}
.donut-wrap{display:flex;align-items:center;gap:20px}
.donut-legend{flex:1;display:flex;flex-direction:column;gap:7px}
.legend-item{display:flex;align-items:center;gap:7px;font-size:12px}
.legend-dot{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.legend-label{color:var(--muted);flex:1;font-weight:600}
.legend-val{font-family:var(--font-mono);font-size:12px;font-weight:600}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}

.empty-state{text-align:center;padding:40px;color:var(--muted);font-size:13px;font-weight:600}
.empty-icon{font-size:34px;margin-bottom:10px}
.divider{height:1px;background:var(--border);margin:16px 0}
.mono{font-family:var(--font-mono)}
.text-green{color:var(--accent2)}.text-red{color:var(--accent3)}.text-muted{color:var(--muted)}
.chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:11px;background:var(--surface2);color:var(--muted);font-weight:600;border:1px solid var(--border)}
.color-dot{width:6px;height:6px;border-radius:2px;display:inline-block;flex-shrink:0}
.alert-item{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:var(--radius-sm);margin-bottom:8px;border:1px solid}
.alert-red{background:rgba(229,34,34,0.08);border-color:rgba(229,34,34,0.25)}
.alert-yellow{background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.25)}
.alert-blue{background:rgba(129,140,248,0.08);border-color:rgba(129,140,248,0.25)}
.alert-green{background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.25)}
.card-overdue{border-color:rgba(229,34,34,0.4)!important;background:rgba(229,34,34,0.04)!important}
@keyframes spin{to{transform:rotate(360deg)}}
`;

const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    n || 0,
  );
const fmtDate = (d) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "-";
const genId = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().split("T")[0];

const CATEGORY_COLORS = {
  Alimentação: "#e07b3f",
  Moradia: "#6dab7b",
  Transporte: "#f0b429",
  Saúde: "#4fb8a0",
  Educação: "#7b8fd4",
  Lazer: "#e87d9a",
  Negócio: "#43aa8b",
  Investimentos: "#8b7dd4",
  Vestuário: "#d4847d",
  Outros: "#a09080",
};
const CATS = Object.keys(CATEGORY_COLORS);
const TIPO_FONTE = [
  "Salário CLT",
  "Salário Autônomo",
  "Freelance",
  "Comissão",
  "Aluguel",
  "Dividendos",
  "Pensão",
  "Negócio Próprio",
  "Benefício",
  "Outros",
];
const MEMBROS = ["Alexandre", "Lanay"];
const MEMBRO_COR = { Alexandre: "#7b8fd4", Lanay: "#e87d9a" };
const MEMBRO_EMOJI = { Alexandre: "👨", Lanay: "👩" };
const TIPO_VEICULO = [
  "Carro",
  "Moto",
  "Caminhão",
  "Caminhonete",
  "Van",
  "Ônibus",
  "Outro",
];
const TIPO_GASTO_VEICULO = [
  "Combustível",
  "Manutenção",
  "IPVA",
  "Seguro",
  "Multa",
  "Licenciamento",
  "Estacionamento",
  "Lavagem",
  "Pneu",
  "Revisão",
  "Peças",
  "Outros",
];
const KM_REVISAO_PADRAO = 10000; // lembrete a cada X km
const COR_GASTO = {
  Combustível: "#e07b3f",
  Manutenção: "#7b8fd4",
  IPVA: "#d95f5f",
  Seguro: "#6dab7b",
  Multa: "#f0b429",
  Licenciamento: "#4fb8a0",
  Estacionamento: "#a09080",
  Lavagem: "#43aa8b",
  Pneu: "#e87d9a",
  Revisão: "#8b7dd4",
  Peças: "#d4847d",
  Outros: "#a09080",
};
const STORAGE_KEY = "finfamilia_v3";

async function comprimirImagem(file, maxW = 800, qualidade = 0.72) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onerror = () => rej(new Error("Falha ao ler arquivo"));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => rej(new Error("Falha ao carregar imagem"));
      img.onload = () => {
        const ratio = Math.min(1, maxW / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio),
          h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        res(canvas.toDataURL("image/jpeg", qualidade));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const calcSaldoConta = (conta, txs) =>
  txs
    .filter((t) => t.contaId === conta.id)
    .reduce(
      (acc, t) => (t.tipo === "entrada" ? acc + t.valor : acc - t.valor),
      conta.saldoInicial || 0,
    );

const calcFaturaCartao = (cartaoId, txs) =>
  txs
    .filter(
      (t) => t.cartaoId === cartaoId && t.tipo === "saida" && !t.isPagFatura,
    )
    .reduce((acc, t) => acc + t.valor, 0);

function diasParaVencimento(v) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const ano = hoje.getFullYear(),
    mes = hoje.getMonth();
  let d = new Date(ano, mes, v);
  if (d < hoje) d = new Date(ano, mes + 1, v);
  return Math.round((d - hoje) / (1000 * 60 * 60 * 24));
}

function calcAlertas(contasComSaldo, cartoes, txs) {
  const al = [];
  contasComSaldo.forEach((c) => {
    if (c.saldo < 0)
      al.push({
        tipo: "red",
        icon: "🚨",
        titulo: `Conta negativa — ${c.nome}`,
        desc: `Saldo: ${fmt(c.saldo)}`,
      });
    else if (c.saldo < 500)
      al.push({
        tipo: "yellow",
        icon: "⚠️",
        titulo: `Saldo baixo — ${c.nome}`,
        desc: `Saldo: ${fmt(c.saldo)}`,
      });
  });
  cartoes.forEach((c) => {
    const fatura = calcFaturaCartao(c.id, txs);
    const diasVenc = c.vencimento ? diasParaVencimento(c.vencimento) : 999;
    const diasFech = c.fechamento ? diasParaVencimento(c.fechamento) : 999;

    // Alertas de VENCIMENTO
    if (c.vencimento && fatura > 0) {
      if (diasVenc < 0)
        al.push({
          tipo: "red",
          icon: "💳",
          titulo: `Fatura VENCIDA — ${c.nome}`,
          desc: `${fmt(fatura)} vencida há ${Math.abs(diasVenc)} dia(s)!`,
        });
      else if (diasVenc <= 2)
        al.push({
          tipo: "red",
          icon: "💳",
          titulo: `Fatura vencendo — ${c.nome}`,
          desc: `${fmt(fatura)} vence ${diasVenc === 0 ? "hoje" : `em ${diasVenc} dia(s)`}!`,
        });
      else if (diasVenc <= 7)
        al.push({
          tipo: "yellow",
          icon: "💳",
          titulo: `Fatura próxima — ${c.nome}`,
          desc: `${fmt(fatura)} vence em ${diasVenc} dias`,
        });
    }

    // Alertas de FECHAMENTO
    if (c.fechamento && fatura > 0) {
      if (diasFech < 0)
        al.push({
          tipo: "red",
          icon: "✂️",
          titulo: `Fatura FECHADA — ${c.nome}`,
          desc: `Fechou há ${Math.abs(diasFech)} dia(s). Fatura: ${fmt(fatura)}`,
        });
      else if (diasFech === 0)
        al.push({
          tipo: "red",
          icon: "✂️",
          titulo: `Fatura fecha HOJE — ${c.nome}`,
          desc: `Último dia para lançamentos. Fatura atual: ${fmt(fatura)}`,
        });
      else if (diasFech <= 2)
        al.push({
          tipo: "yellow",
          icon: "✂️",
          titulo: `Fatura fecha em breve — ${c.nome}`,
          desc: `Fecha em ${diasFech} dia(s). Fatura atual: ${fmt(fatura)}`,
        });
      else if (diasFech <= 5)
        al.push({
          tipo: "blue",
          icon: "✂️",
          titulo: `Fechamento se aproxima — ${c.nome}`,
          desc: `Fecha em ${diasFech} dias. Fatura atual: ${fmt(fatura)}`,
        });
    }

    if (c.limite > 0 && fatura / c.limite > 0.8)
      al.push({
        tipo: "yellow",
        icon: "📊",
        titulo: `Limite alto — ${c.nome}`,
        desc: `${((fatura / c.limite) * 100).toFixed(0)}% do limite usado`,
      });
  });
  if (al.length === 0)
    al.push({
      tipo: "green",
      icon: "✅",
      titulo: "Tudo certo!",
      desc: "Nenhum alerta no momento.",
    });
  return al;
}

function Modal({ title, onClose, children, lg }) {
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`modal ${lg ? "modal-lg" : ""}`}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function DonutChart({ data, size = 120 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const r = size / 2 - 12,
    cx = size / 2,
    cy = size / 2,
    circ = 2 * Math.PI * r;
  const segs = data.map((d) => {
    const pct = total > 0 ? d.value / total : 0;
    const off = circ * (1 - pct);
    const rot = cum * 360;
    cum += pct;
    return { ...d, off, rot };
  });
  return (
    <div className="donut-wrap">
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--surface3)"
          strokeWidth={14}
        />
        {segs.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={14}
            strokeDasharray={`${circ} ${circ}`}
            strokeDashoffset={s.off}
            style={{
              transform: `rotate(${s.rot}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
            }}
          />
        ))}
      </svg>
      <div className="donut-legend">
        {data.slice(0, 6).map((d, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: d.color }} />
            <span className="legend-label">{d.label}</span>
            <span className="legend-val" style={{ color: d.color }}>
              {fmt(d.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ data, height = 160 }) {
  if (!data || data.length < 2)
    return (
      <div className="empty-state" style={{ padding: 20 }}>
        Dados insuficientes
      </div>
    );
  const W = 560,
    H = height,
    pad = { t: 16, r: 20, b: 36, l: 56 };
  const vals = data.map((d) => d.saldo);
  const minV = Math.min(...vals),
    maxV = Math.max(...vals);
  const range = maxV - minV || 1;
  const px = (i) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const py = (v) => pad.t + (1 - (v - minV) / range) * (H - pad.t - pad.b);
  const pts = data.map((d, i) => `${px(i)},${py(d.saldo)}`).join(" ");
  const area =
    `M${px(0)},${py(data[0].saldo)} ` +
    data
      .slice(1)
      .map((d, i) => `L${px(i + 1)},${py(d.saldo)}`)
      .join(" ") +
    ` L${px(data.length - 1)},${H - pad.b} L${px(0)},${H - pad.b} Z`;
  const ticks = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e07b3f" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e07b3f" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = minV + (range / ticks) * i;
        const y = py(v);
        return (
          <g key={i}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={y}
              y2={y}
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={pad.l - 6}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--muted)"
              fontFamily="var(--font-mono)"
            >
              {fmt(v).replace("R$\u00a0", "").replace(",00", "")}
            </text>
          </g>
        );
      })}
      <path d={area} fill="url(#lg)" />
      <polyline
        points={pts}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((d, i) => (
        <g key={i}>
          <circle
            cx={px(i)}
            cy={py(d.saldo)}
            r="5"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text
            x={px(i)}
            y={H - pad.b + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted)"
            fontWeight="600"
          >
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Login ──
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ user: "", senha: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErr("");
  };
  const handleLogin = () => {
    if (!form.user || !form.senha) return setErr("Preencha usuário e senha.");
    setLoading(true);
    setTimeout(() => {
      if (form.user === "familia" && form.senha === "admin123")
        onLogin({ id: "familia", nome: "Família", email: "familia" });
      else {
        setErr("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 800);
  };
  return (
    <>
      <style>{`
        .login-bg{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1208;position:relative;overflow:hidden}
        .login-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(60px);opacity:.18;animation:orb-float 8s ease-in-out infinite alternate}
        @keyframes orb-float{from{transform:translateY(0)}to{transform:translateY(-30px)}}
        .login-panel{display:flex;width:860px;max-width:96vw;min-height:520px;border-radius:28px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.55);position:relative;z-index:2}
        .login-left{flex:1.1;background:linear-gradient(145deg,#2c1a08,#1a0e04);padding:52px 44px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
        .login-left::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 90% 70% at 30% 80%,rgba(224,123,63,0.28) 0%,transparent 65%)}
        .login-lc{position:relative;z-index:1}
        .login-brand{display:flex;align-items:center;gap:12px;margin-bottom:48px}
        .login-brand-icon{width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#e07b3f,#f0b429);display:flex;align-items:center;justify-content:center;font-size:26px}
        .login-brand-name{font-size:26px;font-weight:800;color:#fff}
        .login-brand-sub{font-size:13px;color:rgba(255,255,255,0.45);font-weight:600;margin-top:1px}
        .login-headline{font-size:34px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px}
        .login-headline span{background:linear-gradient(90deg,#e07b3f,#f0b429);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .login-desc{font-size:14px;color:rgba(255,255,255,0.45);font-weight:600;line-height:1.7;margin-bottom:40px}
        .login-features{display:flex;flex-direction:column;gap:12px}
        .login-feature{display:flex;align-items:center;gap:12px}
        .login-feature-dot{width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
        .login-feature-text{font-size:13px;color:rgba(255,255,255,0.55);font-weight:600}
        .login-right{width:380px;background:#fffdf9;padding:52px 44px;display:flex;flex-direction:column;justify-content:center}
        .login-right-title{font-size:24px;font-weight:800;color:#3a2e24;margin-bottom:6px}
        .login-right-sub{font-size:13px;color:#a0897a;font-weight:600;margin-bottom:36px}
        .lf-group{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}
        .lf-label{font-size:11px;font-weight:800;color:#7a6558;letter-spacing:.6px;text-transform:uppercase}
        .lf-input-wrap{position:relative}
        .lf-input{width:100%;padding:13px 16px;font-size:14px;font-weight:600;background:#f5f0eb;border:1.5px solid rgba(180,140,100,0.2);border-radius:12px;color:#3a2e24;font-family:var(--font);outline:none;transition:all .18s}
        .lf-input:focus{border-color:#e07b3f;background:#fff;box-shadow:0 0 0 4px rgba(224,123,63,0.1)}
        .lf-input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none}
        .lf-input.with-icon{padding-left:42px}
        .lf-pass-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#a0897a;font-size:16px;padding:2px}
        .lf-err{background:#fff0f0;border:1.5px solid #f9c0c0;border-radius:10px;padding:10px 14px;font-size:13px;color:#d95f5f;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .lf-btn{width:100%;padding:14px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#e07b3f,#cf6e32);color:#fff;font-size:15px;font-weight:800;font-family:var(--font);box-shadow:0 6px 20px rgba(224,123,63,0.4);transition:all .2s;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px}
        .lf-btn:disabled{opacity:.7;cursor:not-allowed}
        .lf-spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
      `}</style>
      <div className="login-bg">
        <div
          className="login-orb"
          style={{
            width: 400,
            height: 400,
            background: "#e07b3f",
            top: "10%",
            left: "-8%",
          }}
        />
        <div
          className="login-orb"
          style={{
            width: 300,
            height: 300,
            background: "#6dab7b",
            bottom: "5%",
            right: "5%",
            animationDelay: "3s",
          }}
        />
        <div className="login-panel">
          <div className="login-left">
            <div className="login-lc">
              <div className="login-brand">
                <div className="login-brand-icon">🏡</div>
                <div>
                  <div className="login-brand-name">FinFamília</div>
                  <div className="login-brand-sub">Gestão Financeira</div>
                </div>
              </div>
              <h1 className="login-headline">
                Controle total
                <br />
                das suas <span>finanças</span>
              </h1>
              <p className="login-desc">
                Organize receitas, despesas, investimentos e reservas em um só
                lugar.
              </p>
              <div className="login-features">
                {[
                  ["📊", "Dashboard com gráficos"],
                  ["💳", "Controle de cartões e faturas"],
                  ["📅", "Contas a pagar com calendário"],
                  ["🔒", "Cofres e metas"],
                ].map(([icon, text]) => (
                  <div key={text} className="login-feature">
                    <div className="login-feature-dot">{icon}</div>
                    <span className="login-feature-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="login-right">
            <div className="login-right-title">Bem-vindo de volta 👋</div>
            <div className="login-right-sub">Entre com suas credenciais</div>
            <div className="lf-group">
              <div className="lf-label">Usuário</div>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">👤</span>
                <input
                  className="lf-input with-icon"
                  placeholder="familia"
                  value={form.user}
                  onChange={set("user")}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>
            <div className="lf-group">
              <div className="lf-label">Senha</div>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">🔑</span>
                <input
                  className="lf-input with-icon"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={set("senha")}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  style={{ paddingRight: 44 }}
                />
                <button
                  className="lf-pass-toggle"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {err && <div className="lf-err">⚠️ {err}</div>}
            <button className="lf-btn" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <>
                  <div className="lf-spinner" />
                  Entrando...
                </>
              ) : (
                "Entrar →"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Dashboard ──
function Dashboard({ contas, cartoes, txs, investimentos, cofre }) {
  const mesAtual = today().slice(0, 7);
  const contasComSaldo = useMemo(
    () => contas.map((c) => ({ ...c, saldo: calcSaldoConta(c, txs) })),
    [contas, txs],
  );
  const saldoEmContas = contasComSaldo.reduce((s, c) => s + c.saldo, 0);
  const totalInv = investimentos.reduce((s, i) => s + i.valor, 0);
  const totalCofre = cofre.reduce((s, c) => s + c.atual, 0);
  const patrimonio = saldoEmContas + totalInv + totalCofre;
  const txsMes = txs.filter((t) => t.data && t.data.startsWith(mesAtual));
  const entradas = txsMes
    .filter((t) => t.tipo === "entrada" && !t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const saidasConta = txsMes
    .filter((t) => t.tipo === "saida" && !t.cartaoId && !t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const pagFat = txsMes
    .filter((t) => t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const saidas = saidasConta + pagFat;
  const porCat = {};
  txsMes
    .filter((t) => t.tipo === "saida" && !t.isPagFatura)
    .forEach((t) => {
      porCat[t.categoria] = (porCat[t.categoria] || 0) + t.valor;
    });
  const catData = Object.entries(porCat).map(([k, v]) => ({
    label: k,
    value: v,
    color: CATEGORY_COLORS[k] || "#a09080",
  }));
  const alertas = calcAlertas(contasComSaldo, cartoes, txs);
  const urgentes = alertas.filter((a) => a.tipo === "red");
  const ultimas = [...txs]
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 6);
  return (
    <div>
      {urgentes.map((a, i) => (
        <div
          key={i}
          className="alert-item alert-red"
          style={{ marginBottom: 10 }}
        >
          <div style={{ fontSize: 20 }}>{a.icon}</div>
          <div>
            <div
              style={{ fontSize: 13, fontWeight: 800, color: "var(--accent3)" }}
            >
              {a.titulo}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted2)" }}>{a.desc}</div>
          </div>
        </div>
      ))}
      <div className="grid-4" style={{ marginBottom: 18 }}>
        {[
          {
            label: "Patrimônio Total",
            value: fmt(patrimonio),
            color: "var(--accent)",
            icon: "💎",
          },
          {
            label: "Entradas do Mês",
            value: fmt(entradas),
            color: "var(--accent2)",
            icon: "📈",
          },
          {
            label: "Saídas do Mês",
            value: fmt(saidas),
            color: "var(--accent3)",
            icon: "📉",
          },
          {
            label: "Saldo Líquido",
            value: fmt(entradas - saidas),
            color: entradas - saidas >= 0 ? "var(--accent2)" : "var(--accent3)",
            icon: "⚖️",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{ "--accent-color": s.color }}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{ marginBottom: 18 }}>
        <div className="card">
          <div className="section-header">
            <div className="section-title">🥧 Gastos por Categoria</div>
          </div>
          {catData.length > 0 ? (
            <DonutChart data={catData} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>Sem gastos este mês
            </div>
          )}
        </div>
        <div className="card">
          <div className="section-header">
            <div className="section-title">🏦 Contas & Cartões</div>
          </div>
          {contas.map((c) => {
            const s = calcSaldoConta(c, txs);
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                  padding: "10px 12px",
                  background: "var(--surface2)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: (c.cor || "#e07b3f") + "30",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  🏦
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{c.nome}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    {c.tipo}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: s >= 0 ? "var(--accent2)" : "var(--accent3)",
                  }}
                >
                  {fmt(s)}
                </div>
              </div>
            );
          })}
          {cartoes.map((c) => {
            const f = calcFaturaCartao(c.id, txs);
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                  padding: "10px 12px",
                  background: "var(--surface2)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: (c.cor || "#7b8fd4") + "30",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  💳
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{c.nome}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    Fatura: {fmt(f)}
                  </div>
                </div>
                <span className="badge badge-yellow">Crédito</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <div className="section-header">
          <div className="section-title">🕐 Últimas Transações</div>
        </div>
        {ultimas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💸</div>Nenhuma transação
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th style={{ textAlign: "right" }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {ultimas.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600 }}>{t.descricao}</td>
                    <td>
                      <span className="chip">
                        <span
                          className="color-dot"
                          style={{
                            background:
                              CATEGORY_COLORS[t.categoria] || "#a09080",
                          }}
                        />
                        {t.categoria || "-"}
                      </span>
                    </td>
                    <td style={{ color: "var(--muted)" }}>{fmtDate(t.data)}</td>
                    <td>
                      {t.tipo === "entrada" ? (
                        <span className="badge badge-green">Entrada</span>
                      ) : (
                        <span className="badge badge-red">Saída</span>
                      )}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontFamily: "var(--font-mono)",
                      }}
                      className={
                        t.tipo === "entrada" ? "text-green" : "text-red"
                      }
                    >
                      {t.tipo === "entrada" ? "+" : "-"}
                      {fmt(t.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Financeiro ──
function Financeiro({ contas, cartoes, txs, investimentos, cofre }) {
  const [mesSel, setMesSel] = useState(today().slice(0, 7));
  const navMes = (dir) => {
    const [y, m] = mesSel.split("-").map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    setMesSel(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  };
  const mesLabel = new Date(mesSel + "-02").toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const saldoEmContas = useMemo(
    () => contas.reduce((s, c) => s + calcSaldoConta(c, txs), 0),
    [contas, txs],
  );
  const faturaCartoes = useMemo(
    () => cartoes.reduce((s, c) => s + calcFaturaCartao(c.id, txs), 0),
    [cartoes, txs],
  );
  const totalInv = investimentos.reduce((s, i) => s + i.valor, 0);
  const totalCofre = cofre.reduce((s, c) => s + c.atual, 0);
  const patrimonioLiq = saldoEmContas + totalInv + totalCofre;
  const txsMes = txs.filter((t) => t.data && t.data.startsWith(mesSel));
  const entradasMes = txsMes
    .filter((t) => t.tipo === "entrada" && !t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const saidasContaMes = txsMes
    .filter((t) => t.tipo === "saida" && !t.cartaoId && !t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const pagFatMes = txsMes
    .filter((t) => t.isPagFatura)
    .reduce((s, t) => s + t.valor, 0);
  const despesasMes = saidasContaMes + pagFatMes;
  const saudeFin =
    saldoEmContas > 0 && faturaCartoes < saldoEmContas * 0.3
      ? "Saudável"
      : faturaCartoes > saldoEmContas
        ? "Atenção"
        : "Regular";
  const saudeCor =
    saudeFin === "Saudável"
      ? "var(--accent2)"
      : saudeFin === "Atenção"
        ? "var(--accent3)"
        : "var(--accent4)";
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(-1)}>
          ‹
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface)",
            border: "1.5px solid var(--border2)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 16px",
          }}
        >
          <span>📅</span>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              textTransform: "capitalize",
            }}
          >
            {mesLabel}
          </div>
          <input
            type="month"
            value={mesSel}
            onChange={(e) => setMesSel(e.target.value)}
            style={{
              marginLeft: "auto",
              width: "auto",
              padding: "4px 8px",
              fontSize: 12,
            }}
          />
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(1)}>
          ›
        </button>
      </div>
      <div
        className="card"
        style={{
          background: `linear-gradient(135deg,${saudeCor}18,var(--surface))`,
          borderColor: saudeCor + "44",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 40 }}>
          {saudeFin === "Saudável"
            ? "✅"
            : saudeFin === "Atenção"
              ? "⚠️"
              : "🟡"}
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Saúde Financeira
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: saudeCor }}>
            {saudeFin}
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
            Patrimônio Líquido
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              color: patrimonioLiq >= 0 ? "var(--accent2)" : "var(--accent3)",
            }}
          >
            {fmt(patrimonioLiq)}
          </div>
        </div>
      </div>
      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div
          className="card"
          style={{ borderColor: "var(--accent2)33", borderWidth: 1.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent2)20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🏦
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Saldo em Contas
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--accent2)",
                }}
              >
                {fmt(saldoEmContas)}
              </div>
            </div>
          </div>
          {contas.map((c) => {
            const s = calcSaldoConta(c, txs);
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                  {c.nome}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: s >= 0 ? "var(--accent2)" : "var(--accent3)",
                  }}
                >
                  {fmt(s)}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="card"
          style={{ borderColor: "var(--accent3)33", borderWidth: 1.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent3)20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              💳
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Faturas em Aberto
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--accent3)",
                }}
              >
                {fmt(faturaCartoes)}
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#fffbea",
              border: "1px solid #f7e08a",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 12,
              color: "#7a6200",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            ⚠️ Faturas não deduzem o saldo — só quando pagas
          </div>
          {cartoes.map((c) => {
            const f = calcFaturaCartao(c.id, txs);
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                  {c.nome}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent3)",
                  }}
                >
                  {fmt(f)}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="card"
          style={{ borderColor: "var(--accent)33", borderWidth: 1.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent)20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              📉
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Despesas do Mês
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                {fmt(despesasMes)}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700 }}>
              Entradas
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent2)",
              }}
            >
              +{fmt(entradasMes)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700 }}>
              Saldo do mês
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color:
                  entradasMes - despesasMes >= 0
                    ? "var(--accent2)"
                    : "var(--accent3)",
              }}
            >
              {fmt(entradasMes - despesasMes)}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${entradasMes > 0 ? Math.min((despesasMes / entradasMes) * 100, 100) : 100}%`,
                background: "var(--accent)",
              }}
            />
          </div>
        </div>
        <div
          className="card"
          style={{ borderColor: "var(--accent4)33", borderWidth: 1.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent4)20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🔒
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Reserva & Cofres
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--accent4)",
                }}
              >
                {fmt(totalCofre)}
              </div>
            </div>
          </div>
          {cofre.length === 0 && (
            <div
              style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}
            >
              Nenhum cofre cadastrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contas ──
function Contas({ contas, setContas, txs }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    tipo: "Conta Corrente",
    saldoInicial: "",
    cor: "#e07b3f",
    membro: "Alexandre",
  });
  const salvar = () => {
    if (!form.nome || form.saldoInicial === "") return;
    setContas((prev) => [
      ...prev,
      {
        id: genId(),
        nome: form.nome,
        tipo: form.tipo,
        saldoInicial: parseFloat(form.saldoInicial),
        cor: form.cor,
        membro: form.membro,
      },
    ]);
    setModal(false);
    setForm({
      nome: "",
      tipo: "Conta Corrente",
      saldoInicial: "",
      cor: "#e07b3f",
      membro: "Alexandre",
    });
  };
  const remover = (id) => setContas((prev) => prev.filter((c) => c.id !== id));
  const upd = (id, k, v) =>
    setContas((prev) => prev.map((c) => (c.id === id ? { ...c, [k]: v } : c)));
  const totalSaldo = useMemo(
    () => contas.reduce((s, c) => s + calcSaldoConta(c, txs), 0),
    [contas, txs],
  );
  return (
    <div>
      <div className="section-header">
        <div className="section-title">🏦 Contas Bancárias</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova Conta
        </button>
      </div>
      <div
        className="stat-card"
        style={{ "--accent-color": "var(--accent2)", marginBottom: 18 }}
      >
        <div className="stat-icon">🏦</div>
        <div className="stat-label">Saldo Total em Contas</div>
        <div className="stat-value">{fmt(totalSaldo)}</div>
      </div>
      {contas.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">🏦</div>Nenhuma conta ainda
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {contas.map((c) => {
            const saldo = calcSaldoConta(c, txs);
            return (
              <div
                key={c.id}
                className="card"
                style={{
                  borderColor: (c.cor || "#e07b3f") + "66",
                  borderWidth: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: (c.cor || "#e07b3f") + "25",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    🏦
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      type="color"
                      value={c.cor || "#e07b3f"}
                      onChange={(e) => upd(c.id, "cor", e.target.value)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        padding: 0,
                      }}
                    />
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => remover(c.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <input
                  value={c.nome}
                  onChange={(e) => upd(c.id, "nome", e.target.value)}
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    marginBottom: 8,
                    padding: "4px 8px",
                    width: "100%",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <select
                    value={c.tipo}
                    onChange={(e) => upd(c.id, "tipo", e.target.value)}
                    style={{
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 8,
                      border: "1px solid var(--border2)",
                      background: "var(--surface2)",
                      color: "var(--muted2)",
                      fontWeight: 600,
                      flex: 1,
                    }}
                  >
                    {[
                      "Conta Corrente",
                      "Conta Poupança",
                      "Conta Investimento",
                      "Carteira Digital",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    value={c.membro || "Alexandre"}
                    onChange={(e) => upd(c.id, "membro", e.target.value)}
                    style={{
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 8,
                      border: `1.5px solid ${MEMBRO_COR[c.membro || "Alexandre"]}66`,
                      background: MEMBRO_COR[c.membro || "Alexandre"] + "18",
                      color: MEMBRO_COR[c.membro || "Alexandre"],
                      fontWeight: 700,
                      flex: 1,
                    }}
                  >
                    {MEMBROS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  SALDO ATUAL
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 24,
                    fontWeight: 600,
                    color: saldo >= 0 ? "var(--accent2)" : "var(--accent3)",
                  }}
                >
                  {fmt(saldo)}
                </div>
                <div
                  style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}
                >
                  Saldo inicial: {fmt(c.saldoInicial)}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal && (
        <Modal title="🏦 Nova Conta" onClose={() => setModal(false)}>
          <div className="form-group">
            <label>Nome</label>
            <input
              placeholder="Ex: Nubank..."
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipo: e.target.value }))
                }
              >
                {[
                  "Conta Corrente",
                  "Conta Poupança",
                  "Conta Investimento",
                  "Carteira Digital",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Saldo Inicial (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={form.saldoInicial}
                onChange={(e) =>
                  setForm((f) => ({ ...f, saldoInicial: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Cor</label>
            <input
              type="color"
              value={form.cor}
              onChange={(e) => setForm((f) => ({ ...f, cor: e.target.value }))}
              style={{ height: 40 }}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Cartões ──
function Cartoes({ cartoes, setCartoes, contas, txs, setTxs }) {
  const [modal, setModal] = useState(false);
  const [modalPagar, setModalPagar] = useState(null);
  const [modalDetalhe, setModalDetalhe] = useState(null);
  const [modalHistorico, setModalHistorico] = useState(null);
  const [mesFatHist, setMesFatHist] = useState(today().slice(0, 7));
  const [contaPagtoId, setContaPagtoId] = useState(contas[0]?.id || "");
  const [form, setForm] = useState({
    nome: "",
    membro: "Alexandre",
    limite: "",
    fechamento: "",
    vencimento: "",
    cor: "#7b8fd4",
  });
  const upd = (id, k, v) =>
    setCartoes((prev) => prev.map((c) => (c.id === id ? { ...c, [k]: v } : c)));
  const salvar = () => {
    if (!form.nome || !form.limite) return;
    setCartoes((prev) => [
      ...prev,
      {
        id: genId(),
        nome: form.nome,
        membro: form.membro,
        limite: parseFloat(form.limite),
        fechamento: parseInt(form.fechamento) || 1,
        vencimento: parseInt(form.vencimento) || 10,
        cor: form.cor,
      },
    ]);
    setModal(false);
    setForm({
      nome: "",
      membro: "Alexandre",
      limite: "",
      fechamento: "",
      vencimento: "",
      cor: "#7b8fd4",
    });
  };
  const remover = (id) => setCartoes((prev) => prev.filter((c) => c.id !== id));
  const pagarFatura = () => {
    if (!modalPagar || !contaPagtoId) return;
    const fatura = calcFaturaCartao(modalPagar.id, txs);
    if (fatura <= 0) return;
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "saida",
        descricao: `Pagamento fatura ${modalPagar.nome}`,
        valor: fatura,
        data: today(),
        categoria: "Outros",
        contaId: contaPagtoId,
        cartaoId: null,
        isPagFatura: true,
        cartaoPagoId: modalPagar.id,
      },
    ]);
    setModalPagar(null);
  };
  const totalFatura = useMemo(
    () => cartoes.reduce((s, c) => s + calcFaturaCartao(c.id, txs), 0),
    [cartoes, txs],
  );
  return (
    <div>
      <div className="section-header">
        <div className="section-title">💳 Cartões de Crédito</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Novo Cartão
        </button>
      </div>
      <div
        className="stat-card"
        style={{ "--accent-color": "var(--accent3)", marginBottom: 18 }}
      >
        <div className="stat-icon">💳</div>
        <div className="stat-label">Total em Faturas em Aberto</div>
        <div className="stat-value">{fmt(totalFatura)}</div>
      </div>
      {cartoes.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">💳</div>Nenhum cartão ainda
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {cartoes.map((c) => {
            const fatura = calcFaturaCartao(c.id, txs);
            const pct = Math.min(
              c.limite > 0 ? (fatura / c.limite) * 100 : 0,
              100,
            );
            const dias = c.vencimento ? diasParaVencimento(c.vencimento) : 999;
            const vencido = dias < 0 && fatura > 0,
              vencendo = dias <= 2 && fatura > 0 && !vencido,
              proxAlerta = dias <= 7 && dias > 2 && fatura > 0;
            return (
              <div
                key={c.id}
                className={`card ${vencido ? "card-overdue" : ""}`}
                style={{
                  borderColor: vencido
                    ? "var(--accent3)"
                    : vencendo
                      ? "var(--accent4)"
                      : (c.cor || "#7b8fd4") + "66",
                  borderWidth: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <input
                      value={c.nome}
                      onChange={(e) => upd(c.id, "nome", e.target.value)}
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        padding: "2px 6px",
                        width: "100%",
                        marginBottom: 4,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: 13 }}>
                        {MEMBRO_EMOJI[c.membro || "Alexandre"]}
                      </span>
                      <select
                        value={c.membro || "Alexandre"}
                        onChange={(e) => upd(c.id, "membro", e.target.value)}
                        style={{
                          fontSize: 12,
                          padding: "2px 6px",
                          borderRadius: 8,
                          border: `1.5px solid ${MEMBRO_COR[c.membro || "Alexandre"]}66`,
                          background:
                            MEMBRO_COR[c.membro || "Alexandre"] + "18",
                          color: MEMBRO_COR[c.membro || "Alexandre"],
                          fontWeight: 700,
                        }}
                      >
                        {MEMBROS.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      Fecha dia{" "}
                      <input
                        type="number"
                        value={c.fechamento}
                        min="1"
                        max="31"
                        onChange={(e) =>
                          upd(c.id, "fechamento", parseInt(e.target.value))
                        }
                        style={{
                          width: 40,
                          padding: "2px 4px",
                          fontSize: 11,
                          display: "inline",
                          textAlign: "center",
                        }}
                      />{" "}
                      · Vence dia{" "}
                      <input
                        type="number"
                        value={c.vencimento}
                        min="1"
                        max="31"
                        onChange={(e) =>
                          upd(c.id, "vencimento", parseInt(e.target.value))
                        }
                        style={{
                          width: 40,
                          padding: "2px 4px",
                          fontSize: 11,
                          display: "inline",
                          textAlign: "center",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      type="color"
                      value={c.cor || "#7b8fd4"}
                      onChange={(e) => upd(c.id, "cor", e.target.value)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        padding: 0,
                      }}
                    />
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => remover(c.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                {vencido && (
                  <div
                    style={{
                      background: "#fff0f0",
                      border: "1.5px solid #f9c0c0",
                      borderRadius: 10,
                      padding: "8px 12px",
                      marginBottom: 12,
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--accent3)",
                    }}
                  >
                    🚨 FATURA VENCIDA há {Math.abs(dias)} dia(s)!
                  </div>
                )}
                {vencendo && (
                  <div
                    style={{
                      background: "#fffbea",
                      border: "1.5px solid #f7e08a",
                      borderRadius: 10,
                      padding: "8px 12px",
                      marginBottom: 12,
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#b8860b",
                    }}
                  >
                    ⚠️ Vence{" "}
                    {dias === 0
                      ? "hoje"
                      : dias === 1
                        ? "amanhã"
                        : `em ${dias} dias`}
                    !
                  </div>
                )}
                {proxAlerta && (
                  <div
                    style={{
                      background: "#f0f4ff",
                      border: "1px solid #c5d0f5",
                      borderRadius: 10,
                      padding: "6px 12px",
                      marginBottom: 12,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--accent5)",
                    }}
                  >
                    📅 Vence em {dias} dias
                  </div>
                )}
                {(() => {
                  const diasF = c.fechamento
                    ? diasParaVencimento(c.fechamento)
                    : 999;
                  if (fatura <= 0) return null;
                  if (diasF < 0)
                    return (
                      <div
                        style={{
                          background: "#fff0f0",
                          border: "1.5px solid #f9c0c0",
                          borderRadius: 10,
                          padding: "6px 12px",
                          marginBottom: 12,
                          fontSize: 12,
                          fontWeight: 800,
                          color: "var(--accent3)",
                        }}
                      >
                        ✂️ Fatura fechou há {Math.abs(diasF)} dia(s)
                      </div>
                    );
                  if (diasF === 0)
                    return (
                      <div
                        style={{
                          background: "#fff0f0",
                          border: "1.5px solid #f9c0c0",
                          borderRadius: 10,
                          padding: "6px 12px",
                          marginBottom: 12,
                          fontSize: 12,
                          fontWeight: 800,
                          color: "var(--accent3)",
                        }}
                      >
                        ✂️ Fatura fecha HOJE!
                      </div>
                    );
                  if (diasF <= 2)
                    return (
                      <div
                        style={{
                          background: "#fffbea",
                          border: "1.5px solid #f7e08a",
                          borderRadius: 10,
                          padding: "6px 12px",
                          marginBottom: 12,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#b8860b",
                        }}
                      >
                        ✂️ Fecha em {diasF} dia(s)
                      </div>
                    );
                  if (diasF <= 5)
                    return (
                      <div
                        style={{
                          background: "#f0f4ff",
                          border: "1px solid #c5d0f5",
                          borderRadius: 10,
                          padding: "6px 12px",
                          marginBottom: 12,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--accent5)",
                        }}
                      >
                        ✂️ Fecha em {diasF} dias
                      </div>
                    );
                  return null;
                })()}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      FATURA ATUAL
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 22,
                        color: fatura > 0 ? "var(--accent3)" : "var(--accent2)",
                      }}
                    >
                      {fmt(fatura)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      LIMITE
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span style={{ fontSize: 13, color: "var(--muted2)" }}>
                        R$
                      </span>
                      <input
                        type="number"
                        value={c.limite}
                        onChange={(e) =>
                          upd(c.id, "limite", parseFloat(e.target.value) || 0)
                        }
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--muted2)",
                          width: 80,
                          padding: "2px 4px",
                          textAlign: "right",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span>Disponível: {fmt(c.limite - fatura)}</span>
                  <span>{pct.toFixed(0)}% usado</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 14 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background:
                        pct > 80
                          ? "var(--accent3)"
                          : pct > 50
                            ? "var(--accent4)"
                            : "var(--accent2)",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={() => setModalDetalhe(c)}
                  >
                    🔍 Ver Fatura
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={() => setModalHistorico(c)}
                  >
                    📅 Histórico
                  </button>
                </div>
                {fatura > 0 ? (
                  vencendo || vencido ? (
                    <button
                      className="btn btn-pay w-full"
                      style={{ justifyContent: "center", marginTop: 8 }}
                      onClick={() => {
                        setContaPagtoId(contas[0]?.id || "");
                        setModalPagar(c);
                      }}
                    >
                      💳 Pagar Fatura Agora — {fmt(fatura)}
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary w-full"
                      style={{ justifyContent: "center", marginTop: 8 }}
                      onClick={() => {
                        setContaPagtoId(contas[0]?.id || "");
                        setModalPagar(c);
                      }}
                    >
                      💸 Pagar Fatura — {fmt(fatura)}
                    </button>
                  )
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "10px 0",
                      color: "var(--accent2)",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    ✅ Fatura zerada!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {modal && (
        <Modal title="💳 Novo Cartão" onClose={() => setModal(false)}>
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                placeholder="Ex: Nubank..."
                value={form.nome}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nome: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Titular</label>
              <select
                value={form.membro}
                onChange={(e) =>
                  setForm((f) => ({ ...f, membro: e.target.value }))
                }
              >
                {MEMBROS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Limite (R$)</label>
              <input
                type="number"
                placeholder="5000"
                value={form.limite}
                onChange={(e) =>
                  setForm((f) => ({ ...f, limite: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Cor</label>
              <input
                type="color"
                value={form.cor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cor: e.target.value }))
                }
                style={{ height: 40 }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Dia Fechamento</label>
              <input
                type="number"
                placeholder="25"
                min="1"
                max="31"
                value={form.fechamento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fechamento: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Dia Vencimento</label>
              <input
                type="number"
                placeholder="2"
                min="1"
                max="31"
                value={form.vencimento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vencimento: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
      {modalDetalhe &&
        (() => {
          const gastosFatura = txs.filter(
            (t) =>
              t.cartaoId === modalDetalhe.id &&
              t.tipo === "saida" &&
              !t.isPagFatura,
          );
          const totalFat = gastosFatura.reduce((s, t) => s + t.valor, 0);
          const porCat = {};
          gastosFatura.forEach((t) => {
            porCat[t.categoria] = (porCat[t.categoria] || 0) + t.valor;
          });
          const catData = Object.entries(porCat).sort((a, b) => b[1] - a[1]);
          return (
            <Modal
              title={`🔍 Fatura Atual — ${modalDetalhe.nome}`}
              onClose={() => setModalDetalhe(null)}
              lg
            >
              <div
                style={{
                  background: "linear-gradient(135deg,#fdeaea,#fff5f5)",
                  border: "1.5px solid #f9c0c0",
                  borderRadius: 14,
                  padding: "14px 20px",
                  marginBottom: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Total em Aberto
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 30,
                      fontWeight: 700,
                      color: "var(--accent3)",
                    }}
                  >
                    {fmt(totalFat)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontWeight: 700,
                    }}
                  >
                    Vencimento
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    Dia {modalDetalhe.vencimento || "—"}
                  </div>
                </div>
              </div>
              {catData.length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "var(--muted2)",
                      marginBottom: 10,
                    }}
                  >
                    Por Categoria
                  </div>
                  {catData.map(([cat, val]) => {
                    const pct = totalFat > 0 ? (val / totalFat) * 100 : 0;
                    return (
                      <div key={cat} style={{ marginBottom: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 5,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 7,
                            }}
                          >
                            <span
                              className="color-dot"
                              style={{
                                background: CATEGORY_COLORS[cat] || "#a09080",
                              }}
                            />
                            <span style={{ fontSize: 13, fontWeight: 700 }}>
                              {cat}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--muted)",
                                fontWeight: 600,
                              }}
                            >
                              {pct.toFixed(1)}%
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 13,
                                color: CATEGORY_COLORS[cat] || "var(--accent3)",
                                fontWeight: 700,
                              }}
                            >
                              {fmt(val)}
                            </span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${pct}%`,
                              background:
                                CATEGORY_COLORS[cat] || "var(--accent)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--muted2)",
                  marginBottom: 10,
                }}
              >
                Lançamentos ({gastosFatura.length})
              </div>
              {gastosFatura.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧾</div>Nenhum lançamento
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th style={{ textAlign: "right" }}>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...gastosFatura]
                        .sort((a, b) => b.data.localeCompare(a.data))
                        .map((t) => (
                          <tr key={t.id}>
                            <td style={{ fontWeight: 700 }}>{t.descricao}</td>
                            <td>
                              <span className="chip">
                                <span
                                  className="color-dot"
                                  style={{
                                    background:
                                      CATEGORY_COLORS[t.categoria] || "#a09080",
                                  }}
                                />
                                {t.categoria || "—"}
                              </span>
                            </td>
                            <td style={{ color: "var(--muted)" }}>
                              {fmtDate(t.data)}
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                color: "var(--accent3)",
                                fontWeight: 700,
                              }}
                            >
                              {fmt(t.valor)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalDetalhe(null)}
                >
                  Fechar
                </button>
                {totalFat > 0 && (
                  <button
                    className="btn btn-pay"
                    onClick={() => {
                      setModalDetalhe(null);
                      setContaPagtoId(contas[0]?.id || "");
                      setModalPagar(modalDetalhe);
                    }}
                  >
                    💳 Pagar — {fmt(totalFat)}
                  </button>
                )}
              </div>
            </Modal>
          );
        })()}
      {modalHistorico &&
        (() => {
          const navH = (dir) => {
            const [y, m] = mesFatHist.split("-").map(Number);
            const d = new Date(y, m - 1 + dir, 1);
            setMesFatHist(
              `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
            );
          };
          const mesLabelH = new Date(mesFatHist + "-02").toLocaleDateString(
            "pt-BR",
            { month: "long", year: "numeric" },
          );
          const gastosHist = txs.filter(
            (t) =>
              t.cartaoId === modalHistorico.id &&
              t.tipo === "saida" &&
              !t.isPagFatura &&
              t.data &&
              t.data.startsWith(mesFatHist),
          );
          const totalHist = gastosHist.reduce((s, t) => s + t.valor, 0);
          const pagamentos = txs.filter(
            (t) =>
              t.isPagFatura &&
              t.cartaoPagoId === modalHistorico.id &&
              t.data &&
              t.data.startsWith(mesFatHist),
          );
          const totalPago = pagamentos.reduce((s, t) => s + t.valor, 0);
          const meses6 = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const v = txs
              .filter(
                (t) =>
                  t.cartaoId === modalHistorico.id &&
                  t.tipo === "saida" &&
                  !t.isPagFatura &&
                  t.data &&
                  t.data.startsWith(k),
              )
              .reduce((s, t) => s + t.valor, 0);
            return {
              k,
              label: d
                .toLocaleDateString("pt-BR", { month: "short" })
                .replace(".", ""),
              valor: v,
            };
          });
          const maxBar = Math.max(...meses6.map((m) => m.valor), 1);
          return (
            <Modal
              title={`📅 Histórico — ${modalHistorico.nome}`}
              onClose={() => setModalHistorico(null)}
              lg
            >
              <div
                className="card"
                style={{
                  marginBottom: 18,
                  border: "1.5px solid var(--border2)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--muted2)",
                    marginBottom: 14,
                  }}
                >
                  Gastos — últimos 6 meses
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    height: 110,
                    paddingBottom: 24,
                  }}
                >
                  {meses6.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "flex-end",
                        gap: 3,
                        cursor: "pointer",
                      }}
                      onClick={() => setMesFatHist(m.k)}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontFamily: "var(--font-mono)",
                          color:
                            m.k === mesFatHist
                              ? "var(--accent3)"
                              : "var(--muted)",
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        {m.valor > 0
                          ? fmt(m.valor).replace("R$\u00a0", "R$")
                          : ""}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          background:
                            m.k === mesFatHist
                              ? "var(--accent3)"
                              : "var(--surface3)",
                          borderRadius: "6px 6px 0 0",
                          height: `${(m.valor / maxBar) * 72}px`,
                          minHeight: m.valor > 0 ? 6 : 2,
                          transition: "height .3s",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 10,
                          color:
                            m.k === mesFatHist
                              ? "var(--accent3)"
                              : "var(--muted)",
                          fontWeight: 700,
                          textTransform: "capitalize",
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navH(-1)}
                >
                  ‹
                </button>
                <div
                  style={{
                    flex: 1,
                    background: "var(--surface2)",
                    border: "1.5px solid var(--border2)",
                    borderRadius: 12,
                    padding: "8px 16px",
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {mesLabelH}
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navH(1)}
                >
                  ›
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                {[
                  ["Gastos", fmt(totalHist), "var(--accent3)", "🧾"],
                  ["Pago", fmt(totalPago), "var(--accent2)", "✅"],
                  [
                    "Saldo",
                    fmt(totalPago - totalHist),
                    totalPago >= totalHist
                      ? "var(--accent2)"
                      : "var(--accent3)",
                    "⚖️",
                  ],
                ].map(([l, v, c, ic]) => (
                  <div
                    key={l}
                    style={{
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "12px 14px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{ic}</div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 16,
                        fontWeight: 700,
                        color: c,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--muted)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginTop: 3,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              {gastosHist.length === 0 ? (
                <div className="empty-state" style={{ padding: 20 }}>
                  <div className="empty-icon">🧾</div>Nenhum lançamento neste
                  mês
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th style={{ textAlign: "right" }}>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...gastosHist]
                        .sort((a, b) => b.data.localeCompare(a.data))
                        .map((t) => (
                          <tr key={t.id}>
                            <td style={{ fontWeight: 700 }}>{t.descricao}</td>
                            <td>
                              <span className="chip">
                                <span
                                  className="color-dot"
                                  style={{
                                    background:
                                      CATEGORY_COLORS[t.categoria] || "#a09080",
                                  }}
                                />
                                {t.categoria || "—"}
                              </span>
                            </td>
                            <td style={{ color: "var(--muted)" }}>
                              {fmtDate(t.data)}
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                color: "var(--accent3)",
                                fontWeight: 700,
                              }}
                            >
                              {fmt(t.valor)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalHistorico(null)}
                >
                  Fechar
                </button>
              </div>
            </Modal>
          );
        })()}
      {modalPagar &&
        (() => {
          const fatura = calcFaturaCartao(modalPagar.id, txs);
          const contaSel = contas.find((c) => c.id === contaPagtoId);
          const saldoConta = contaSel ? calcSaldoConta(contaSel, txs) : 0;
          return (
            <Modal
              title={`💳 Pagar Fatura — ${modalPagar.nome}`}
              onClose={() => setModalPagar(null)}
            >
              <div
                style={{
                  background: "linear-gradient(135deg,#e6f7ec,#f0faf4)",
                  border: "1.5px solid #a8debb",
                  borderRadius: 14,
                  padding: "16px 20px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--muted2)",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Valor da Fatura
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "var(--accent3)",
                  }}
                >
                  {fmt(fatura)}
                </div>
              </div>
              <div className="form-group">
                <label>Descontar de qual conta?</label>
                {contas.length === 0 ? (
                  <div
                    style={{
                      padding: 12,
                      background: "#fff0f0",
                      borderRadius: 10,
                      fontSize: 13,
                      color: "var(--accent3)",
                      fontWeight: 700,
                    }}
                  >
                    Nenhuma conta cadastrada.
                  </div>
                ) : (
                  <select
                    value={contaPagtoId}
                    onChange={(e) => setContaPagtoId(e.target.value)}
                  >
                    {contas.map((c) => {
                      const s = calcSaldoConta(c, txs);
                      return (
                        <option key={c.id} value={c.id}>
                          {c.nome} — Saldo: {fmt(s)}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              {contaSel && (
                <div
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border2)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                      Saldo atual
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent2)",
                      }}
                    >
                      {fmt(saldoConta)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 1,
                      background: "var(--border2)",
                      margin: "8px 0",
                    }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: 800 }}>Saldo após</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        color:
                          saldoConta - fatura >= 0
                            ? "var(--accent2)"
                            : "var(--accent3)",
                      }}
                    >
                      {fmt(saldoConta - fatura)}
                    </span>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalPagar(null)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-pay"
                  onClick={pagarFatura}
                  disabled={contas.length === 0 || fatura <= 0}
                >
                  ✅ Confirmar Pagamento
                </button>
              </div>
            </Modal>
          );
        })()}
    </div>
  );
}

// ── Despesas ──
function Despesas({ txs, setTxs, contas, cartoes }) {
  const [aba, setAba] = useState("diarias");
  const [mesSel, setMesSel] = useState(today().slice(0, 7));
  const [modal, setModal] = useState(false);
  const blank = () => ({
    descricao: "",
    valor: "",
    data: today(),
    categoria: "Alimentação",
    pagamento: "conta",
    contaId: contas[0]?.id || "",
    cartaoId: cartoes[0]?.id || "",
  });
  const [form, setForm] = useState(blank());
  const navMes = (dir) => {
    const [y, m] = mesSel.split("-").map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    setMesSel(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  };
  const mesLabel = new Date(mesSel + "-02").toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const salvar = () => {
    if (!form.descricao || !form.valor) return;
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "saida",
        descricao: form.descricao,
        valor: parseFloat(form.valor),
        data: form.data,
        categoria: form.categoria,
        fixa: aba === "fixas",
        contaId: form.pagamento === "conta" ? form.contaId : null,
        cartaoId: form.pagamento === "cartao" ? form.cartaoId : null,
        isPagFatura: false,
      },
    ]);
    setModal(false);
    setForm(blank());
  };
  const remover = (id) => setTxs((prev) => prev.filter((t) => t.id !== id));
  const diarias = txs.filter(
    (t) =>
      t.tipo === "saida" &&
      !t.fixa &&
      !t.isPagFatura &&
      t.data &&
      t.data.startsWith(mesSel),
  );
  const fixas = txs.filter(
    (t) =>
      t.tipo === "saida" &&
      t.fixa &&
      !t.isPagFatura &&
      t.data &&
      t.data.startsWith(mesSel),
  );
  const itens = aba === "diarias" ? diarias : fixas;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(-1)}>
          ‹
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface)",
            border: "1.5px solid var(--border2)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 16px",
          }}
        >
          <span>📅</span>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              textTransform: "capitalize",
            }}
          >
            {mesLabel}
          </div>
          <input
            type="month"
            value={mesSel}
            onChange={(e) => setMesSel(e.target.value)}
            style={{
              marginLeft: "auto",
              width: "auto",
              padding: "4px 8px",
              fontSize: 12,
            }}
          />
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(1)}>
          ›
        </button>
      </div>
      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent3)" }}
        >
          <div className="stat-label">Total</div>
          <div className="stat-value">
            {fmt(
              diarias.reduce((s, t) => s + t.valor, 0) +
                fixas.reduce((s, t) => s + t.valor, 0),
            )}
          </div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent)" }}
        >
          <div className="stat-label">Diárias</div>
          <div className="stat-value">
            {fmt(diarias.reduce((s, t) => s + t.valor, 0))}
          </div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent5)" }}
        >
          <div className="stat-label">Fixas</div>
          <div className="stat-value">
            {fmt(fixas.reduce((s, t) => s + t.valor, 0))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <div className="tabs" style={{ flex: 1, marginBottom: 0 }}>
          <button
            className={`tab ${aba === "diarias" ? "active" : ""}`}
            onClick={() => setAba("diarias")}
          >
            📆 Diárias
          </button>
          <button
            className={`tab ${aba === "fixas" ? "active" : ""}`}
            onClick={() => setAba("fixas")}
          >
            📌 Fixas
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova Despesa
        </button>
      </div>
      <div className="card">
        {itens.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🧾</div>Nenhuma despesa
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Pagamento</th>
                  <th>Data</th>
                  <th style={{ textAlign: "right" }}>Valor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...itens]
                  .sort((a, b) => b.data.localeCompare(a.data))
                  .map((t) => {
                    const conta = contas.find((c) => c.id === t.contaId);
                    const cartao = cartoes.find((c) => c.id === t.cartaoId);
                    return (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 700 }}>{t.descricao}</td>
                        <td>
                          <span className="chip">
                            <span
                              className="color-dot"
                              style={{
                                background:
                                  CATEGORY_COLORS[t.categoria] || "#a09080",
                              }}
                            />
                            {t.categoria}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: "var(--muted2)" }}>
                          {cartao
                            ? `💳 ${cartao.nome}`
                            : conta
                              ? `🏦 ${conta.nome}`
                              : "-"}
                        </td>
                        <td style={{ color: "var(--muted)" }}>
                          {fmtDate(t.data)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontFamily: "var(--font-mono)",
                            color: "var(--accent3)",
                          }}
                        >
                          {fmt(t.valor)}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => remover(t.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <Modal title="🧾 Nova Despesa" onClose={() => setModal(false)} lg>
          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input
                placeholder="Ex: Mercado..."
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={form.valor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) =>
                  setForm((f) => ({ ...f, data: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoria: e.target.value }))
                }
              >
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Pagamento</label>
            <div className="tabs" style={{ marginBottom: 0 }}>
              <button
                className={`tab ${form.pagamento === "conta" ? "active" : ""}`}
                onClick={() => setForm((f) => ({ ...f, pagamento: "conta" }))}
              >
                🏦 Conta
              </button>
              <button
                className={`tab ${form.pagamento === "cartao" ? "active" : ""}`}
                onClick={() => setForm((f) => ({ ...f, pagamento: "cartao" }))}
              >
                💳 Cartão
              </button>
            </div>
          </div>
          {form.pagamento === "conta" ? (
            <div className="form-group">
              <label>Conta</label>
              <select
                value={form.contaId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contaId: e.target.value }))
                }
              >
                {contas.map((c) => {
                  const s = calcSaldoConta(c, txs);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.nome} — {fmt(s)}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label>Cartão</label>
              <select
                value={form.cartaoId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cartaoId: e.target.value }))
                }
              >
                {cartoes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Registrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CompAnexo({ t, setTxs, onVer }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const b64 = await comprimirImagem(file);
      setTxs((prev) =>
        prev.map((x) => (x.id === t.id ? { ...x, comprovante: b64 } : x)),
      );
    } catch (err) {
      alert("Erro ao processar imagem: " + err.message);
    } finally {
      setLoading(false);
    }
    e.target.value = "";
  };
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
      <button
        title="Anexar comprovante"
        className="btn btn-ghost btn-sm"
        style={{
          padding: "3px 7px",
          background: t.comprovante
            ? "var(--accent2)20"
            : loading
              ? "var(--accent4)20"
              : "",
          border: `1px solid ${t.comprovante ? "var(--accent2)" : loading ? "var(--accent4)" : "var(--border2)"}`,
          borderRadius: 8,
          minWidth: 28,
        }}
        onClick={() => !loading && inputRef.current && inputRef.current.click()}
      >
        {loading ? "⏳" : t.comprovante ? "🖼️" : "📎"}
      </button>
      {t.comprovante && (
        <button
          title="Ver"
          className="btn btn-ghost btn-sm"
          style={{ padding: "3px 6px" }}
          onClick={onVer}
        >
          👁️
        </button>
      )}
      {t.comprovante && (
        <button
          title="Remover"
          className="btn btn-ghost btn-sm"
          style={{ padding: "3px 6px", color: "var(--accent3)" }}
          onClick={() =>
            setTxs((prev) =>
              prev.map((x) =>
                x.id === t.id ? { ...x, comprovante: null } : x,
              ),
            )
          }
        >
          🗑️
        </button>
      )}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setTxs((prev) => prev.filter((x) => x.id !== t.id))}
      >
        ✕
      </button>
    </div>
  );
}

// ── Transferência entre contas ──
function ModalTransferencia({ contas, txs, setTxs, onClose }) {
  const [form, setForm] = useState({
    contaOrigemId: contas[0]?.id || "",
    contaDestinoId: contas[1]?.id || contas[0]?.id || "",
    valor: "",
    data: today(),
    descricao: "Transferência entre contas",
  });
  const [erro, setErro] = useState("");
  const origem = contas.find((c) => c.id === form.contaOrigemId);
  const destino = contas.find((c) => c.id === form.contaDestinoId);
  const saldoOrigem = origem ? calcSaldoConta(origem, txs) : 0;
  const confirmar = () => {
    if (!form.valor || parseFloat(form.valor) <= 0)
      return setErro("Informe um valor válido.");
    if (form.contaOrigemId === form.contaDestinoId)
      return setErro("Origem e destino devem ser contas diferentes.");
    const v = parseFloat(form.valor);
    if (v > saldoOrigem)
      return setErro("Saldo insuficiente na conta de origem.");
    const id = genId();
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "saida",
        descricao: `↗️ ${form.descricao} → ${destino?.nome}`,
        valor: v,
        data: form.data,
        categoria: "Outros",
        fixa: false,
        isPagFatura: false,
        contaId: form.contaOrigemId,
        cartaoId: null,
        transferenciaId: id,
      },
      {
        id: genId(),
        tipo: "entrada",
        descricao: `↙️ ${form.descricao} ← ${origem?.nome}`,
        valor: v,
        data: form.data,
        categoria: "Outros",
        fixa: false,
        isPagFatura: false,
        contaId: form.contaDestinoId,
        cartaoId: null,
        transferenciaId: id,
      },
    ]);
    onClose();
  };
  return (
    <Modal title="🔀 Transferência entre Contas" onClose={onClose}>
      {erro && (
        <div className="alert-item alert-red" style={{ marginBottom: 14 }}>
          <span>⚠️</span>
          <span
            style={{ fontSize: 13, fontWeight: 700, color: "var(--accent3)" }}
          >
            {erro}
          </span>
        </div>
      )}
      <div
        style={{
          background: "var(--surface2)",
          border: "1.5px solid var(--border2)",
          borderRadius: 14,
          padding: "16px",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              ORIGEM
            </div>
            <select
              value={form.contaOrigemId}
              onChange={(e) => {
                setErro("");
                setForm((f) => ({ ...f, contaOrigemId: e.target.value }));
              }}
            >
              {contas.map((c) => {
                const s = calcSaldoConta(c, txs);
                return (
                  <option key={c.id} value={c.id}>
                    {c.nome} — {fmt(s)}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{ fontSize: 26, marginTop: 18, color: "var(--accent)" }}>
            →
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              DESTINO
            </div>
            <select
              value={form.contaDestinoId}
              onChange={(e) => {
                setErro("");
                setForm((f) => ({ ...f, contaDestinoId: e.target.value }));
              }}
            >
              {contas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        {origem && destino && form.contaOrigemId !== form.contaDestinoId && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 12px",
              background: "var(--surface)",
              borderRadius: 10,
              border: "1px solid var(--border)",
              fontSize: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700 }}>
              Saldo disponível em <b>{origem.nome}</b>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: saldoOrigem >= 0 ? "var(--accent2)" : "var(--accent3)",
                fontWeight: 700,
              }}
            >
              {fmt(saldoOrigem)}
            </span>
          </div>
        )}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Valor (R$)</label>
          <input
            type="number"
            placeholder="0,00"
            value={form.valor}
            onChange={(e) => {
              setErro("");
              setForm((f) => ({ ...f, valor: e.target.value }));
            }}
          />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={form.data}
            onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          value={form.descricao}
          onChange={(e) =>
            setForm((f) => ({ ...f, descricao: e.target.value }))
          }
        />
      </div>
      {form.valor &&
        parseFloat(form.valor) > 0 &&
        form.contaOrigemId !== form.contaDestinoId && (
          <div
            style={{
              background: "linear-gradient(135deg,#e6f7ec,#f0faf4)",
              border: "1.5px solid #a8debb",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                {origem?.nome} após
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    saldoOrigem - parseFloat(form.valor) >= 0
                      ? "var(--accent2)"
                      : "var(--accent3)",
                  fontWeight: 700,
                }}
              >
                {fmt(saldoOrigem - parseFloat(form.valor))}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                {destino?.nome} após
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent2)",
                  fontWeight: 700,
                }}
              >
                {fmt(calcSaldoConta(destino, txs) + parseFloat(form.valor))}
              </span>
            </div>
          </div>
        )}
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={confirmar}>
          🔀 Transferir
        </button>
      </div>
    </Modal>
  );
}

// ── Transações ──
function Transacoes({ txs, setTxs, contas, cartoes }) {
  const [modal, setModal] = useState(false);
  const [modalComp, setModalComp] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [form, setForm] = useState({
    tipo: "saida",
    descricao: "",
    valor: "",
    data: today(),
    categoria: "Alimentação",
    pagamento: "conta",
    contaId: contas[0]?.id || "",
    cartaoId: cartoes[0]?.id || "",
  });
  const salvar = () => {
    if (!form.descricao || !form.valor) return;
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: form.tipo,
        descricao: form.descricao,
        valor: parseFloat(form.valor),
        data: form.data,
        categoria: form.categoria,
        fixa: false,
        isPagFatura: false,
        contaId:
          form.tipo === "entrada" ||
          (form.tipo === "saida" && form.pagamento === "conta")
            ? form.contaId
            : null,
        cartaoId:
          form.tipo === "saida" && form.pagamento === "cartao"
            ? form.cartaoId
            : null,
      },
    ]);
    setModal(false);
    setForm({
      tipo: "saida",
      descricao: "",
      valor: "",
      data: today(),
      categoria: "Alimentação",
      pagamento: "conta",
      contaId: contas[0]?.id || "",
      cartaoId: cartoes[0]?.id || "",
    });
  };
  const remover = (id) => setTxs((prev) => prev.filter((t) => t.id !== id));
  const filtradas = txs
    .filter((t) => !t.isPagFatura && (filtro === "todos" || t.tipo === filtro))
    .sort((a, b) => b.data.localeCompare(a.data));
  const totalE = filtradas
    .filter((t) => t.tipo === "entrada")
    .reduce((s, t) => s + t.valor, 0);
  const totalS = filtradas
    .filter((t) => t.tipo === "saida")
    .reduce((s, t) => s + t.valor, 0);
  return (
    <div>
      <div className="section-header">
        <div className="section-title">💸 Transações</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova
        </button>
      </div>
      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-label">Entradas</div>
          <div className="stat-value">{fmt(totalE)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent3)" }}
        >
          <div className="stat-label">Saídas</div>
          <div className="stat-value">{fmt(totalS)}</div>
        </div>
        <div
          className="stat-card"
          style={{
            "--accent-color":
              totalE - totalS >= 0 ? "var(--accent2)" : "var(--accent3)",
          }}
        >
          <div className="stat-label">Saldo</div>
          <div className="stat-value">{fmt(totalE - totalS)}</div>
        </div>
      </div>
      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            Todos
          </button>
          <button
            className={`tab ${filtro === "entrada" ? "active" : ""}`}
            onClick={() => setFiltro("entrada")}
          >
            Entradas
          </button>
          <button
            className={`tab ${filtro === "saida" ? "active" : ""}`}
            onClick={() => setFiltro("saida")}
          >
            Saídas
          </button>
        </div>
        {filtradas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💸</div>Nenhuma transação
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th style={{ textAlign: "right" }}>Valor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>{t.descricao}</td>
                    <td>
                      <span className="chip">
                        <span
                          className="color-dot"
                          style={{
                            background:
                              CATEGORY_COLORS[t.categoria] || "#a09080",
                          }}
                        />
                        {t.categoria || "-"}
                      </span>
                    </td>
                    <td>
                      {t.tipo === "entrada" ? (
                        <span className="badge badge-green">Entrada</span>
                      ) : (
                        <span className="badge badge-red">Saída</span>
                      )}
                    </td>
                    <td style={{ color: "var(--muted)" }}>{fmtDate(t.data)}</td>
                    <td
                      style={{
                        textAlign: "right",
                        fontFamily: "var(--font-mono)",
                      }}
                      className={
                        t.tipo === "entrada" ? "text-green" : "text-red"
                      }
                    >
                      {t.tipo === "entrada" ? "+" : "-"}
                      {fmt(t.valor)}
                    </td>
                    <td>
                      <CompAnexo
                        t={t}
                        setTxs={setTxs}
                        onVer={() => setModalComp(t)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalComp && (
        <Modal title="🖼️ Comprovante" onClose={() => setModalComp(null)}>
          <img
            src={modalComp.comprovante}
            alt="comprovante"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid var(--border2)",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {modalComp.descricao} — {fmtDate(modalComp.data)}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModalComp(null)}
            >
              Fechar
            </button>
            <a
              href={modalComp.comprovante}
              download={`comprovante_${modalComp.id}.jpg`}
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              ⬇️ Baixar
            </a>
          </div>
        </Modal>
      )}
      {modal && (
        <Modal title="💸 Nova Transação" onClose={() => setModal(false)}>
          <div className="tabs">
            <button
              className={`tab ${form.tipo === "entrada" ? "active" : ""}`}
              onClick={() => setForm((f) => ({ ...f, tipo: "entrada" }))}
            >
              📈 Entrada
            </button>
            <button
              className={`tab ${form.tipo === "saida" ? "active" : ""}`}
              onClick={() => setForm((f) => ({ ...f, tipo: "saida" }))}
            >
              📉 Saída
            </button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input
                placeholder="Ex: Salário..."
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                value={form.valor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) =>
                  setForm((f) => ({ ...f, data: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoria: e.target.value }))
                }
              >
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          {form.tipo === "saida" && (
            <div className="form-group">
              <label>Pagamento</label>
              <div className="tabs" style={{ marginBottom: 0 }}>
                <button
                  className={`tab ${form.pagamento === "conta" ? "active" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, pagamento: "conta" }))}
                >
                  🏦 Conta
                </button>
                <button
                  className={`tab ${form.pagamento === "cartao" ? "active" : ""}`}
                  onClick={() =>
                    setForm((f) => ({ ...f, pagamento: "cartao" }))
                  }
                >
                  💳 Cartão
                </button>
              </div>
            </div>
          )}
          {(form.tipo === "entrada" ||
            (form.tipo === "saida" && form.pagamento === "conta")) && (
            <div className="form-group">
              <label>
                {form.tipo === "entrada" ? "Depositar em" : "Conta"}
              </label>
              <select
                value={form.contaId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contaId: e.target.value }))
                }
              >
                {contas.map((c) => {
                  const s = calcSaldoConta(c, txs);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.nome} — {fmt(s)}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {form.tipo === "saida" && form.pagamento === "cartao" && (
            <div className="form-group">
              <label>Cartão</label>
              <select
                value={form.cartaoId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cartaoId: e.target.value }))
                }
              >
                {cartoes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Registrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Categorias ──
function Categorias({ txs }) {
  const mesAtual = today().slice(0, 7);
  const txsMes = txs.filter(
    (t) =>
      t.data &&
      t.data.startsWith(mesAtual) &&
      t.tipo === "saida" &&
      !t.isPagFatura,
  );
  const total = txsMes.reduce((s, t) => s + t.valor, 0);
  const porCat = {};
  txsMes.forEach((t) => {
    porCat[t.categoria] = (porCat[t.categoria] || 0) + t.valor;
  });
  return (
    <div>
      <div className="section-header">
        <div className="section-title">🏷️ Categorias — mês atual</div>
      </div>
      {Object.keys(porCat).length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">🏷️</div>Sem gastos este mês
          </div>
        </div>
      ) : (
        <div className="grid-2">
          <div className="card">
            <div className="section-title" style={{ marginBottom: 18 }}>
              Distribuição
            </div>
            <DonutChart
              data={Object.entries(porCat).map(([k, v]) => ({
                label: k,
                value: v,
                color: CATEGORY_COLORS[k] || "#a09080",
              }))}
              size={130}
            />
          </div>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 14 }}>
              Por Categoria
            </div>
            {Object.entries(porCat)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, val]) => {
                const pct = total > 0 ? (val / total) * 100 : 0;
                return (
                  <div key={cat} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <span
                          className="color-dot"
                          style={{
                            background: CATEGORY_COLORS[cat] || "#a09080",
                          }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 700 }}>
                          {cat}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 13,
                          color: CATEGORY_COLORS[cat],
                        }}
                      >
                        {fmt(val)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${pct}%`,
                          background: CATEGORY_COLORS[cat] || "var(--accent)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Contas a Pagar ──
function ContasAPagar({ contasAPagar, setContasAPagar, contas, txs, setTxs }) {
  const [modal, setModal] = useState(false);
  const [modalPagar, setModalPagar] = useState(null);
  const [mesSel, setMesSel] = useState(today().slice(0, 7));
  const [contaPagtoId, setContaPagtoId] = useState(contas[0]?.id || "");
  const [view, setView] = useState("lista");
  const blank = () => ({
    descricao: "",
    valor: "",
    vencimento: "",
    categoria: "Outros",
    recorrente: false,
    contaId: contas[0]?.id || "",
  });
  const [form, setForm] = useState(blank());

  const navMes = (dir) => {
    const [y, m] = mesSel.split("-").map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    setMesSel(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  };
  const mesLabel = new Date(mesSel + "-02").toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const salvar = () => {
    if (!form.descricao || !form.valor || !form.vencimento) return;
    setContasAPagar((prev) => [
      ...prev,
      { ...form, id: genId(), valor: parseFloat(form.valor), paga: false },
    ]);
    setModal(false);
    setForm(blank());
  };
  const remover = (id) =>
    setContasAPagar((prev) => prev.filter((c) => c.id !== id));

  const confirmarPagamento = () => {
    if (!modalPagar) return;
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "saida",
        descricao: modalPagar.descricao,
        valor: modalPagar.valor,
        data: today(),
        categoria: modalPagar.categoria || "Outros",
        fixa: false,
        isPagFatura: false,
        contaId: contaPagtoId,
        cartaoId: null,
      },
    ]);
    setContasAPagar((prev) =>
      prev.map((c) =>
        c.id === modalPagar.id
          ? { ...c, paga: true, dataPagamento: today() }
          : c,
      ),
    );
    setModalPagar(null);
  };

  const contas_mes = contasAPagar.filter(
    (c) => c.vencimento && c.vencimento.startsWith(mesSel),
  );
  const pendentes = contas_mes.filter((c) => !c.paga);
  const pagas = contas_mes.filter((c) => c.paga);
  const totalPendente = pendentes.reduce((s, c) => s + c.valor, 0);
  const totalPago = pagas.reduce((s, c) => s + c.valor, 0);

  const hoje = today();
  const diasStatus = (venc) =>
    Math.round(
      (new Date(venc + "T00:00:00") - new Date(hoje + "T00:00:00")) /
        (1000 * 60 * 60 * 24),
    );

  const statusColor = (c) => {
    if (c.paga) return "var(--accent2)";
    const d = diasStatus(c.vencimento);
    if (d < 0) return "var(--accent3)";
    if (d <= 3) return "var(--accent4)";
    return "var(--accent5)";
  };
  const statusLabel = (c) => {
    if (c.paga) return "✅ Paga";
    const d = diasStatus(c.vencimento);
    if (d < 0) return `🚨 ${Math.abs(d)}d atrasada`;
    if (d === 0) return "⚠️ Vence hoje";
    if (d <= 3) return `⚠️ ${d}d`;
    return `📅 ${d}d`;
  };

  // Calendário
  const [calY, calM] = mesSel.split("-").map(Number);
  const diasNoMes = new Date(calY, calM, 0).getDate();
  const primeiroDia = new Date(calY, calM - 1, 1).getDay();
  const celulas = Array.from({ length: primeiroDia + diasNoMes }, (_, i) =>
    i < primeiroDia ? null : i - primeiroDia + 1,
  );
  const contasPorDia = {};
  contas_mes.forEach((c) => {
    const d = parseInt(c.vencimento.split("-")[2]);
    if (!contasPorDia[d]) contasPorDia[d] = [];
    contasPorDia[d].push(c);
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(-1)}>
          ‹
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface)",
            border: "1.5px solid var(--border2)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 16px",
            minWidth: 180,
          }}
        >
          <span>📅</span>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              textTransform: "capitalize",
            }}
          >
            {mesLabel}
          </div>
          <input
            type="month"
            value={mesSel}
            onChange={(e) => setMesSel(e.target.value)}
            style={{
              marginLeft: "auto",
              width: "auto",
              padding: "4px 8px",
              fontSize: 12,
            }}
          />
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(1)}>
          ›
        </button>
        <div className="tabs" style={{ marginBottom: 0, flex: "none" }}>
          <button
            className={`tab ${view === "lista" ? "active" : ""}`}
            onClick={() => setView("lista")}
          >
            ☰ Lista
          </button>
          <button
            className={`tab ${view === "calendario" ? "active" : ""}`}
            onClick={() => setView("calendario")}
          >
            📅 Cal.
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova
        </button>
      </div>

      {(() => {
        const mesAtual = today().slice(0, 7);
        const recMes = contasAPagar.filter(
          (c) =>
            c.recorrenteOrigemId &&
            c.vencimento &&
            c.vencimento.startsWith(mesAtual),
        );
        return (
          recMes.length > 0 && (
            <div className="alert-item alert-blue" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 20 }}>🔁</div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "var(--accent5)",
                  }}
                >
                  Recorrentes lançadas automaticamente este mês
                </div>
                <div style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {recMes.map((c) => c.descricao).join(", ")}
                </div>
              </div>
            </div>
          )
        );
      })()}
      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent3)" }}
        >
          <div className="stat-icon">⏳</div>
          <div className="stat-label">Pendente</div>
          <div className="stat-value">{fmt(totalPendente)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-label">Pago</div>
          <div className="stat-value">{fmt(totalPago)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent)" }}
        >
          <div className="stat-label">Total do mês</div>
          <div className="stat-value">{fmt(totalPendente + totalPago)}</div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              marginTop: 4,
              fontWeight: 600,
            }}
          >
            {pagas.length}/{contas_mes.length} pagas
          </div>
        </div>
      </div>

      {contas_mes.length > 0 && (
        <div
          className="card"
          style={{ marginBottom: 18, padding: "14px 20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span>Progresso do mês</span>
            <span style={{ color: "var(--accent2)" }}>
              {contas_mes.length > 0
                ? ((pagas.length / contas_mes.length) * 100).toFixed(0)
                : 0}
              % quitado
            </span>
          </div>
          <div className="progress-bar" style={{ height: 12 }}>
            <div
              className="progress-fill"
              style={{
                width: `${contas_mes.length > 0 ? (pagas.length / contas_mes.length) * 100 : 0}%`,
                background: "var(--accent2)",
              }}
            />
          </div>
        </div>
      )}

      {view === "lista" && (
        <div>
          {pendentes.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="section-title" style={{ marginBottom: 14 }}>
                ⏳ Pendentes ({pendentes.length})
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Vencimento</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Valor</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...pendentes]
                      .sort((a, b) => a.vencimento.localeCompare(b.vencimento))
                      .map((c) => {
                        const d = diasStatus(c.vencimento);
                        const atrasada = d < 0,
                          hj = d === 0;
                        return (
                          <tr
                            key={c.id}
                            style={{
                              background: atrasada
                                ? "#fff8f8"
                                : hj
                                  ? "#fffbea"
                                  : "",
                            }}
                          >
                            <td style={{ fontWeight: 700 }}>
                              {c.descricao}
                              {c.recorrente && (
                                <span
                                  style={{
                                    fontSize: 10,
                                    marginLeft: 6,
                                    background: "var(--accent5)20",
                                    color: "var(--accent5)",
                                    borderRadius: 6,
                                    padding: "1px 6px",
                                    fontWeight: 700,
                                  }}
                                >
                                  🔁
                                </span>
                              )}
                            </td>
                            <td>
                              <span className="chip">
                                <span
                                  className="color-dot"
                                  style={{
                                    background:
                                      CATEGORY_COLORS[c.categoria] || "#a09080",
                                  }}
                                />
                                {c.categoria}
                              </span>
                            </td>
                            <td
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: atrasada
                                  ? "var(--accent3)"
                                  : hj
                                    ? "#b8860b"
                                    : "var(--text)",
                              }}
                            >
                              {fmtDate(c.vencimento)}
                            </td>
                            <td>
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 800,
                                  color: statusColor(c),
                                }}
                              >
                                {statusLabel(c)}
                              </span>
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                color: "var(--accent3)",
                                fontWeight: 700,
                              }}
                            >
                              {fmt(c.valor)}
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: 4 }}>
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    background: "var(--accent2)",
                                    color: "#fff",
                                    padding: "5px 10px",
                                  }}
                                  onClick={() => {
                                    setContaPagtoId(contas[0]?.id || "");
                                    setModalPagar(c);
                                  }}
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-ghost btn-sm"
                                  onClick={() => remover(c.id)}
                                >
                                  ✕
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {pagas.length > 0 && (
            <div className="card">
              <div
                className="section-title"
                style={{ marginBottom: 14, color: "var(--accent2)" }}
              >
                ✅ Pagas ({pagas.length})
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Vencimento</th>
                      <th>Pago em</th>
                      <th style={{ textAlign: "right" }}>Valor</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagas.map((c) => (
                      <tr key={c.id} style={{ opacity: 0.75 }}>
                        <td
                          style={{
                            fontWeight: 700,
                            textDecoration: "line-through",
                            color: "var(--muted)",
                          }}
                        >
                          {c.descricao}
                        </td>
                        <td>
                          <span className="chip">{c.categoria}</span>
                        </td>
                        <td style={{ color: "var(--muted)" }}>
                          {fmtDate(c.vencimento)}
                        </td>
                        <td
                          style={{ color: "var(--accent2)", fontWeight: 700 }}
                        >
                          {fmtDate(c.dataPagamento)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontFamily: "var(--font-mono)",
                            color: "var(--accent2)",
                          }}
                        >
                          {fmt(c.valor)}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => remover(c.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {contas_mes.length === 0 && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-icon">📅</div>Nenhuma conta neste mês
              </div>
            </div>
          )}
        </div>
      )}

      {view === "calendario" && (
        <div className="card">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 2,
              marginBottom: 8,
            }}
          >
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "var(--muted)",
                  padding: "6px 0",
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 4,
            }}
          >
            {celulas.map((dia, i) => {
              if (!dia) return <div key={i} />;
              const dStr = `${mesSel}-${String(dia).padStart(2, "0")}`;
              const itens = contasPorDia[dia] || [];
              const isHoje = dStr === hoje;
              const temAtrasada = itens.some(
                (c) => !c.paga && diasStatus(c.vencimento) < 0,
              );
              const temPendente = itens.some((c) => !c.paga);
              return (
                <div
                  key={i}
                  style={{
                    minHeight: 70,
                    border: `1.5px solid ${isHoje ? "var(--accent)" : temAtrasada ? "#f9c0c0" : temPendente ? "#f7e08a" : "var(--border)"}`,
                    borderRadius: 10,
                    padding: "6px",
                    background: isHoje
                      ? "#fdeede"
                      : temAtrasada
                        ? "#fff5f5"
                        : temPendente
                          ? "#fffbea"
                          : "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: isHoje ? 800 : 600,
                      color: isHoje
                        ? "var(--accent)"
                        : temAtrasada
                          ? "var(--accent3)"
                          : temPendente
                            ? "#b8860b"
                            : "var(--muted2)",
                      marginBottom: 4,
                      textAlign: "right",
                    }}
                  >
                    {dia}
                  </div>
                  {itens.map((c) => (
                    <div
                      key={c.id}
                      onClick={() =>
                        !c.paga &&
                        (setContaPagtoId(contas[0]?.id || ""), setModalPagar(c))
                      }
                      title={`${c.descricao} — ${fmt(c.valor)}`}
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: statusColor(c),
                        background: statusColor(c) + "22",
                        borderRadius: 5,
                        padding: "2px 5px",
                        marginBottom: 3,
                        cursor: c.paga ? "default" : "pointer",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.paga ? "✅ " : "⏳ "}
                      {c.descricao.slice(0, 11)}
                      {c.descricao.length > 11 ? "…" : ""}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              ["var(--accent3)", "🚨 Atrasada"],
              ["var(--accent4)", "⚠️ Próxima"],
              ["var(--accent5)", "📅 Pendente"],
              ["var(--accent2)", "✅ Paga"],
              ["var(--accent)", "• Hoje"],
            ].map(([c, l]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  fontWeight: 700,
                  color: c,
                }}
              >
                <span className="color-dot" style={{ background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>
      )}

      {modal && (
        <Modal title="📅 Nova Conta a Pagar" onClose={() => setModal(false)} lg>
          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input
                placeholder="Ex: Conta de Luz..."
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={form.valor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Vencimento</label>
              <input
                type="date"
                value={form.vencimento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vencimento: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoria: e.target.value }))
                }
              >
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Conta para pagamento</label>
            <select
              value={form.contaId}
              onChange={(e) =>
                setForm((f) => ({ ...f, contaId: e.target.value }))
              }
            >
              {contas.map((c) => {
                const s = calcSaldoConta(c, txs);
                return (
                  <option key={c.id} value={c.id}>
                    {c.nome} — {fmt(s)}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              background: "var(--surface2)",
              borderRadius: 12,
              marginBottom: 14,
            }}
          >
            <input
              type="checkbox"
              id="recorrente"
              checked={form.recorrente}
              onChange={(e) =>
                setForm((f) => ({ ...f, recorrente: e.target.checked }))
              }
              style={{ width: 18, height: 18 }}
            />
            <label
              htmlFor="recorrente"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text)",
                cursor: "pointer",
                margin: 0,
              }}
            >
              🔁 Despesa recorrente (mensal)
            </label>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Cadastrar
            </button>
          </div>
        </Modal>
      )}

      {modalPagar &&
        (() => {
          const contaSel = contas.find((c) => c.id === contaPagtoId);
          const saldo = contaSel ? calcSaldoConta(contaSel, txs) : 0;
          return (
            <Modal
              title={`✅ Pagar — ${modalPagar.descricao}`}
              onClose={() => setModalPagar(null)}
            >
              <div
                style={{
                  background: "linear-gradient(135deg,#e6f7ec,#f0faf4)",
                  border: "1.5px solid #a8debb",
                  borderRadius: 14,
                  padding: "14px 20px",
                  marginBottom: 18,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontWeight: 700,
                    }}
                  >
                    VALOR
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 28,
                      color: "var(--accent3)",
                      fontWeight: 700,
                    }}
                  >
                    {fmt(modalPagar.valor)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontWeight: 700,
                    }}
                  >
                    VENCIMENTO
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>
                    {fmtDate(modalPagar.vencimento)}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Descontar de qual conta?</label>
                <select
                  value={contaPagtoId}
                  onChange={(e) => setContaPagtoId(e.target.value)}
                >
                  {contas.map((c) => {
                    const s = calcSaldoConta(c, txs);
                    return (
                      <option key={c.id} value={c.id}>
                        {c.nome} — {fmt(s)}
                      </option>
                    );
                  })}
                </select>
              </div>
              {contaSel && (
                <div
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border2)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "var(--muted)", fontWeight: 700 }}>
                      Saldo atual
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent2)",
                      }}
                    >
                      {fmt(saldo)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 1,
                      background: "var(--border2)",
                      margin: "6px 0",
                    }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: 800 }}>Saldo após</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        color:
                          saldo - modalPagar.valor >= 0
                            ? "var(--accent2)"
                            : "var(--accent3)",
                      }}
                    >
                      {fmt(saldo - modalPagar.valor)}
                    </span>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalPagar(null)}
                >
                  Cancelar
                </button>
                <button className="btn btn-pay" onClick={confirmarPagamento}>
                  ✅ Confirmar Pagamento
                </button>
              </div>
            </Modal>
          );
        })()}
    </div>
  );
}

// ── Veículos ──
function Veiculos({ veiculos, setVeiculos, contas, cartoes, txs, setTxs }) {
  const [aba, setAba] = useState("lista");
  const [modal, setModal] = useState(false);
  const [modalGasto, setModalGasto] = useState(null);
  const [veicSelId, setVeicSelId] = useState(null);
  const [formV, setFormV] = useState({
    nome: "",
    tipo: "Carro",
    placa: "",
    ano: "",
    cor: "#7b8fd4",
    km: "",
  });
  const blankG = () => ({
    tipo: "Combustível",
    descricao: "",
    valor: "",
    data: today(),
    km: "",
    litros: "",
    pagamento: "conta",
    contaId: contas[0]?.id || "",
    cartaoId: cartoes[0]?.id || "",
  });
  const [formG, setFormG] = useState(blankG());
  const vSel = veiculos.find((v) => v.id === veicSelId);

  const salvarVeic = () => {
    if (!formV.nome) return;
    setVeiculos((prev) => [
      ...prev,
      {
        ...formV,
        id: genId(),
        km: parseFloat(formV.km || 0),
        ano: parseInt(formV.ano || new Date().getFullYear()),
        gastos: [],
        kmProximaRevisao: parseFloat(formV.km || 0) + KM_REVISAO_PADRAO,
      },
    ]);
    setModal(false);
    setFormV({
      nome: "",
      tipo: "Carro",
      placa: "",
      ano: "",
      cor: "#7b8fd4",
      km: "",
    });
  };

  // Cálculo de consumo médio (km/litro) com base nos abastecimentos com litros informados
  const calcConsumo = (v) => {
    const abast = (v.gastos || [])
      .filter((g) => g.tipo === "Combustível" && g.litros > 0 && g.km > 0)
      .sort((a, b) => a.km - b.km);
    if (abast.length < 2) return null;
    const kmTotal = abast[abast.length - 1].km - abast[0].km;
    const litrosTotal = abast.slice(1).reduce((s, g) => s + g.litros, 0);
    if (litrosTotal <= 0 || kmTotal <= 0) return null;
    return (kmTotal / litrosTotal).toFixed(2);
  };

  const calcAlertaRevisao = (v) => {
    const kmAtual = v.km || 0;
    const kmProx = v.kmProximaRevisao || 0;
    const falta = kmProx - kmAtual;
    if (falta <= 0)
      return {
        nivel: "red",
        msg: `Revisão atrasada! ${Math.abs(falta).toLocaleString("pt-BR")} km ultrapassados`,
      };
    if (falta <= 1000)
      return {
        nivel: "yellow",
        msg: `Revisão em ${falta.toLocaleString("pt-BR")} km`,
      };
    if (falta <= 2000)
      return {
        nivel: "blue",
        msg: `Revisão em ${falta.toLocaleString("pt-BR")} km`,
      };
    return null;
  };
  const removerVeic = (id) => {
    setVeiculos((prev) => prev.filter((v) => v.id !== id));
    if (veicSelId === id) {
      setVeicSelId(null);
      setAba("lista");
    }
  };

  const salvarGasto = () => {
    if (!formG.valor || !modalGasto) return;
    const v = parseFloat(formG.valor);
    const g = {
      id: genId(),
      tipo: formG.tipo,
      descricao: formG.descricao,
      valor: v,
      data: formG.data,
      km: parseFloat(formG.km || 0),
      litros: parseFloat(formG.litros || 0),
      pagamento: formG.pagamento,
      contaId: formG.pagamento === "conta" ? formG.contaId : null,
      cartaoId: formG.pagamento === "cartao" ? formG.cartaoId : null,
    };
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "saida",
        descricao: `🚗 ${modalGasto.nome} — ${g.tipo}${g.descricao ? ` (${g.descricao})` : ""}`,
        valor: v,
        data: g.data,
        categoria: "Transporte",
        fixa: false,
        isPagFatura: false,
        contaId: g.contaId,
        cartaoId: g.cartaoId,
      },
    ]);
    setVeiculos((prev) =>
      prev.map((veh) => {
        if (veh.id !== modalGasto.id) return veh;
        const novosGastos = [...(veh.gastos || []), g];
        // Atualiza km com o maior valor registrado
        const kmMax = Math.max(
          ...novosGastos.filter((x) => x.km > 0).map((x) => x.km),
          veh.km || 0,
        );
        // Garante kmProximaRevisao se ainda não definido
        const kmProxima = veh.kmProximaRevisao || kmMax + KM_REVISAO_PADRAO;
        return {
          ...veh,
          gastos: novosGastos,
          km: kmMax,
          kmProximaRevisao: kmProxima,
        };
      }),
    );
    setModalGasto(null);
    setFormG(blankG());
  };
  const removerGasto = (veicId, gastoId) =>
    setVeiculos((prev) =>
      prev.map((v) =>
        v.id === veicId
          ? { ...v, gastos: (v.gastos || []).filter((g) => g.id !== gastoId) }
          : v,
      ),
    );

  const totalGeral = veiculos.reduce(
    (s, v) => (v.gastos || []).reduce((a, g) => a + g.valor, s),
    0,
  );
  const totalConta = veiculos.reduce(
    (s, v) =>
      (v.gastos || [])
        .filter((g) => g.pagamento === "conta")
        .reduce((a, g) => a + g.valor, s),
    0,
  );
  const totalCartao = veiculos.reduce(
    (s, v) =>
      (v.gastos || [])
        .filter((g) => g.pagamento === "cartao")
        .reduce((a, g) => a + g.valor, s),
    0,
  );
  const emoji = (tipo) =>
    tipo === "Moto"
      ? "🏍️"
      : tipo === "Caminhão"
        ? "🚛"
        : tipo === "Caminhonete"
          ? "🛻"
          : tipo === "Van"
            ? "🚐"
            : tipo === "Ônibus"
              ? "🚌"
              : "🚗";

  const renderPayBadge = (g) => {
    const conta = contas.find((c) => c.id === g.contaId);
    const cartao = cartoes.find((c) => c.id === g.cartaoId);
    if (cartao)
      return <span className="badge badge-blue">💳 {cartao.nome}</span>;
    if (conta)
      return <span className="badge badge-green">🏦 {conta.nome}</span>;
    return <span className="badge badge-gray">—</span>;
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-title">🚗 Veículos</div>
        <div style={{ display: "flex", gap: 8 }}>
          {aba === "detalhe" && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setAba("lista")}
            >
              ← Voltar
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setModal(true)}>
            + Novo Veículo
          </button>
        </div>
      </div>
      <div className="grid-4" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent)" }}
        >
          <div className="stat-icon">🚗</div>
          <div className="stat-label">Veículos</div>
          <div className="stat-value">{veiculos.length}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent3)" }}
        >
          <div className="stat-icon">💸</div>
          <div className="stat-label">Total de Gastos</div>
          <div className="stat-value">{fmt(totalGeral)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-icon">🏦</div>
          <div className="stat-label">Pago em Conta</div>
          <div className="stat-value">{fmt(totalConta)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent5)" }}
        >
          <div className="stat-icon">💳</div>
          <div className="stat-label">Pago em Cartão</div>
          <div className="stat-value">{fmt(totalCartao)}</div>
        </div>
      </div>

      {aba === "lista" &&
        (veiculos.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">🚗</div>Nenhum veículo cadastrado
            </div>
          </div>
        ) : (
          <div className="grid-2">
            {veiculos.map((v) => {
              const totalV = (v.gastos || []).reduce((s, g) => s + g.valor, 0);
              const porTipo = {};
              (v.gastos || []).forEach((g) => {
                porTipo[g.tipo] = (porTipo[g.tipo] || 0) + g.valor;
              });
              const topTipo = Object.entries(porTipo).sort(
                (a, b) => b[1] - a[1],
              )[0];
              const ultimoGasto = [...(v.gastos || [])].sort((a, b) =>
                b.data.localeCompare(a.data),
              )[0];
              const vConta = (v.gastos || [])
                .filter((g) => g.pagamento === "conta")
                .reduce((s, g) => s + g.valor, 0);
              const vCartao = (v.gastos || [])
                .filter((g) => g.pagamento === "cartao")
                .reduce((s, g) => s + g.valor, 0);
              const consumo = calcConsumo(v);
              const alertaRev = calcAlertaRevisao(v);
              const revCor = {
                red: "var(--accent3)",
                yellow: "#b8860b",
                blue: "var(--accent5)",
              };
              const revBg = {
                red: "#fff0f0",
                yellow: "#fffbea",
                blue: "#f0f4ff",
              };
              const revBorder = {
                red: "#f9c0c0",
                yellow: "#f7e08a",
                blue: "#c5d0f5",
              };
              return (
                <div
                  key={v.id}
                  className="card"
                  style={{
                    borderColor: (v.cor || "#7b8fd4") + "55",
                    borderWidth: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          background: (v.cor || "#7b8fd4") + "22",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 26,
                        }}
                      >
                        {emoji(v.tipo)}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800 }}>
                          {v.nome}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--muted)",
                            fontWeight: 600,
                          }}
                        >
                          {v.tipo}
                          {v.placa ? ` · ${v.placa.toUpperCase()}` : ""}
                          {v.ano ? ` · ${v.ano}` : ""}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => removerVeic(v.id)}
                    >
                      🗑️
                    </button>
                  </div>
                  {alertaRev && (
                    <div
                      style={{
                        background: revBg[alertaRev.nivel],
                        border: `1.5px solid ${revBorder[alertaRev.nivel]}`,
                        borderRadius: 10,
                        padding: "8px 12px",
                        marginBottom: 12,
                        fontSize: 12,
                        fontWeight: 800,
                        color: revCor[alertaRev.nivel],
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span>
                        {alertaRev.nivel === "red"
                          ? "🔧"
                          : alertaRev.nivel === "yellow"
                            ? "⚠️"
                            : "🔩"}
                      </span>
                      {alertaRev.msg}
                      {alertaRev.nivel === "red" && (
                        <button
                          className="btn btn-sm"
                          style={{
                            marginLeft: "auto",
                            background: "var(--accent3)",
                            color: "#fff",
                            padding: "3px 10px",
                          }}
                          onClick={() =>
                            setVeiculos((prev) =>
                              prev.map((x) =>
                                x.id === v.id
                                  ? {
                                      ...x,
                                      kmProximaRevisao:
                                        (x.km || 0) + KM_REVISAO_PADRAO,
                                    }
                                  : x,
                              ),
                            )
                          }
                        >
                          Renovar
                        </button>
                      )}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Total Gasto
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 20,
                          color: "var(--accent3)",
                        }}
                      >
                        {fmt(totalV)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        KM Atual
                      </div>
                      <div
                        style={{ fontFamily: "var(--font-mono)", fontSize: 18 }}
                      >
                        {v.km?.toLocaleString("pt-BR") || "—"} km
                      </div>
                    </div>
                  </div>
                  {consumo && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        background: "linear-gradient(135deg,#e6f7ec,#f0faf4)",
                        border: "1px solid var(--accent2)44",
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>⛽</span>
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--muted)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          Consumo médio
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 18,
                            fontWeight: 700,
                            color: "var(--accent2)",
                          }}
                        >
                          {consumo} <span style={{ fontSize: 13 }}>km/l</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {totalV > 0 && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      {vConta > 0 && (
                        <div
                          style={{
                            flex: 1,
                            background: "var(--accent2)15",
                            border: "1px solid var(--accent2)40",
                            borderRadius: 8,
                            padding: "5px 8px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              color: "var(--muted)",
                              fontWeight: 700,
                            }}
                          >
                            🏦 Conta
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              color: "var(--accent2)",
                              fontWeight: 700,
                            }}
                          >
                            {fmt(vConta)}
                          </div>
                        </div>
                      )}
                      {vCartao > 0 && (
                        <div
                          style={{
                            flex: 1,
                            background: "var(--accent5)15",
                            border: "1px solid var(--accent5)40",
                            borderRadius: 8,
                            padding: "5px 8px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              color: "var(--muted)",
                              fontWeight: 700,
                            }}
                          >
                            💳 Cartão
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              color: "var(--accent5)",
                              fontWeight: 700,
                            }}
                          >
                            {fmt(vCartao)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {topTipo && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted2)",
                        marginBottom: 8,
                      }}
                    >
                      Principal:{" "}
                      <span
                        style={{
                          fontWeight: 800,
                          color: COR_GASTO[topTipo[0]] || "var(--accent)",
                        }}
                      >
                        {topTipo[0]}
                      </span>{" "}
                      — {fmt(topTipo[1])}
                    </div>
                  )}
                  {ultimoGasto && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        marginBottom: 12,
                      }}
                    >
                      Último: {ultimoGasto.tipo} em {fmtDate(ultimoGasto.data)}{" "}
                      — {fmt(ultimoGasto.valor)}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: "center" }}
                      onClick={() => {
                        setFormG({ ...blankG(), km: String(v.km || "") });
                        setModalGasto(v);
                      }}
                    >
                      + Gasto
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setVeicSelId(v.id);
                        setAba("detalhe");
                      }}
                    >
                      Detalhes →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

      {aba === "detalhe" &&
        vSel &&
        (() => {
          const gastos = [...(vSel.gastos || [])].sort((a, b) =>
            b.data.localeCompare(a.data),
          );
          const totalV = gastos.reduce((s, g) => s + g.valor, 0);
          const porTipo = {};
          gastos.forEach((g) => {
            porTipo[g.tipo] = (porTipo[g.tipo] || 0) + g.valor;
          });
          const catData = Object.entries(porTipo).map(([k, v]) => ({
            label: k,
            value: v,
            color: COR_GASTO[k] || "#a09080",
          }));
          const vConta = gastos
            .filter((g) => g.pagamento === "conta")
            .reduce((s, g) => s + g.valor, 0);
          const vCartao = gastos
            .filter((g) => g.pagamento === "cartao")
            .reduce((s, g) => s + g.valor, 0);
          const consumoDetalhe = calcConsumo(vSel);
          const alertaRevDet = calcAlertaRevisao(vSel);
          const revCorD = {
            red: "var(--accent3)",
            yellow: "#b8860b",
            blue: "var(--accent5)",
          };
          const revBgD = { red: "#fff0f0", yellow: "#fffbea", blue: "#f0f4ff" };
          const revBorderD = {
            red: "#f9c0c0",
            yellow: "#f7e08a",
            blue: "#c5d0f5",
          };
          // histórico de consumo por abastecimento
          const abastOrdenados = (vSel.gastos || [])
            .filter((g) => g.tipo === "Combustível" && g.litros > 0 && g.km > 0)
            .sort((a, b) => a.km - b.km);
          const consumoHist = abastOrdenados
            .slice(1)
            .map((g, i) => {
              const prev = abastOrdenados[i];
              const kmDiff = g.km - prev.km;
              return kmDiff > 0 && g.litros > 0
                ? {
                    data: g.data,
                    km: g.km,
                    kmDiff,
                    litros: g.litros,
                    kml: (kmDiff / g.litros).toFixed(2),
                  }
                : null;
            })
            .filter(Boolean);
          return (
            <div>
              <div
                className="card"
                style={{
                  background: `linear-gradient(135deg,${vSel.cor || "#7b8fd4"}18,var(--surface))`,
                  borderColor: (vSel.cor || "#7b8fd4") + "55",
                  borderWidth: 2,
                  marginBottom: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 52 }}>{emoji(vSel.tipo)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>
                      {vSel.nome}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      {vSel.tipo}
                      {vSel.placa
                        ? ` · Placa: ${vSel.placa.toUpperCase()}`
                        : ""}
                      {vSel.ano ? ` · Ano: ${vSel.ano}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      KM
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 26,
                        fontWeight: 600,
                        color: vSel.cor || "#7b8fd4",
                      }}
                    >
                      {vSel.km?.toLocaleString("pt-BR") || "—"}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setModalGasto(vSel)}
                  >
                    + Gasto
                  </button>
                </div>
              </div>

              {alertaRevDet && (
                <div
                  style={{
                    background: revBgD[alertaRevDet.nivel],
                    border: `1.5px solid ${revBorderD[alertaRevDet.nivel]}`,
                    borderRadius: 12,
                    padding: "12px 16px",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 13,
                    fontWeight: 800,
                    color: revCorD[alertaRevDet.nivel],
                  }}
                >
                  <span style={{ fontSize: 24 }}>
                    {alertaRevDet.nivel === "red"
                      ? "🔧"
                      : alertaRevDet.nivel === "yellow"
                        ? "⚠️"
                        : "🔩"}
                  </span>
                  <div style={{ flex: 1 }}>
                    {alertaRevDet.msg}
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--muted2)",
                        marginTop: 3,
                      }}
                    >
                      Próxima revisão:{" "}
                      {(vSel.kmProximaRevisao || 0).toLocaleString("pt-BR")} km
                    </div>
                  </div>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: revCorD[alertaRevDet.nivel],
                      color: "#fff",
                    }}
                    onClick={() =>
                      setVeiculos((prev) =>
                        prev.map((x) =>
                          x.id === vSel.id
                            ? {
                                ...x,
                                kmProximaRevisao:
                                  (x.km || 0) + KM_REVISAO_PADRAO,
                              }
                            : x,
                        ),
                      )
                    }
                  >
                    Renovar +{KM_REVISAO_PADRAO.toLocaleString("pt-BR")} km
                  </button>
                </div>
              )}

              {/* Config revisão */}
              <div
                className="card"
                style={{
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ fontSize: 22 }}>🔩</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>
                    Lembrete de Revisão
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Será alertado quando atingir o KM configurado
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      Próxima revisão (km)
                    </div>
                    <input
                      type="number"
                      value={vSel.kmProximaRevisao || ""}
                      onChange={(e) =>
                        setVeiculos((prev) =>
                          prev.map((x) =>
                            x.id === vSel.id
                              ? {
                                  ...x,
                                  kmProximaRevisao:
                                    parseFloat(e.target.value) || 0,
                                }
                              : x,
                          ),
                        )
                      }
                      style={{
                        width: 130,
                        fontFamily: "var(--font-mono)",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid-2" style={{ marginBottom: 18 }}>
                <div className="card">
                  <div className="section-title" style={{ marginBottom: 14 }}>
                    Distribuição por Tipo
                  </div>
                  {catData.length > 0 ? (
                    <DonutChart data={catData} size={110} />
                  ) : (
                    <div className="empty-state" style={{ padding: 16 }}>
                      Sem gastos
                    </div>
                  )}
                </div>
                <div className="card">
                  <div className="section-title" style={{ marginBottom: 14 }}>
                    ⛽ Consumo & Resumo
                  </div>
                  {consumoDetalhe ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        background: "linear-gradient(135deg,#e6f7ec,#f0faf4)",
                        border: "1.5px solid var(--accent2)44",
                        borderRadius: 12,
                        marginBottom: 14,
                      }}
                    >
                      <div style={{ fontSize: 28 }}>⛽</div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--muted)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          Consumo médio
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 26,
                            fontWeight: 700,
                            color: "var(--accent2)",
                          }}
                        >
                          {consumoDetalhe}{" "}
                          <span style={{ fontSize: 14 }}>km/l</span>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--muted)",
                            fontWeight: 600,
                            marginTop: 2,
                          }}
                        >
                          {abastOrdenados.length} abastecimento(s) registrado(s)
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "var(--surface2)",
                        borderRadius: 12,
                        marginBottom: 14,
                        fontSize: 12,
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      ⛽ Registre ao menos 2 abastecimentos com litros e KM para
                      calcular o consumo.
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                      padding: "10px 14px",
                      background: "var(--surface2)",
                      borderRadius: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 700,
                        }}
                      >
                        TOTAL GASTO
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 22,
                          color: "var(--accent3)",
                        }}
                      >
                        {fmt(totalV)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 700,
                        }}
                      >
                        REGISTROS
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 22,
                          color: "var(--text)",
                        }}
                      >
                        {gastos.length}
                      </div>
                    </div>
                  </div>
                  {vConta > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                        padding: "8px 12px",
                        background: "var(--accent2)10",
                        border: "1px solid var(--accent2)30",
                        borderRadius: 10,
                      }}
                    >
                      <span>🏦</span>
                      <div style={{ flex: 1, fontSize: 12, fontWeight: 700 }}>
                        Conta
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 15,
                          color: "var(--accent2)",
                          fontWeight: 700,
                        }}
                      >
                        {fmt(vConta)}
                      </div>
                    </div>
                  )}
                  {vCartao > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                        padding: "8px 12px",
                        background: "var(--accent5)10",
                        border: "1px solid var(--accent5)30",
                        borderRadius: 10,
                      }}
                    >
                      <span>💳</span>
                      <div style={{ flex: 1, fontSize: 12, fontWeight: 700 }}>
                        Cartão
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 15,
                          color: "var(--accent5)",
                          fontWeight: 700,
                        }}
                      >
                        {fmt(vCartao)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {consumoHist.length > 0 && (
                <div className="card" style={{ marginBottom: 18 }}>
                  <div className="section-title" style={{ marginBottom: 14 }}>
                    ⛽ Histórico de Consumo por Abastecimento
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>KM</th>
                          <th>Diferença</th>
                          <th>Litros</th>
                          <th style={{ textAlign: "right" }}>km/l</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...consumoHist].reverse().map((c, i) => (
                          <tr key={i}>
                            <td style={{ color: "var(--muted)" }}>
                              {fmtDate(c.data)}
                            </td>
                            <td style={{ fontFamily: "var(--font-mono)" }}>
                              {c.km.toLocaleString("pt-BR")}
                            </td>
                            <td
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: "var(--muted2)",
                              }}
                            >
                              {c.kmDiff.toLocaleString("pt-BR")} km
                            </td>
                            <td style={{ fontFamily: "var(--font-mono)" }}>
                              {c.litros.toFixed(2)} L
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                color:
                                  parseFloat(c.kml) >= 10
                                    ? "var(--accent2)"
                                    : parseFloat(c.kml) >= 7
                                      ? "var(--accent4)"
                                      : "var(--accent3)",
                              }}
                            >
                              {c.kml}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="card">
                <div className="section-title" style={{ marginBottom: 14 }}>
                  Histórico de Gastos
                </div>
                {gastos.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🧾</div>Nenhum gasto
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Tipo</th>
                          <th>Descrição</th>
                          <th>Pagamento</th>
                          <th>KM</th>
                          <th>Litros</th>
                          <th>Data</th>
                          <th style={{ textAlign: "right" }}>Valor</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {gastos.map((g) => (
                          <tr key={g.id}>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  background:
                                    (COR_GASTO[g.tipo] || "#a09080") + "22",
                                  color: COR_GASTO[g.tipo] || "#a09080",
                                }}
                              >
                                {g.tipo}
                              </span>
                            </td>
                            <td style={{ fontWeight: 600 }}>
                              {g.descricao || "—"}
                            </td>
                            <td>{renderPayBadge(g)}</td>
                            <td
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                color: "var(--muted2)",
                              }}
                            >
                              {g.km
                                ? `${g.km.toLocaleString("pt-BR")} km`
                                : "—"}
                            </td>
                            <td
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                color: "var(--muted2)",
                              }}
                            >
                              {g.litros > 0 ? `${g.litros.toFixed(2)} L` : "—"}
                            </td>
                            <td style={{ color: "var(--muted)" }}>
                              {fmtDate(g.data)}
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                color: "var(--accent3)",
                              }}
                            >
                              {fmt(g.valor)}
                            </td>
                            <td>
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => removerGasto(vSel.id, g.id)}
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

      {modal && (
        <Modal title="🚗 Novo Veículo" onClose={() => setModal(false)}>
          <div className="form-row">
            <div className="form-group">
              <label>Nome / Apelido</label>
              <input
                placeholder="Ex: Corolla Prata"
                value={formV.nome}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, nome: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={formV.tipo}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, tipo: e.target.value }))
                }
              >
                {TIPO_VEICULO.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Placa</label>
              <input
                placeholder="ABC1D23"
                value={formV.placa}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, placa: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Ano</label>
              <input
                type="number"
                placeholder={new Date().getFullYear()}
                value={formV.ano}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, ano: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>KM Atual</label>
              <input
                type="number"
                placeholder="0"
                value={formV.km}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, km: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Cor</label>
              <input
                type="color"
                value={formV.cor}
                onChange={(e) =>
                  setFormV((f) => ({ ...f, cor: e.target.value }))
                }
                style={{ height: 40 }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvarVeic}>
              Cadastrar
            </button>
          </div>
        </Modal>
      )}

      {modalGasto && (
        <Modal
          title={`🧾 Registrar Gasto — ${modalGasto.nome}`}
          onClose={() => setModalGasto(null)}
          lg
        >
          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Gasto</label>
              <select
                value={formG.tipo}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, tipo: e.target.value }))
                }
              >
                {TIPO_GASTO_VEICULO.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={formG.valor}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={formG.data}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, data: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>KM no momento</label>
              <input
                type="number"
                placeholder="0"
                value={formG.km}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, km: e.target.value }))
                }
              />
            </div>
          </div>
          {formG.tipo === "Combustível" && (
            <div className="form-row">
              <div className="form-group">
                <label>⛽ Litros abastecidos</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 40,00"
                  value={formG.litros}
                  onChange={(e) =>
                    setFormG((f) => ({ ...f, litros: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Preço estimado por litro</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Calculado automaticamente"
                  readOnly
                  value={
                    formG.litros && formG.valor
                      ? (
                          parseFloat(formG.valor) / parseFloat(formG.litros)
                        ).toFixed(3)
                      : ""
                  }
                  style={{
                    background: "var(--surface3)",
                    color: "var(--muted2)",
                  }}
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Descrição (opcional)</label>
            <input
              placeholder="Ex: Troca de óleo..."
              value={formG.descricao}
              onChange={(e) =>
                setFormG((f) => ({ ...f, descricao: e.target.value }))
              }
            />
          </div>
          <div
            style={{
              background: "var(--surface2)",
              border: "1.5px solid var(--border2)",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "var(--muted2)",
                marginBottom: 10,
              }}
            >
              💳 Forma de Pagamento
            </div>
            <div className="tabs" style={{ marginBottom: 12 }}>
              <button
                className={`tab ${formG.pagamento === "conta" ? "active" : ""}`}
                onClick={() => setFormG((f) => ({ ...f, pagamento: "conta" }))}
              >
                🏦 Conta Bancária
              </button>
              <button
                className={`tab ${formG.pagamento === "cartao" ? "active" : ""}`}
                onClick={() => setFormG((f) => ({ ...f, pagamento: "cartao" }))}
              >
                💳 Cartão
              </button>
            </div>
            {formG.pagamento === "conta" ? (
              <select
                value={formG.contaId}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, contaId: e.target.value }))
                }
              >
                {contas.map((c) => {
                  const s = calcSaldoConta(c, txs);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.nome} — {fmt(s)}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                value={formG.cartaoId}
                onChange={(e) =>
                  setFormG((f) => ({ ...f, cartaoId: e.target.value }))
                }
              >
                {cartoes.map((c) => {
                  const f2 = calcFaturaCartao(c.id, txs);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.nome} — Fatura: {fmt(f2)}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModalGasto(null)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvarGasto}>
              Registrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Projeção ──
function Projecao({ txs, contas, investimentos, cofre }) {
  const [meses, setMeses] = useState(12);
  const saldoAtual = useMemo(
    () => contas.reduce((s, c) => s + calcSaldoConta(c, txs), 0),
    [contas, txs],
  );
  const totalInv = investimentos.reduce((s, i) => s + i.valor, 0);
  const totalCofre = cofre.reduce((s, c) => s + c.atual, 0);
  const patrimonioAtual = saldoAtual + totalInv + totalCofre;

  // Média dos últimos 3 meses
  const mediasMeses = useMemo(() => {
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const ent = txs
        .filter(
          (t) =>
            t.data?.startsWith(k) && t.tipo === "entrada" && !t.isPagFatura,
        )
        .reduce((s, t) => s + t.valor, 0);
      const sai = txs
        .filter(
          (t) => t.data?.startsWith(k) && t.tipo === "saida" && !t.isPagFatura,
        )
        .reduce((s, t) => s + t.valor, 0);
      result.push({ ent, sai });
    }
    return result;
  }, [txs]);

  const mediaEnt = mediasMeses.reduce((s, m) => s + m.ent, 0) / 3;
  const mediaSai = mediasMeses.reduce((s, m) => s + m.sai, 0) / 3;
  const mediaSaldo = mediaEnt - mediaSai;

  // Projeção mês a mês
  const pontos = useMemo(() => {
    const pts = [
      { label: "Agora", patrimonio: patrimonioAtual, saldo: saldoAtual },
    ];
    let pat = patrimonioAtual;
    for (let i = 1; i <= meses; i++) {
      pat += mediaSaldo;
      const d = new Date();
      d.setMonth(d.getMonth() + i);
      const label = d
        .toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
        .replace(". ", "'");
      pts.push({ label, patrimonio: Math.max(pat, 0), saldo: pat });
    }
    return pts;
  }, [patrimonioAtual, mediaSaldo, meses]);

  const patrimonioFinal = pontos[pontos.length - 1].patrimonio;
  const variacao = patrimonioFinal - patrimonioAtual;
  const tendencia = mediaSaldo >= 0 ? "positiva" : "negativa";

  // Mini gráfico de barras
  const maxVal = Math.max(...pontos.map((p) => p.patrimonio), 1);
  const passos =
    meses <= 6
      ? pontos
      : pontos.filter(
          (_, i) => i % Math.ceil(meses / 6) === 0 || i === pontos.length - 1,
        );

  return (
    <div>
      <div className="section-header">
        <div className="section-title">🔮 Projeção Financeira</div>
      </div>

      {/* Config */}
      <div className="card" style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "var(--muted2)",
                marginBottom: 6,
              }}
            >
              Projetar para quantos meses?
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[3, 6, 12, 24, 36].map((m) => (
                <button
                  key={m}
                  className={`btn btn-sm ${meses === m ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setMeses(m)}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}
            >
              BASE DE CÁLCULO
            </div>
            <div
              style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}
            >
              Média dos últimos 3 meses
            </div>
          </div>
        </div>
      </div>

      {/* Cards resumo */}
      <div className="grid-4" style={{ marginBottom: 18 }}>
        {[
          {
            label: "Patrimônio Atual",
            val: fmt(patrimonioAtual),
            color: "var(--accent)",
            icon: "💎",
          },
          {
            label: "Entrada Média/mês",
            val: fmt(mediaEnt),
            color: "var(--accent2)",
            icon: "📈",
          },
          {
            label: "Saída Média/mês",
            val: fmt(mediaSai),
            color: "var(--accent3)",
            icon: "📉",
          },
          {
            label: `Em ${meses} meses`,
            val: fmt(patrimonioFinal),
            color: variacao >= 0 ? "var(--accent2)" : "var(--accent3)",
            icon: "🔮",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{ "--accent-color": s.color }}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Tendência */}
      <div
        className="card"
        style={{
          marginBottom: 18,
          background:
            tendencia === "positiva"
              ? "linear-gradient(135deg,#e6f7ec,var(--surface))"
              : "linear-gradient(135deg,#fff0f0,var(--surface))",
          borderColor:
            tendencia === "positiva" ? "var(--accent2)44" : "var(--accent3)44",
          borderWidth: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 48 }}>
            {tendencia === "positiva" ? "🚀" : "⚠️"}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color:
                  tendencia === "positiva"
                    ? "var(--accent2)"
                    : "var(--accent3)",
              }}
            >
              Tendência{" "}
              {tendencia === "positiva"
                ? "positiva — você está acumulando"
                : "negativa — você está consumindo reservas"}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--muted2)",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              Saldo médio mensal:{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: mediaSaldo >= 0 ? "var(--accent2)" : "var(--accent3)",
                }}
              >
                {mediaSaldo >= 0 ? "+" : ""}
                {fmt(mediaSaldo)}
              </span>
              {" · "}Variação projetada:{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: variacao >= 0 ? "var(--accent2)" : "var(--accent3)",
                }}
              >
                {variacao >= 0 ? "+" : ""}
                {fmt(variacao)}
              </span>
            </div>
          </div>
          {mediaSaldo < 0 && (
            <div
              style={{
                background: "#fff0f0",
                border: "1.5px solid #f9c0c0",
                borderRadius: 12,
                padding: "10px 14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--accent3)",
                  fontWeight: 800,
                }}
              >
                RESERVAS ZERADAS EM
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 22,
                  color: "var(--accent3)",
                  fontWeight: 700,
                }}
              >
                {Math.ceil(patrimonioAtual / Math.abs(mediaSaldo))} meses
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 18 }}>
          📊 Evolução projetada do patrimônio
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 160,
            paddingBottom: 28,
            overflowX: "auto",
          }}
        >
          {passos.map((p, i) => {
            const h = Math.max((p.patrimonio / maxVal) * 130, 2);
            const isAtual = i === 0;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: 40,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  gap: 3,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontFamily: "var(--font-mono)",
                    color: isAtual
                      ? "var(--accent)"
                      : p.saldo >= patrimonioAtual
                        ? "var(--accent2)"
                        : "var(--accent3)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fmt(p.patrimonio).replace("R$\u00a0", "R$")}
                </div>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    height: h,
                    background: isAtual
                      ? "var(--accent)"
                      : p.saldo >= patrimonioAtual
                        ? "var(--accent2)"
                        : "var(--accent3)",
                    opacity: isAtual ? 1 : 0.75,
                    transition: "height .3s",
                  }}
                />
                <div
                  style={{
                    fontSize: 9,
                    color: isAtual ? "var(--accent)" : "var(--muted)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--muted)",
            fontWeight: 600,
            textAlign: "center",
            marginTop: 4,
          }}
        >
          ⚠️ Projeção baseada na média dos últimos 3 meses. Valores estimados,
          não garantidos.
        </div>
      </div>
    </div>
  );
}

// ── Análises ──
function Analises({ txs }) {
  const [abaSel, setAbaSel] = useState("evolucao");
  const meses = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    };
  });
  const dadosMeses = meses.map((m) => {
    const ent = txs
      .filter(
        (t) =>
          t.data &&
          t.data.startsWith(m.key) &&
          t.tipo === "entrada" &&
          !t.isPagFatura,
      )
      .reduce((s, t) => s + t.valor, 0);
    const sai = txs
      .filter(
        (t) =>
          t.data &&
          t.data.startsWith(m.key) &&
          t.tipo === "saida" &&
          !t.isPagFatura &&
          !t.cartaoId,
      )
      .reduce((s, t) => s + t.valor, 0);
    const pagFat = txs
      .filter((t) => t.data && t.data.startsWith(m.key) && t.isPagFatura)
      .reduce((s, t) => s + t.valor, 0);
    return {
      ...m,
      entradas: ent,
      saidas: sai + pagFat,
      saldo: ent - (sai + pagFat),
    };
  });
  const [ma, mb] = [dadosMeses[5], dadosMeses[4]];
  const varG = mb.saidas > 0 ? ((ma.saidas - mb.saidas) / mb.saidas) * 100 : 0;
  const varE =
    mb.entradas > 0 ? ((ma.entradas - mb.entradas) / mb.entradas) * 100 : 0;
  const maLabel = new Date(ma.key + "-02").toLocaleDateString("pt-BR", {
    month: "long",
  });
  const mbLabel = new Date(mb.key + "-02").toLocaleDateString("pt-BR", {
    month: "long",
  });
  const catA = {},
    catB = {};
  txs
    .filter(
      (t) =>
        t.data &&
        t.data.startsWith(ma.key) &&
        t.tipo === "saida" &&
        !t.isPagFatura,
    )
    .forEach((t) => {
      catA[t.categoria] = (catA[t.categoria] || 0) + t.valor;
    });
  txs
    .filter(
      (t) =>
        t.data &&
        t.data.startsWith(mb.key) &&
        t.tipo === "saida" &&
        !t.isPagFatura,
    )
    .forEach((t) => {
      catB[t.categoria] = (catB[t.categoria] || 0) + t.valor;
    });
  const todasCats = [...new Set([...Object.keys(catA), ...Object.keys(catB)])];
  const maxBar = Math.max(
    ...dadosMeses.flatMap((m) => [m.entradas, m.saidas]),
    1,
  );
  return (
    <div>
      <div className="tabs">
        <button
          className={`tab ${abaSel === "evolucao" ? "active" : ""}`}
          onClick={() => setAbaSel("evolucao")}
        >
          📈 Evolução
        </button>
        <button
          className={`tab ${abaSel === "comparativo" ? "active" : ""}`}
          onClick={() => setAbaSel("comparativo")}
        >
          🔄 Comparativo
        </button>
        <button
          className={`tab ${abaSel === "barras" ? "active" : ""}`}
          onClick={() => setAbaSel("barras")}
        >
          📊 Barras
        </button>
      </div>
      {abaSel === "evolucao" && (
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>
            📈 Evolução do Saldo — últimos 6 meses
          </div>
          <LineChart
            data={dadosMeses.map((m) => ({ label: m.label, saldo: m.saldo }))}
          />
        </div>
      )}
      {abaSel === "comparativo" && (
        <div>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            {[
              { label: "GASTOS", curr: ma.saidas, prev: mb.saidas, v: varG },
              {
                label: "ENTRADAS",
                curr: ma.entradas,
                prev: mb.entradas,
                v: varE,
              },
            ].map(({ label, curr, prev, v }) => (
              <div key={label} className="card">
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 24,
                      color:
                        label === "GASTOS"
                          ? "var(--accent3)"
                          : "var(--accent2)",
                    }}
                  >
                    {fmt(curr)}
                  </div>
                  <div
                    style={{
                      padding: "3px 10px",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 800,
                      background: v > 0 ? "#fdeaea" : "#e6f7ec",
                      color: v > 0 ? "var(--accent3)" : "var(--accent2)",
                    }}
                  >
                    {v > 0 ? "▲" : "▼"} {Math.abs(v).toFixed(1)}%
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {mbLabel}:{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--text)",
                    }}
                  >
                    {fmt(prev)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 14 }}>
              Categorias — {maLabel} vs {mbLabel}
            </div>
            {todasCats.length === 0 ? (
              <div className="empty-state">Sem dados</div>
            ) : (
              todasCats
                .sort((a, b) => (catA[b] || 0) - (catA[a] || 0))
                .map((cat) => {
                  const va = catA[cat] || 0,
                    vb = catB[cat] || 0,
                    mx = Math.max(va, vb, 1);
                  const diff =
                    vb > 0 ? ((va - vb) / vb) * 100 : va > 0 ? 100 : 0;
                  return (
                    <div key={cat} style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                        >
                          <span
                            className="color-dot"
                            style={{ background: CATEGORY_COLORS[cat] }}
                          />
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {cat}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          {vb > 0 && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: 8,
                                background: diff > 0 ? "#fdeaea" : "#e6f7ec",
                                color:
                                  diff > 0
                                    ? "var(--accent3)"
                                    : "var(--accent2)",
                              }}
                            >
                              {diff > 0 ? "▲" : "▼"} {Math.abs(diff).toFixed(0)}
                              %
                            </span>
                          )}
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              color: CATEGORY_COLORS[cat],
                              fontWeight: 500,
                            }}
                          >
                            {fmt(va)}
                          </span>
                        </div>
                      </div>
                      {[
                        [maLabel, va],
                        [mbLabel, vb],
                      ].map(([lbl, val]) => (
                        <div
                          key={lbl}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              color: "var(--muted)",
                              width: 50,
                              fontWeight: 600,
                            }}
                          >
                            {lbl.slice(0, 3)}
                          </span>
                          <div
                            style={{
                              flex: 1,
                              height: 7,
                              background: "var(--surface3)",
                              borderRadius: 4,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${(val / mx) * 100}%`,
                                background:
                                  lbl === maLabel
                                    ? CATEGORY_COLORS[cat]
                                    : CATEGORY_COLORS[cat] + "66",
                                borderRadius: 4,
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: "var(--muted)",
                              minWidth: 60,
                              textAlign: "right",
                            }}
                          >
                            {fmt(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}
      {abaSel === "barras" && (
        <div className="card">
          <div className="section-title" style={{ marginBottom: 18 }}>
            📊 Entradas vs Saídas — últimos 6 meses
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 12,
              height: 180,
              paddingBottom: 28,
            }}
          >
            {dadosMeses.map((m, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  gap: 3,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "var(--accent2)",
                      borderRadius: "4px 4px 0 0",
                      height: `${(m.entradas / maxBar) * 130}px`,
                      minHeight: m.entradas > 0 ? 4 : 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      background: "var(--accent3)",
                      borderRadius: "4px 4px 0 0",
                      height: `${(m.saidas / maxBar) * 130}px`,
                      minHeight: m.saidas > 0 ? 4 : 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "var(--accent2)",
                  borderRadius: 3,
                }}
              />
              Entradas
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "var(--accent3)",
                  borderRadius: 3,
                }}
              />
              Saídas
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Alertas Page ──
function AlertasPage({ contas, cartoes, txs }) {
  const contasComSaldo = useMemo(
    () => contas.map((c) => ({ ...c, saldo: calcSaldoConta(c, txs) })),
    [contas, txs],
  );
  const alertas = calcAlertas(contasComSaldo, cartoes, txs);
  const colorMap = {
    red: "alert-red",
    yellow: "alert-yellow",
    blue: "alert-blue",
    green: "alert-green",
  };
  const titleColor = {
    red: "var(--accent3)",
    yellow: "#b8860b",
    blue: "var(--accent5)",
    green: "var(--accent2)",
  };
  return (
    <div>
      <div className="section-header">
        <div className="section-title">🔔 Alertas</div>
        <span className="badge badge-red">
          {alertas.filter((a) => a.tipo === "red").length} urgente(s)
        </span>
      </div>
      {alertas.map((a, i) => (
        <div key={i} className={`alert-item ${colorMap[a.tipo]}`}>
          <div style={{ fontSize: 22 }}>{a.icon}</div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: titleColor[a.tipo],
                marginBottom: 3,
              }}
            >
              {a.titulo}
            </div>
            <div
              style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 600 }}
            >
              {a.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Fontes de Renda ──
function FontesRenda({ fontes, setFontes, txs, setTxs, contas }) {
  const [modal, setModal] = useState(false);
  const [modalLanc, setModalLanc] = useState(null);
  const [mesSel, setMesSel] = useState(today().slice(0, 7));
  const [filMembro, setFilMembro] = useState("Todos");
  const [form, setForm] = useState({
    nome: "",
    membro: "Alexandre",
    tipo: "Salário CLT",
    valor: "",
    contaId: contas[0]?.id || "",
  });
  const [lancForm, setLancForm] = useState({
    data: today(),
    valor: "",
    obs: "",
  });
  const navMes = (dir) => {
    const [y, m] = mesSel.split("-").map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    setMesSel(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  };
  const mesLabel = new Date(mesSel + "-02").toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const salvar = () => {
    if (!form.nome || !form.valor) return;
    setFontes((prev) => [
      ...prev,
      { ...form, id: genId(), valor: parseFloat(form.valor), historico: [] },
    ]);
    setModal(false);
    setForm({
      nome: "",
      membro: "Alexandre",
      tipo: "Salário CLT",
      valor: "",
      contaId: contas[0]?.id || "",
    });
  };
  const remover = (id) => setFontes((prev) => prev.filter((f) => f.id !== id));
  const confirmarLanc = () => {
    if (!lancForm.valor || !modalLanc) return;
    const v = parseFloat(lancForm.valor);
    setTxs((prev) => [
      ...prev,
      {
        id: genId(),
        tipo: "entrada",
        descricao: `${modalLanc.nome} (${modalLanc.membro})`,
        valor: v,
        data: lancForm.data,
        categoria: "Negócio",
        fixa: false,
        contaId: modalLanc.contaId,
        cartaoId: null,
        isPagFatura: false,
        fonteId: modalLanc.id,
        membro: modalLanc.membro,
      },
    ]);
    setFontes((prev) =>
      prev.map((f) =>
        f.id === modalLanc.id
          ? {
              ...f,
              historico: [
                ...(f.historico || []),
                {
                  id: genId(),
                  data: lancForm.data,
                  valor: v,
                  obs: lancForm.obs,
                },
              ],
            }
          : f,
      ),
    );
    setModalLanc(null);
  };
  const totalAlex = fontes
    .flatMap((f) =>
      (f.historico || []).filter((h) => h.data.startsWith(mesSel)),
    )
    .filter((_, i) => fontes[Math.floor(i / 1)]?.membro === "Alexandre")
    .reduce((s, h) => s + h.valor, 0);
  const lancMes = fontes
    .flatMap((f) =>
      (f.historico || [])
        .filter((h) => h.data.startsWith(mesSel))
        .map((h) => ({ ...h, fonte: f })),
    )
    .sort((a, b) => b.data.localeCompare(a.data));
  const totAlex = lancMes
    .filter((l) => l.fonte.membro === "Alexandre")
    .reduce((s, l) => s + l.valor, 0);
  const totLanay = lancMes
    .filter((l) => l.fonte.membro === "Lanay")
    .reduce((s, l) => s + l.valor, 0);
  const fontesFil =
    filMembro === "Todos"
      ? fontes
      : fontes.filter((f) => f.membro === filMembro);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(-1)}>
          ‹
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface)",
            border: "1.5px solid var(--border2)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 16px",
          }}
        >
          <span>📅</span>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              textTransform: "capitalize",
            }}
          >
            {mesLabel}
          </div>
          <input
            type="month"
            value={mesSel}
            onChange={(e) => setMesSel(e.target.value)}
            style={{
              marginLeft: "auto",
              width: "auto",
              padding: "4px 8px",
              fontSize: 12,
            }}
          />
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navMes(1)}>
          ›
        </button>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova Fonte
        </button>
      </div>
      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-icon">💰</div>
          <div className="stat-label">Total do Mês</div>
          <div className="stat-value">{fmt(totAlex + totLanay)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": MEMBRO_COR.Alexandre }}
        >
          <div className="stat-icon">👨</div>
          <div className="stat-label">Alexandre</div>
          <div className="stat-value" style={{ color: MEMBRO_COR.Alexandre }}>
            {fmt(totAlex)}
          </div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": MEMBRO_COR.Lanay }}
        >
          <div className="stat-icon">👩</div>
          <div className="stat-label">Lanay</div>
          <div className="stat-value" style={{ color: MEMBRO_COR.Lanay }}>
            {fmt(totLanay)}
          </div>
        </div>
      </div>
      <div className="section-header" style={{ marginBottom: 12 }}>
        <div className="section-title">🗂️ Fontes Cadastradas</div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Todos", "Alexandre", "Lanay"].map((m) => (
            <button
              key={m}
              className={`btn btn-sm ${filMembro === m ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilMembro(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      {fontesFil.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">💰</div>Nenhuma fonte
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {fontesFil.map((f) => {
            const lancMesAtual = (f.historico || [])
              .filter((h) => h.data.startsWith(mesSel))
              .reduce((s, h) => s + h.valor, 0);
            return (
              <div
                key={f.id}
                className="card"
                style={{
                  borderColor: MEMBRO_COR[f.membro] + "40",
                  borderWidth: 1.5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: MEMBRO_COR[f.membro] + "20",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                      }}
                    >
                      {MEMBRO_EMOJI[f.membro]}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>
                        {f.nome}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: MEMBRO_COR[f.membro],
                          marginTop: 3,
                        }}
                      >
                        {f.membro}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setLancForm({ data: today(), valor: f.valor, obs: "" });
                        setModalLanc(f);
                      }}
                    >
                      + Registrar
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => remover(f.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      Valor base
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 20,
                        color: MEMBRO_COR[f.membro],
                      }}
                    >
                      {fmt(f.valor)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      Recebido este mês
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 20,
                        color: "var(--accent2)",
                      }}
                    >
                      {fmt(lancMesAtual)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal && (
        <Modal
          title="💰 Nova Fonte de Renda"
          onClose={() => setModal(false)}
          lg
        >
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                placeholder="Ex: Salário..."
                value={form.nome}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nome: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Membro</label>
              <select
                value={form.membro}
                onChange={(e) =>
                  setForm((f) => ({ ...f, membro: e.target.value }))
                }
              >
                {MEMBROS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipo: e.target.value }))
                }
              >
                {TIPO_FONTE.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Valor Base (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={form.valor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Conta Destino</label>
            <select
              value={form.contaId}
              onChange={(e) =>
                setForm((f) => ({ ...f, contaId: e.target.value }))
              }
            >
              {contas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Cadastrar
            </button>
          </div>
        </Modal>
      )}
      {modalLanc && (
        <Modal
          title={`💰 Registrar — ${modalLanc.nome}`}
          onClose={() => setModalLanc(null)}
        >
          <div className="form-row">
            <div className="form-group">
              <label>Valor</label>
              <input
                type="number"
                value={lancForm.valor}
                onChange={(e) =>
                  setLancForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={lancForm.data}
                onChange={(e) =>
                  setLancForm((f) => ({ ...f, data: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Obs</label>
            <input
              placeholder="Opcional..."
              value={lancForm.obs}
              onChange={(e) =>
                setLancForm((f) => ({ ...f, obs: e.target.value }))
              }
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModalLanc(null)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={confirmarLanc}>
              Registrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Investimentos ──
function Investimentos({ investimentos, setInvestimentos }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    tipo: "Renda Fixa",
    valor: "",
    rendimento: "",
    dataAplicacao: today(),
    cor: "#6dab7b",
  });
  const salvar = () => {
    if (!form.nome || !form.valor) return;
    setInvestimentos((prev) => [
      ...prev,
      {
        ...form,
        id: genId(),
        valor: parseFloat(form.valor),
        rendimento: parseFloat(form.rendimento || 0),
      },
    ]);
    setModal(false);
    setForm({
      nome: "",
      tipo: "Renda Fixa",
      valor: "",
      rendimento: "",
      dataAplicacao: today(),
      cor: "#6dab7b",
    });
  };
  const remover = (id) =>
    setInvestimentos((prev) => prev.filter((i) => i.id !== id));
  const totalInv = investimentos.reduce((s, i) => s + i.valor, 0);
  const tiposData = {};
  investimentos.forEach((i) => {
    tiposData[i.tipo] = (tiposData[i.tipo] || 0) + i.valor;
  });
  const chartData = Object.entries(tiposData).map(([k, v], idx) => ({
    label: k,
    value: v,
    color: ["#6dab7b", "#7b8fd4", "#f0b429", "#e07b3f"][idx % 4],
  }));
  return (
    <div>
      <div className="section-header">
        <div className="section-title">📈 Investimentos</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Nova Aplicação
        </button>
      </div>
      <div className="grid-2" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-label">Total Investido</div>
          <div className="stat-value">{fmt(totalInv)}</div>
        </div>
        <div className="card">
          <div className="section-title" style={{ marginBottom: 14 }}>
            Distribuição
          </div>
          {chartData.length > 0 ? (
            <DonutChart data={chartData} size={100} />
          ) : (
            <div className="empty-state" style={{ padding: 10 }}>
              Sem investimentos
            </div>
          )}
        </div>
      </div>
      {investimentos.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">📈</div>Nenhum investimento
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {investimentos.map((inv) => {
            const meses = Math.max(
              1,
              Math.round(
                (new Date() - new Date(inv.dataAplicacao)) /
                  (1000 * 60 * 60 * 24 * 30),
              ),
            );
            const estimado =
              inv.valor * Math.pow(1 + inv.rendimento / 100 / 12, meses);
            const ganho = estimado - inv.valor;
            return (
              <div
                key={inv.id}
                className="card"
                style={{ borderColor: (inv.cor || "#6dab7b") + "44" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    className="badge"
                    style={{
                      background: (inv.cor || "#6dab7b") + "25",
                      color: inv.cor || "#6dab7b",
                    }}
                  >
                    {inv.tipo}
                  </span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => remover(inv.id)}
                  >
                    ✕
                  </button>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    margin: "12px 0 4px",
                  }}
                >
                  {inv.nome}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 22,
                    color: inv.cor || "#6dab7b",
                  }}
                >
                  {fmt(inv.valor)}
                </div>
                <div className="divider" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <div>
                    <div style={{ color: "var(--muted)" }}>Rendimento</div>
                    <div style={{ color: "var(--accent4)", fontWeight: 700 }}>
                      {inv.rendimento}% a.a.
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "var(--muted)" }}>Ganho est.</div>
                    <div style={{ color: "var(--accent2)", fontWeight: 700 }}>
                      +{fmt(ganho)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal && (
        <Modal title="📈 Nova Aplicação" onClose={() => setModal(false)}>
          <div className="form-group">
            <label>Nome</label>
            <input
              placeholder="Ex: CDB Inter..."
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipo: e.target.value }))
                }
              >
                {[
                  "Renda Fixa",
                  "Renda Variável",
                  "Fundos",
                  "Ações",
                  "FIIs",
                  "Criptomoedas",
                  "Tesouro Direto",
                  "Poupança",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={form.valor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, valor: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Rendimento % a.a.</label>
              <input
                type="number"
                placeholder="12,5"
                value={form.rendimento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, rendimento: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Data Aplicação</label>
              <input
                type="date"
                value={form.dataAplicacao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dataAplicacao: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Cor</label>
            <input
              type="color"
              value={form.cor}
              onChange={(e) => setForm((f) => ({ ...f, cor: e.target.value }))}
              style={{ height: 40 }}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Cofre ──
function Cofre({ cofre, setCofre }) {
  const [modal, setModal] = useState(false);
  const [modalDep, setModalDep] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    meta: "",
    atual: "0",
    cor: "#f0b429",
  });
  const [deposito, setDeposito] = useState("");
  const salvar = () => {
    if (!form.nome || !form.meta) return;
    setCofre((prev) => [
      ...prev,
      {
        ...form,
        id: genId(),
        meta: parseFloat(form.meta),
        atual: parseFloat(form.atual || 0),
      },
    ]);
    setModal(false);
    setForm({ nome: "", meta: "", atual: "0", cor: "#f0b429" });
  };
  const remover = (id) => setCofre((prev) => prev.filter((c) => c.id !== id));
  const depositar = () => {
    const v = parseFloat(deposito);
    if (!v || !modalDep) return;
    setCofre((prev) =>
      prev.map((c) =>
        c.id === modalDep.id
          ? { ...c, atual: Math.min(c.atual + v, c.meta) }
          : c,
      ),
    );
    setModalDep(null);
    setDeposito("");
  };
  const totalCofre = cofre.reduce((s, c) => s + c.atual, 0);
  const totalMeta = cofre.reduce((s, c) => s + c.meta, 0);
  return (
    <div>
      <div className="section-header">
        <div className="section-title">🔒 Cofre & Reservas</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + Novo Cofre
        </button>
      </div>
      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent4)" }}
        >
          <div className="stat-label">Total Guardado</div>
          <div className="stat-value">{fmt(totalCofre)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent5)" }}
        >
          <div className="stat-label">Meta Total</div>
          <div className="stat-value">{fmt(totalMeta)}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--accent2)" }}
        >
          <div className="stat-label">Progresso</div>
          <div className="stat-value">
            {totalMeta > 0 ? ((totalCofre / totalMeta) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>
      {cofre.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">🔒</div>Nenhum cofre ainda
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {cofre.map((c) => {
            const pct = Math.min((c.atual / c.meta) * 100, 100);
            return (
              <div
                key={c.id}
                className="card"
                style={{ borderColor: (c.cor || "#f0b429") + "44" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ fontSize: 30 }}>🔒</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>
                        {c.nome}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          fontWeight: 600,
                        }}
                      >
                        Meta: {fmt(c.meta)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setModalDep(c)}
                    >
                      + Depositar
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => remover(c.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 26,
                    color: c.cor || "#f0b429",
                    marginBottom: 10,
                  }}
                >
                  {fmt(c.atual)}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%`, background: c.cor || "#f0b429" }}
                  />
                </div>
                {pct >= 100 && (
                  <div style={{ marginTop: 10 }}>
                    <span className="badge badge-green">
                      🎉 Meta alcançada!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {modal && (
        <Modal title="🔒 Novo Cofre" onClose={() => setModal(false)}>
          <div className="form-group">
            <label>Nome</label>
            <input
              placeholder="Ex: Reserva de Emergência..."
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Meta (R$)</label>
              <input
                type="number"
                placeholder="10000"
                value={form.meta}
                onChange={(e) =>
                  setForm((f) => ({ ...f, meta: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Valor Atual (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={form.atual}
                onChange={(e) =>
                  setForm((f) => ({ ...f, atual: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Cor</label>
            <input
              type="color"
              value={form.cor}
              onChange={(e) => setForm((f) => ({ ...f, cor: e.target.value }))}
              style={{ height: 40 }}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvar}>
              Criar
            </button>
          </div>
        </Modal>
      )}
      {modalDep && (
        <Modal
          title={`Depositar em "${modalDep.nome}"`}
          onClose={() => setModalDep(null)}
        >
          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              value={deposito}
              onChange={(e) => setDeposito(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModalDep(null)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={depositar}>
              Depositar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Assistente IA ──
function AssistenteIA({
  contas,
  cartoes,
  txs,
  investimentos,
  cofre,
  fontes,
  veiculos,
  contasAPagar,
}) {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "Olá! 👋 Sou seu assistente financeiro. Posso analisar seus gastos, identificar padrões, sugerir economias e responder qualquer dúvida sobre suas finanças. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const buildContext = () => {
    const mesAtual = today().slice(0, 7);
    const txsMes = txs.filter((t) => t.data?.startsWith(mesAtual));
    const entradas = txsMes
      .filter((t) => t.tipo === "entrada" && !t.isPagFatura)
      .reduce((s, t) => s + t.valor, 0);
    const saidas = txsMes
      .filter((t) => t.tipo === "saida" && !t.isPagFatura)
      .reduce((s, t) => s + t.valor, 0);
    const porCat = {};
    txsMes
      .filter((t) => t.tipo === "saida" && !t.isPagFatura)
      .forEach((t) => {
        porCat[t.categoria] = (porCat[t.categoria] || 0) + t.valor;
      });
    const saldoContas = contas.map((c) => ({
      nome: c.nome,
      saldo: calcSaldoConta(c, txs),
    }));
    const faturas = cartoes.map((c) => ({
      nome: c.nome,
      fatura: calcFaturaCartao(c.id, txs),
      limite: c.limite,
      vencimento: c.vencimento,
    }));
    const totalInv = investimentos.reduce((s, i) => s + i.valor, 0);
    const totalCofre = cofre.reduce((s, c) => s + c.atual, 0);
    const contasPend = contasAPagar.filter((c) => !c.paga);
    const ultimas10 = [...txs]
      .sort((a, b) => b.data.localeCompare(a.data))
      .slice(0, 10);
    // média 3 meses
    const medias = Array.from({ length: 3 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (i + 1));
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const e = txs
        .filter(
          (t) =>
            t.data?.startsWith(k) && t.tipo === "entrada" && !t.isPagFatura,
        )
        .reduce((s, t) => s + t.valor, 0);
      const s2 = txs
        .filter(
          (t) => t.data?.startsWith(k) && t.tipo === "saida" && !t.isPagFatura,
        )
        .reduce((s, t) => s + t.valor, 0);
      return { mes: k, entradas: e, saidas: s2 };
    });
    return `Você é um assistente financeiro pessoal especializado. Analise os dados abaixo e responda de forma clara, objetiva e em português. Use emojis para tornar a resposta mais visual. Seja direto e prático com dicas acionáveis.

=== DADOS FINANCEIROS ATUAIS (${new Date().toLocaleDateString("pt-BR")}) ===

MÊS ATUAL (${mesAtual}):
- Entradas: R$ ${entradas.toFixed(2)}
- Saídas: R$ ${saidas.toFixed(2)}
- Saldo do mês: R$ ${(entradas - saidas).toFixed(2)}

GASTOS POR CATEGORIA (mês atual):
${
  Object.entries(porCat)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `- ${k}: R$ ${v.toFixed(2)}`)
    .join("\n") || "Nenhum gasto registrado"
}

CONTAS BANCÁRIAS:
${saldoContas.map((c) => `- ${c.nome}: R$ ${c.saldo.toFixed(2)}`).join("\n") || "Nenhuma conta"}

CARTÕES DE CRÉDITO:
${faturas.map((c) => `- ${c.nome}: Fatura R$ ${c.fatura.toFixed(2)} / Limite R$ ${c.limite?.toFixed(2) || "?"} (vence dia ${c.vencimento || "?"})`).join("\n") || "Nenhum cartão"}

INVESTIMENTOS: R$ ${totalInv.toFixed(2)}
COFRES/RESERVAS: R$ ${totalCofre.toFixed(2)}
PATRIMÔNIO TOTAL: R$ ${(saldoContas.reduce((s, c) => s + c.saldo, 0) + totalInv + totalCofre).toFixed(2)}

CONTAS A PAGAR PENDENTES:
${
  contasPend
    .slice(0, 5)
    .map(
      (c) => `- ${c.descricao}: R$ ${c.valor.toFixed(2)} vence ${c.vencimento}`,
    )
    .join("\n") || "Nenhuma pendente"
}

MÉDIAS DOS ÚLTIMOS 3 MESES:
${medias.map((m) => `- ${m.mes}: Entradas R$ ${m.entradas.toFixed(2)} / Saídas R$ ${m.saidas.toFixed(2)}`).join("\n")}

ÚLTIMAS 10 TRANSAÇÕES:
${ultimas10.map((t) => `- ${t.data} | ${t.tipo === "entrada" ? "+" : "-"} R$ ${t.valor.toFixed(2)} | ${t.descricao} (${t.categoria || "-"})`).join("\n") || "Nenhuma"}

VEÍCULOS: ${veiculos.length} cadastrado(s)
FONTES DE RENDA: ${fontes.map((f) => `${f.nome} (${f.membro}) R$ ${f.valor.toFixed(2)}`).join(", ") || "Nenhuma"}
`;
  };

  const enviar = async () => {
    const txt = input.trim();
    if (!txt || loading) return;
    const novaMsgs = [...msgs, { role: "user", content: txt }];
    setMsgs(novaMsgs);
    setInput("");
    setLoading(true);
    try {
      const systemPrompt = buildContext();
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: novaMsgs
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await resp.json();
      const respText =
        data.content?.map((b) => b.text || "").join("") ||
        "Desculpe, não consegui processar.";
      setMsgs((prev) => [...prev, { role: "assistant", content: respText }]);
    } catch (e) {
      setMsgs((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Erro ao conectar com a IA. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sugestoes = [
    "📊 Analise meus gastos do mês",
    "💡 Onde posso economizar?",
    "⚠️ Algum alerta importante?",
    "🎯 Como melhorar minha saúde financeira?",
    "💳 Minha fatura está alta?",
    "📈 Como estão meus investimentos?",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 130px)",
      }}
    >
      <style>{`
        .msg-bubble{max-width:82%;padding:13px 16px;border-radius:16px;font-size:14px;line-height:1.65;white-space:pre-wrap;word-break:break-word}
        .msg-user{background:linear-gradient(135deg,var(--accent),#cf6e32);color:#fff;border-radius:16px 16px 4px 16px;align-self:flex-end}
        .msg-ai{background:var(--surface);border:1.5px solid var(--border2);color:var(--text);border-radius:16px 16px 16px 4px;align-self:flex-start;box-shadow:var(--shadow-card)}
        .msg-wrap{display:flex;flex-direction:column;gap:14px;padding:20px 24px;overflow-y:auto;flex:1}
        .typing-dot{width:7px;height:7px;background:var(--accent);border-radius:50%;animation:typing .9s ease-in-out infinite}
        @keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}
      `}</style>

      {/* Cabeçalho */}
      <div
        style={{
          padding: "14px 24px",
          background: "linear-gradient(135deg,#fdeede,var(--surface))",
          borderBottom: "1.5px solid var(--border2)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: "linear-gradient(135deg,var(--accent),var(--accent4))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: "0 3px 10px rgba(224,123,63,0.3)",
          }}
        >
          🤖
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>
            Assistente Financeiro
          </div>
          <div
            style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 700 }}
          >
            ● Online — com acesso aos seus dados
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="msg-wrap">
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
              gap: 4,
            }}
          >
            {m.role === "assistant" && (
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  marginLeft: 4,
                }}
              >
                🤖 Assistente
              </div>
            )}
            {m.role === "user" && (
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 700,
                  marginRight: 4,
                }}
              >
                Você
              </div>
            )}
            <div
              className={`msg-bubble ${m.role === "user" ? "msg-user" : "msg-ai"}`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontWeight: 700,
                marginLeft: 4,
              }}
            >
              🤖 Assistente
            </div>
            <div
              className="msg-bubble msg-ai"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "14px 20px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="typing-dot"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sugestões */}
      {msgs.length <= 1 && (
        <div
          style={{
            padding: "0 20px 12px",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {sugestoes.map((s, i) => (
            <button
              key={i}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 20, fontSize: 12 }}
              onClick={() => {
                setInput(s);
                inputRef.current?.focus();
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1.5px solid var(--border2)",
          background: "var(--surface)",
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
          placeholder="Pergunte sobre seus gastos, investimentos, metas…"
          style={{
            flex: 1,
            minHeight: 44,
            maxHeight: 120,
            resize: "none",
            borderRadius: 14,
            padding: "11px 14px",
            fontSize: 14,
            lineHeight: 1.5,
          }}
          rows={1}
        />
        <button
          className="btn btn-primary"
          style={{
            height: 44,
            width: 44,
            padding: 0,
            justifyContent: "center",
            borderRadius: 12,
            fontSize: 18,
            flexShrink: 0,
          }}
          onClick={enviar}
          disabled={loading || !input.trim()}
        >
          {loading ? "⏳" : "➤"}
        </button>
      </div>
    </div>
  );
}

function Configuracoes(props) {
  const {
    contas,
    cartoes,
    txs,
    investimentos,
    cofre,
    fontes,
    veiculos,
    contasAPagar,
    setContas,
    setCartoes,
    setTxs,
    setInvestimentos,
    setCofre,
    setFontes,
    setVeiculos,
    setContasAPagar,
    temaApp,
    setTemaApp,
    accentColor,
    setAccentColor,
    fontScale,
    setFontScale,
    onAplicar,
  } = props;
  const [importTxt, setImportTxt] = useState("");
  const [msg, setMsg] = useState(null);
  const [exportJson, setExportJson] = useState(null);
  const [copied, setCopied] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("personalizacao");
  const taRef = useRef(null);

  // ── Personalização ──
  const [compacto, setCompacto] = useState(false);
  const [animacoes, setAnimacoes] = useState(true);
  const [moedaSimbolo, setMoedaSimbolo] = useState("R$");
  const [nomeApp, setNomeApp] = useState("FinFamília");
  const [msgTema, setMsgTema] = useState(null);

  const aplicarTema = () => {
    onAplicar();
    setMsgTema({ tipo: "ok", texto: "✅ Tema aplicado com sucesso!" });
    setTimeout(() => setMsgTema(null), 2500);
  };

  const ACCENT_PRESETS = [
    { cor: "#e52222", label: "Vermelho" },
    { cor: "#e07b3f", label: "Laranja" },
    { cor: "#f0b429", label: "Âmbar" },
    { cor: "#22c55e", label: "Verde" },
    { cor: "#818cf8", label: "Índigo" },
    { cor: "#e879f9", label: "Rosa" },
    { cor: "#06b6d4", label: "Ciano" },
    { cor: "#a78bfa", label: "Lilás" },
  ];

  const showMsg = (tipo, texto) => {
    setMsg({ tipo, texto });
    setTimeout(() => setMsg(null), 4000);
  };
  const gerarJson = () =>
    JSON.stringify(
      {
        versao: "1.0",
        exportadoEm: new Date().toISOString(),
        contas,
        cartoes,
        txs,
        investimentos,
        cofre,
        fontes,
        veiculos,
        contasAPagar,
      },
      null,
      2,
    );
  const abrirExportar = () => {
    setExportJson(gerarJson());
    setCopied(false);
  };
  const copiarJson = async () => {
    try {
      if (taRef.current) {
        taRef.current.select();
        document.execCommand("copy");
      }
      await navigator.clipboard.writeText(exportJson).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {}
  };
  const baixarJson = () => {
    const blob = new Blob([exportJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finfamilia_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const importarArquivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImportTxt(ev.target.result);
    reader.readAsText(file);
    e.target.value = "";
  };
  const importar = () => {
    if (!importTxt.trim())
      return showMsg("erro", "Cole o conteúdo JSON antes de importar.");
    try {
      const dados = JSON.parse(importTxt.replace(/```json|```/g, "").trim());
      if (!dados.versao) return showMsg("erro", "JSON inválido.");
      if (dados.contas) setContas(dados.contas);
      if (dados.cartoes) setCartoes(dados.cartoes);
      if (dados.txs) setTxs(dados.txs);
      if (dados.investimentos) setInvestimentos(dados.investimentos);
      if (dados.cofre) setCofre(dados.cofre);
      if (dados.fontes) setFontes(dados.fontes);
      if (dados.veiculos) setVeiculos(dados.veiculos);
      if (dados.contasAPagar) setContasAPagar(dados.contasAPagar);
      setImportTxt("");
      showMsg("ok", "Dados importados com sucesso!");
    } catch (e) {
      showMsg("erro", "JSON inválido — verifique o conteúdo.");
    }
  };
  const totalItens =
    contas.length +
    cartoes.length +
    txs.length +
    investimentos.length +
    cofre.length +
    fontes.length +
    veiculos.length +
    contasAPagar.length;

  const SECOES = [
    { id: "personalizacao", label: "🎨 Personalização", icon: "🎨" },
    { id: "dados", label: "📦 Dados & Backup", icon: "📦" },
  ];

  return (
    <div>
      {msg && (
        <div
          className={`alert-item ${msg.tipo === "ok" ? "alert-green" : "alert-red"}`}
          style={{ marginBottom: 18 }}
        >
          <div style={{ fontSize: 20 }}>{msg.tipo === "ok" ? "✅" : "❌"}</div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: msg.tipo === "ok" ? "var(--accent2)" : "var(--accent3)",
            }}
          >
            {msg.texto}
          </div>
        </div>
      )}

      {/* Tabs de seções */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {SECOES.map((s) => (
          <button
            key={s.id}
            className={`btn ${secaoAtiva === s.id ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, justifyContent: "center", minWidth: 130 }}
            onClick={() => setSecaoAtiva(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Personalização ── */}
      {secaoAtiva === "personalizacao" && (
        <div>
          {msgTema && (
            <div
              className={`alert-item ${msgTema.tipo === "ok" ? "alert-green" : "alert-red"}`}
              style={{ marginBottom: 16 }}
            >
              <div style={{ fontSize: 20 }}>
                {msgTema.tipo === "ok" ? "✅" : "❌"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color:
                    msgTema.tipo === "ok" ? "var(--accent2)" : "var(--accent3)",
                }}
              >
                {msgTema.texto}
              </div>
            </div>
          )}

          {/* Tema claro/escuro */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>
              🌗 Tema
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 14,
              }}
            >
              {[
                {
                  id: "dark",
                  label: "Escuro",
                  emoji: "🌙",
                  desc: "Fundo preto, ideal para uso noturno",
                  bg: "#111",
                  surface: "#1a1a1a",
                  text: "#f1f1f1",
                },
                {
                  id: "light",
                  label: "Claro",
                  emoji: "☀️",
                  desc: "Fundo branco, ótimo para o dia",
                  bg: "#f5f5f5",
                  surface: "#fff",
                  text: "#1a1a1a",
                },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTemaApp(t.id)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 16,
                    border: `2px solid ${temaApp === t.id ? "var(--accent)" : "var(--border2)"}`,
                    padding: "18px 16px",
                    background:
                      temaApp === t.id ? "var(--accent)14" : "var(--surface2)",
                    transition: "all .2s",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 40,
                        borderRadius: 10,
                        background: t.bg,
                        border: "1.5px solid var(--border2)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          right: 6,
                          height: 6,
                          borderRadius: 3,
                          background: t.surface,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 6,
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          background: t.surface,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 18,
                          left: 28,
                          right: 6,
                          height: 6,
                          borderRadius: 3,
                          background: t.surface,
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    {temaApp === t.id && (
                      <div
                        style={{
                          background: "var(--accent)",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        Ativo
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 18 }}>{t.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>
                      {t.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        marginTop: 2,
                      }}
                    >
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cor de destaque */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>
              🎨 Cor de Destaque
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.cor}
                  title={p.label}
                  onClick={() => setAccentColor(p.cor)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: `3px solid ${accentColor === p.cor ? "var(--text)" : "transparent"}`,
                    background: p.cor,
                    cursor: "pointer",
                    transition: "transform .15s",
                    transform:
                      accentColor === p.cor ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 700,
                  }}
                >
                  Personalizada:
                </div>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{
                    width: 36,
                    height: 36,
                    border: "2px solid var(--border2)",
                    borderRadius: 10,
                    padding: 2,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                padding: "10px 14px",
                background: accentColor + "18",
                border: `1.5px solid ${accentColor}44`,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  background: accentColor,
                }}
              />
              <div
                style={{ fontSize: 13, fontWeight: 700, color: accentColor }}
              >
                Prévia: {accentColor}
              </div>
              <button
                className="btn btn-sm"
                style={{
                  marginLeft: "auto",
                  background: accentColor,
                  color: "#fff",
                  border: "none",
                }}
              >
                Botão
              </button>
            </div>
          </div>

          {/* Tipografia */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>
              🔤 Tipografia
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 700,
                  minWidth: 80,
                }}
              >
                Tamanho base
              </div>
              <input
                type="range"
                min="12"
                max="18"
                step="1"
                value={fontScale}
                onChange={(e) => setFontScale(parseInt(e.target.value))}
                style={{ flex: 1 }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  minWidth: 40,
                }}
              >
                {fontScale}px
              </span>
            </div>
            <div
              style={{
                padding: "10px 14px",
                background: "var(--surface2)",
                borderRadius: 12,
                border: "1px solid var(--border2)",
              }}
            >
              <div style={{ fontSize: fontScale, fontWeight: 700 }}>
                Texto em tamanho {fontScale}px
              </div>
              <div style={{ fontSize: fontScale * 0.8, color: "var(--muted)" }}>
                Subtítulo e textos secundários aparecem proporcionalmente.
              </div>
            </div>
          </div>

          {/* Outros */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>
              ⚙️ Outras Opções
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                [
                  compacto,
                  setCompacto,
                  "📐 Modo compacto",
                  "Reduz espaçamentos para ver mais dados por tela",
                ],
                [
                  animacoes,
                  setAnimacoes,
                  "✨ Animações",
                  "Habilita transições e efeitos visuais",
                ],
              ].map(([val, set, lbl, desc]) => (
                <div
                  key={lbl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 14px",
                    background: "var(--surface2)",
                    borderRadius: 12,
                    cursor: "pointer",
                  }}
                  onClick={() => set(!val)}
                >
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background: val ? "var(--accent2)" : "var(--surface3)",
                      position: "relative",
                      transition: "background .2s",
                      flexShrink: 0,
                      border: "1.5px solid var(--border2)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 3,
                        left: val ? 22 : 3,
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        background: "#fff",
                        transition: "left .2s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{lbl}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {desc}
                    </div>
                  </div>
                  <span
                    className={`badge ${val ? "badge-green" : "badge-gray"}`}
                    style={{ marginLeft: "auto" }}
                  >
                    {val ? "Ligado" : "Desligado"}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  background: "var(--surface2)",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800 }}>
                  🏷️ Nome do App
                </div>
                <input
                  value={nomeApp}
                  onChange={(e) => setNomeApp(e.target.value)}
                  style={{ flex: 1, fontWeight: 700 }}
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            style={{ justifyContent: "center", fontSize: 14, padding: "12px" }}
            onClick={aplicarTema}
          >
            🎨 Aplicar Personalização
          </button>
        </div>
      )}

      {/* ── Dados & Backup ── */}
      {secaoAtiva === "dados" && (
        <div>
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>
              📦 Resumo dos Dados
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
              }}
            >
              {[
                ["🏦", "Contas", contas.length],
                ["💳", "Cartões", cartoes.length],
                ["💸", "Transações", txs.length],
                ["💰", "Fontes", fontes.length],
                ["📅", "Contas a Pagar", contasAPagar.length],
                ["📈", "Invest.", investimentos.length],
                ["🔒", "Cofres", cofre.length],
                ["🚗", "Veículos", veiculos.length],
              ].map(([icon, label, val]) => (
                <div
                  key={label}
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-2">
            <div
              className="card"
              style={{ borderColor: "var(--accent2)44", borderWidth: 2 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "var(--accent2)20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  📤
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>
                    Exportar Backup
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {totalItens} registros
                  </div>
                </div>
              </div>
              <button
                className="btn w-full"
                style={{
                  justifyContent: "center",
                  background: "linear-gradient(135deg,var(--accent2),#4a9a5e)",
                  color: "#fff",
                }}
                onClick={abrirExportar}
              >
                📋 Gerar Backup
              </button>
            </div>
            <div
              className="card"
              style={{ borderColor: "var(--accent5)44", borderWidth: 2 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "var(--accent5)20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  📥
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>
                    Importar Dados
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    Restaura um backup JSON
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface2)",
                  border: "2px dashed var(--border2)",
                  borderRadius: 12,
                  padding: "14px",
                  textAlign: "center",
                  marginBottom: 10,
                  cursor: "pointer",
                }}
                onClick={() =>
                  document.getElementById("file-input-cfg").click()
                }
              >
                <input
                  id="file-input-cfg"
                  type="file"
                  accept=".json,.txt"
                  onChange={importarArquivo}
                  style={{ display: "none" }}
                />
                <div style={{ fontSize: 24, marginBottom: 4 }}>📂</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--muted2)",
                  }}
                >
                  Clique para selecionar arquivo
                </div>
              </div>
              <textarea
                placeholder="Ou cole o JSON aqui..."
                value={importTxt}
                onChange={(e) => setImportTxt(e.target.value)}
                style={{
                  minHeight: 80,
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  background: "#fffbea",
                  border: "1px solid #f7e08a",
                  borderRadius: 10,
                  padding: "8px 12px",
                  marginBottom: 10,
                  fontSize: 12,
                  color: "#7a6200",
                  fontWeight: 700,
                }}
              >
                ⚠️ Substitui todos os dados atuais.
              </div>
              <button
                className="btn w-full"
                style={{
                  justifyContent: "center",
                  background: "linear-gradient(135deg,var(--accent5),#5a6fb8)",
                  color: "#fff",
                }}
                onClick={importar}
              >
                📤 Importar e Restaurar
              </button>
            </div>
          </div>
        </div>
      )}

      {exportJson && (
        <Modal
          title="📋 Backup — Copie ou Baixe"
          onClose={() => setExportJson(null)}
          lg
        >
          <textarea
            ref={taRef}
            readOnly
            value={exportJson}
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              minHeight: 240,
              background: "#1a1a1a",
              color: "#e0e0e0",
              border: "1px solid #444",
              borderRadius: 10,
              padding: 14,
              lineHeight: 1.5,
              marginBottom: 14,
            }}
            onClick={(e) => e.target.select()}
          />
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setExportJson(null)}
            >
              Fechar
            </button>
            <button
              className="btn"
              style={{
                background: copied ? "var(--accent2)" : "var(--accent5)",
                color: "#fff",
                minWidth: 130,
                justifyContent: "center",
              }}
              onClick={copiarJson}
            >
              {copied ? "✅ Copiado!" : "📋 Copiar"}
            </button>
            <button
              className="btn"
              style={{
                background: "linear-gradient(135deg,var(--accent2),#4a9a5e)",
                color: "#fff",
                minWidth: 150,
                justifyContent: "center",
              }}
              onClick={baixarJson}
            >
              ⬇️ Baixar .json
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Páginas do menu ──
const PAGES = [
  { id: "dashboard", label: "Início", icon: "🏠", section: "Principal" },
  { id: "financeiro", label: "Financeiro", icon: "📊", section: "Principal" },
  { id: "projecao", label: "Projeção", icon: "🔮", section: "Principal" },
  { id: "analises", label: "Análises", icon: "📈", section: "Principal" },
  { id: "alertas", label: "Alertas", icon: "🔔", section: "Principal" },
  { id: "fontes", label: "Fontes de Renda", icon: "💰", section: "Receitas" },
  { id: "contas", label: "Contas", icon: "🏦", section: "Finanças" },
  { id: "cartoes", label: "Cartões", icon: "💳", section: "Finanças" },
  { id: "despesas", label: "Despesas", icon: "🧾", section: "Despesas" },
  { id: "transacoes", label: "Transações", icon: "💸", section: "Despesas" },
  { id: "categorias", label: "Categorias", icon: "🏷️", section: "Despesas" },
  {
    id: "contasapagar",
    label: "Contas a Pagar",
    icon: "📅",
    section: "Despesas",
  },
  { id: "veiculos", label: "Veículos", icon: "🚗", section: "Despesas" },
  {
    id: "investimentos",
    label: "Investimentos",
    icon: "📈",
    section: "Patrimônio",
  },
  { id: "cofre", label: "Cofre / Reserva", icon: "🔒", section: "Patrimônio" },
  { id: "assistente", label: "Assistente IA", icon: "💬", section: "Sistema" },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: "⚙️",
    section: "Sistema",
  },
];

// ── App principal ──
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [loaded, setLoaded] = useState(false);
  const [temaApp, setTemaApp] = useState("dark");
  const [accentColor, setAccentColor] = useState("#e52222");
  const [fontScale, setFontScale] = useState(14);
  const appRef = useRef(null);

  const applyNow = useRef(false);
  useEffect(() => {
    if (appRef.current) {
      applyThemeVars(appRef.current, temaApp, accentColor, fontScale);
      applyNow.current = true;
    }
  });
  // também aplica sempre que deps mudarem, depois do mount
  useEffect(() => {
    if (appRef.current)
      applyThemeVars(appRef.current, temaApp, accentColor, fontScale);
  }, [temaApp, accentColor, fontScale]);
  const [contas, setContasRaw] = useState([]);
  const [cartoes, setCartoesRaw] = useState([]);
  const [txs, setTxsRaw] = useState([]);
  const [investimentos, setInvestimentosRaw] = useState([]);
  const [cofre, setCofreRaw] = useState([]);
  const [fontes, setFontesRaw] = useState([]);
  const [veiculos, setVeiculosRaw] = useState([]);
  const [contasAPagar, setContasAPagarRaw] = useState([]);
  const [modalTransf, setModalTransf] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) {
          const d = JSON.parse(r.value);
          if (d.user) setUser(d.user);
          if (d.contas) setContasRaw(d.contas);
          if (d.cartoes) setCartoesRaw(d.cartoes);
          if (d.txs) setTxsRaw(d.txs);
          if (d.investimentos) setInvestimentosRaw(d.investimentos);
          if (d.cofre) setCofreRaw(d.cofre);
          if (d.fontes) setFontesRaw(d.fontes);
          if (d.veiculos) setVeiculosRaw(d.veiculos);
          if (d.contasAPagar) setContasAPagarRaw(d.contasAPagar);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  const saveTimer = useRef(null);
  useEffect(() => {
    if (!loaded) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      window.storage
        .set(
          STORAGE_KEY,
          JSON.stringify({
            user,
            contas,
            cartoes,
            txs,
            investimentos,
            cofre,
            fontes,
            veiculos,
            contasAPagar,
          }),
        )
        .catch(() => {});
    }, 400);
  }, [
    loaded,
    user,
    contas,
    cartoes,
    txs,
    investimentos,
    cofre,
    fontes,
    veiculos,
    contasAPagar,
  ]);

  // Auto-lançamento de recorrentes
  useEffect(() => {
    if (!loaded) return;
    const mesAtual = today().slice(0, 7);
    const recorrentes = contasAPagar.filter((c) => c.recorrente && !c.paga);
    if (recorrentes.length === 0) return;
    // Para cada recorrente, verifica se já existe uma cópia no mês atual
    const novas = [];
    recorrentes.forEach((c) => {
      const jaTem = contasAPagar.some(
        (x) =>
          x.recorrenteOrigemId === c.id &&
          x.vencimento &&
          x.vencimento.startsWith(mesAtual),
      );
      if (jaTem) return;
      // Só lança se o vencimento original é de um mês anterior
      if (c.vencimento && c.vencimento.startsWith(mesAtual)) return;
      const dia = c.vencimento ? c.vencimento.split("-")[2] : "10";
      novas.push({
        ...c,
        id: genId(),
        vencimento: `${mesAtual}-${dia}`,
        paga: false,
        dataPagamento: null,
        recorrenteOrigemId: c.id,
      });
    });
    if (novas.length > 0) setContasAPagarRaw((prev) => [...prev, ...novas]);
  }, [loaded]);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  const contasComSaldo = useMemo(
    () => contas.map((c) => ({ ...c, saldo: calcSaldoConta(c, txs) })),
    [contas, txs],
  );
  const alertas = calcAlertas(contasComSaldo, cartoes, txs);
  const nUrgentes = alertas.filter((a) => a.tipo === "red").length;

  if (!loaded)
    return (
      <>
        <style>{STYLE}</style>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "var(--bg)",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid var(--surface3)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
            }}
          />
          <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>
            Carregando...
          </div>
        </div>
      </>
    );

  if (!user)
    return (
      <>
        <style>{STYLE}</style>
        <LoginScreen onLogin={handleLogin} />
      </>
    );

  const props = {
    contas,
    cartoes,
    txs,
    investimentos,
    cofre,
    fontes,
    veiculos,
    contasAPagar,
    setContas: setContasRaw,
    setCartoes: setCartoesRaw,
    setTxs: setTxsRaw,
    setInvestimentos: setInvestimentosRaw,
    setCofre: setCofreRaw,
    setFontes: setFontesRaw,
    setVeiculos: setVeiculosRaw,
    setContasAPagar: setContasAPagarRaw,
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard {...props} />;
      case "financeiro":
        return <Financeiro {...props} />;
      case "projecao":
        return (
          <Projecao
            contas={contas}
            txs={txs}
            investimentos={investimentos}
            cofre={cofre}
          />
        );
      case "analises":
        return <Analises {...props} />;
      case "alertas":
        return <AlertasPage {...props} />;
      case "fontes":
        return <FontesRenda {...props} />;
      case "contas":
        return <Contas {...props} />;
      case "cartoes":
        return <Cartoes {...props} />;
      case "despesas":
        return <Despesas {...props} />;
      case "transacoes":
        return <Transacoes {...props} />;
      case "categorias":
        return <Categorias {...props} />;
      case "contasapagar":
        return <ContasAPagar {...props} />;
      case "veiculos":
        return <Veiculos {...props} />;
      case "investimentos":
        return <Investimentos {...props} />;
      case "cofre":
        return <Cofre {...props} />;
      case "assistente":
        return (
          <AssistenteIA
            contas={contas}
            cartoes={cartoes}
            txs={txs}
            investimentos={investimentos}
            cofre={cofre}
            fontes={fontes}
            veiculos={veiculos}
            contasAPagar={contasAPagar}
          />
        );
      case "configuracoes":
        return (
          <Configuracoes
            {...props}
            temaApp={temaApp}
            setTemaApp={setTemaApp}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            fontScale={fontScale}
            setFontScale={setFontScale}
            onAplicar={() => {}}
          />
        );
      default:
        return null;
    }
  };

  const sections = {};
  PAGES.forEach((p) => {
    if (!sections[p.section]) sections[p.section] = [];
    sections[p.section].push(p);
  });
  const curPage = PAGES.find((p) => p.id === page);

  return (
    <>
      <style>{STYLE}</style>
      <div className="app" ref={appRef}>
        {modalTransf && (
          <ModalTransferencia
            contas={contas}
            txs={txs}
            setTxs={setTxsRaw}
            onClose={() => setModalTransf(false)}
          />
        )}
        <aside className="sidebar">
          <div className="logo">
            <span className="logo-icon">🏡</span>FinFamília
          </div>
          {Object.entries(sections).map(([section, pages]) => (
            <div key={section}>
              <div className="nav-section-label">{section}</div>
              {pages.map((p) => (
                <div
                  key={p.id}
                  className={`nav-item ${page === p.id ? "active" : ""}`}
                  onClick={() => setPage(p.id)}
                >
                  <span className="icon">{p.icon}</span>
                  {p.label}
                  {p.id === "alertas" && nUrgentes > 0 && (
                    <span className="nav-badge">{nUrgentes}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="avatar">
                {user.nome?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="user-info">
                <div className="user-name">{user.nome}</div>
                <div className="user-role">{user.email}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                ⏻
              </button>
            </div>
          </div>
        </aside>
        <main className="main">
          <div className="topbar">
            <div>
              <div className="page-title">
                {curPage?.icon} {curPage?.label}
              </div>
              <div className="page-subtitle">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Mês de referência
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "var(--accent)",
                    textTransform: "capitalize",
                  }}
                >
                  {new Date().toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              {contas.length >= 2 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalTransf(true)}
                >
                  🔀 Transferir
                </button>
              )}
              <div
                style={{ width: 1, height: 36, background: "var(--border2)" }}
              />
              <div
                style={{
                  textAlign: "center",
                  background: "linear-gradient(135deg,#fdeede,#fdf0e2)",
                  border: "1.5px solid var(--border2)",
                  borderRadius: 12,
                  padding: "6px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {new Date().getDate()}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {new Date()
                    .toLocaleDateString("pt-BR", { weekday: "short" })
                    .replace(".", "")
                    .toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="content">{renderPage()}</div>
        </main>
      </div>
    </>
  );
}
