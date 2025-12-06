

interface VectorLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const VectorLogo = ({
  width = 120,
  height = 22,
  className = "",
}: VectorLogoProps) => {
  return (
    <img
      src="/reaper.so.svg"
      alt="Reaper Logo"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};