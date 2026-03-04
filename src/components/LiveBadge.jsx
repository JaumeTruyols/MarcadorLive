// LiveBadge.jsx
export default function LiveBadge({ minute, extraTime }) {
  return (
    <span class="flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      <span class="w-2 h-2 bg-white rounded-full animate-pulse" />
      {minute}'
      {extraTime ? <span>+{extraTime}</span> : null}
    </span>
  );
}
