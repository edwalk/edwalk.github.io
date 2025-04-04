export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center space-y-4 opacity-60">
      <div className="w-32 h-32 relative">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23dcd7ba' d='M64 20h4v4h-4zM60 24h4v4h-4zM68 24h4v4h-4zM56 28h4v4h-4zM72 28h4v4h-4zM52 32h4v4h-4zM76 32h4v4h-4zM48 36h4v4h-4zM80 36h4v4h-4zM44 40h4v4h-4zM84 40h4v4h-4zM40 44h4v4h-4zM88 44h4v4h-4zM36 48h4v4h-4zM92 48h4v4h-4zM32 52h4v4h-4zM96 52h4v4h-4zM28 56h4v4h-4zM100 56h4v4h-4zM24 92h84v4h-84z'/%3E%3Crect x='60' y='45' width='8' height='30' fill='%23dcd7ba'/%3E%3Ccircle cx='64' cy='85' r='4' fill='%23dcd7ba'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }} />
      </div>
      <div className="font-mono text-[#dcd7ba] text-center">
        UNDER<br />CONSTRUCTION
      </div>
    </div>
  );
} 