interface TickerItem {
  label: string;
  value: string;
}

const ITEMS: TickerItem[] = [
  { label: 'AVAILABLE', value: 'FOR REMOTE WORK' },
  { label: 'LOCATION', value: 'BELIZE · UTC-6' },
  { label: 'STACK', value: 'JAVA + KOTLIN + PYTHON' },
  { label: 'AI', value: 'PRODUCTION INTEGRATION' },
  { label: 'OSS', value: 'OPENHANDS · LITELLM' },
  { label: 'EXPERIENCE', value: '15 YEARS' },
  { label: 'RESPONSE TIME', value: 'SAME DAY' },
  { label: 'TIMEZONE', value: 'US-FRIENDLY' },
];

function TickerContent() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item.label} <b>{item.value}</b>
          <span className="dot">◇</span>
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
