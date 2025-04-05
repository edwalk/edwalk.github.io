export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center space-y-4 opacity-60">
      <div className="w-32 h-32 relative">
        <div className="w-full h-full" style={{
          backgroundImage: `url("/under-construction.svg")`,
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