'use client';

import { useEffect, useRef, useState } from 'react';

type LineType = 'prompt' | 'input' | 'sys' | 'plan' | 'cmd' | 'exec' | 'stdout' | 'out' | 'done';

interface ScriptStep {
  t: LineType;
  c: string;
}

const SCRIPT: ScriptStep[] = [
  { t: 'prompt', c: 'carlos@dev ~ $ ' },
  { t: 'input', c: 'ai-do "sum the refunds in these pdf invoices"' },
  { t: 'sys', c: 'Logging initialized. Log: ~/.cache/ai-shell-loop/2026-04-17.log' },
  { t: 'plan', c: 'PLAN >>>' },
  { t: 'out', c: 'Locate PDF invoices in the workspace, extract amounts,' },
  { t: 'out', c: 'and sum them. Use pdftotext + awk.' },
  { t: 'cmd', c: 'COMMAND >>>  in ~/work' },
  { t: 'exec', c: 'find . -name "invoice-2026-*.pdf" | head' },
  { t: 'prompt', c: 'continue? (yes, no, new command)' },
  { t: 'input', c: 'yes' },
  { t: 'stdout', c: './clients/acme/invoice-2026-01.pdf' },
  { t: 'stdout', c: './clients/acme/invoice-2026-02.pdf' },
  { t: 'stdout', c: './clients/troy/invoice-2026-Q1.pdf' },
  { t: 'plan', c: 'PLAN >>>' },
  { t: 'out', c: 'Extract text from each PDF and grep the total line.' },
  { t: 'cmd', c: 'COMMAND >>>' },
  { t: 'exec', c: 'for f in **/invoice-2026-*.pdf; do pdftotext "$f" -; done \\' },
  { t: 'exec', c: '  | grep -iE "total[:\\s]" | awk \'{s+=$NF} END{print s}\'' },
  { t: 'stdout', c: '0.002' },
  { t: 'done', c: '✓ goal reached. total: €0.002' },
  { t: 'prompt', c: 'carlos@dev ~ $ ' },
];

const COLOR: Record<LineType, string> = {
  prompt: 'var(--ink-dim)',
  input: 'var(--ink)',
  sys: 'var(--ink-faint)',
  plan: 'var(--accent)',
  cmd: 'var(--accent)',
  exec: 'var(--ink)',
  stdout: '#a8e6c0',
  out: 'var(--ink-dim)',
  done: 'var(--accent)',
};

interface TypingState {
  t: LineType;
  c: string;
}

export function Terminal({ speed = 14 }: { speed?: number }) {
  const [lines, setLines] = useState<ScriptStep[]>([]);
  const [typing, setTyping] = useState<TypingState | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    let idx = 0;

    const run = async () => {
      while (mounted) {
        if (idx >= SCRIPT.length) {
          await new Promise((r) => setTimeout(r, 3500));
          if (!mounted) break;
          setLines([]);
          idx = 0;
          continue;
        }
        const step = SCRIPT[idx];
        if (step.t === 'input' || step.t === 'exec') {
          let buf = '';
          for (const ch of step.c) {
            if (!mounted) return;
            buf += ch;
            setTyping({ t: step.t, c: buf });
            await new Promise((r) => setTimeout(r, speed));
          }
          setLines((l) => [...l, { t: step.t, c: step.c }]);
          setTyping(null);
          await new Promise((r) => setTimeout(r, 200));
        } else {
          setLines((l) => [...l, step]);
          await new Promise((r) => setTimeout(r, step.t === 'prompt' ? 400 : 120));
        }
        idx++;
      }
    };
    run();
    return () => { mounted = false; };
  }, [speed]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, typing]);

  return (
    <div style={{
      background: '#050504',
      border: '1px solid var(--rule-bright)',
      fontFamily: 'var(--mono)',
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--ink)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        borderBottom: '1px solid var(--rule-bright)',
        fontSize: 11,
        color: 'var(--ink-faint)',
        justifyContent: 'space-between',
      }}>
        <span>carlos@dev: ~ — ai-shell-loop</span>
        <span>● ● ●</span>
      </div>
      <div ref={scrollRef} style={{ padding: '14px 16px', overflow: 'hidden', flex: 1 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: COLOR[l.t], whiteSpace: 'pre-wrap' }}>
            {l.t === 'input' ? (
              <><span style={{ color: 'var(--ink-dim)' }}>$ </span>{l.c}</>
            ) : l.c}
          </div>
        ))}
        {typing && (
          <div style={{ color: COLOR[typing.t], whiteSpace: 'pre-wrap' }}>
            {typing.t === 'input' && <span style={{ color: 'var(--ink-dim)' }}>$ </span>}
            {typing.c}<span className="caret" style={{ color: 'var(--accent)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
