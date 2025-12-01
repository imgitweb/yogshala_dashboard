const StatusBadge = ({ status, colorMap = {} }) => {
  const style = colorMap[status?.toLowerCase()] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };
  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${style.bg} ${style.text}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;